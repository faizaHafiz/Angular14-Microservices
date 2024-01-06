var amqp = require('amqplib/callback_api');

function init(message, respond) {
    console.log("Cart plugged in successfully");
    respond();
}

module.exports = function cart(options) {
    //adding items to the cart
    this.add({ service: 'cart', action: 'add' }, (args, reply) => {
        const cartItem = this.make$('Cart'); //entity object
        cartItem.title = args.title;
        cartItem.save$((err, cart_item) => {
            if (err) reply(err, null)
            reply(null, { message: `cart item ${cart_item.title} is added succesfully...` })
        })
    })

    //Display the cart items

    this.add({ service: 'cart', action: 'view' }, (args, reply) => {
        const cart = this.make$('Cart');
        cart.list$({}, (err, cart) => {
            if (err) reply(err, null)
            reply(null, { cart: cart })
        })
    })

     //remove item from cart
     this.add({ service: "cart", action: "remove" }, (args, reply) => {
        let cart = this.make$('Cart')
        cart.list$({ title: args.title }, (err, cart_items) => {
            if (err) reply(err, null)
            console.log(cart_items)
            if (cart_items.length > 0) {
                 cart_items.forEach(cart =>{
                    cart.remove$(cart.id, (err) => {
                        if (err) reply(err, null)
                        reply(null, { message: "item removed from cart successfully..." })
                    })
                 })              
            } else {
                reply(null, { message: "item not found in the cart..." })
            }
        })
    })
    
       //checkout for ordering books

       this.add({ service: "cart", action: "checkout" }, (args, reply) => {
        let cart = this.make$('Cart')
        let book_list = [];
        cart.list$({}, (err, cart_items) => {
            cart_items.forEach(book => {
                book_list.push(book.title)
            });
            console.log(book_list);
            amqp.connect('amqps://arknngoj:ffK1PIKkJ5pHP0xvz9mXt_tCjDPqeOet@puffin.rmq2.cloudamqp.com/arknngoj', function (error0, connection) {
                if (error0) {
                    throw error0;
                }
                connection.createChannel(function (error1, channel) {
                    if (error1) {
                        throw error1;
                    }
                    console.log("Inside rabbitmq connection ....");
                    var queue = 'order';
                    channel.assertQueue(queue, {
                        durable: false
                    });
                    channel.sendToQueue(queue, Buffer.from(JSON.stringify({ books: book_list })));
                    console.log(" [x] Sent %s", book_list);
                });
            });

            reply(null, { message: "cart items are send to order...." })

        })

    })


    this.add({ init: 'cart' }, init)
}