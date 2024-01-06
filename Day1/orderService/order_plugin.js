var amqp = require('amqplib/callback_api');

function init(msg, respond) {
    console.log("Order plugin initialized!");
    respond();
}

module.exports = function order(options) { 
    this.add({ service: "order", action: "take" }, (args, reply) => {
        let order = this.make$('Orders')

            amqp.connect('amqps://arknngoj:ffK1PIKkJ5pHP0xvz9mXt_tCjDPqeOet@puffin.rmq2.cloudamqp.com/arknngoj', function (error0, connection) {
                if (error0) {
                    throw error0;
                }
                connection.createChannel(function (error1, channel) {
                    if (error1) {
                        throw error1;
                    }
                    var queue = 'order';
                    let orderId=0;
                    channel.assertQueue(queue, {
                        durable: false
                    });

                    channel.consume(queue, function(mesg) {
                        console.log(" [x] Received "+ mesg.content.toString());
                         orderId = Math.floor(Math.random() * 100);
                         order.orderid=orderId;
                         order.items=JSON.parse(mesg.content.toString())
                         order.save$()
                         reply(null, {message:"Order confirmed and order Id is "+orderId})
                    }, {
                        noAck: true
                    });
                    
                });                
            });         
        })

    this.add({ init: "order" }, init);

}