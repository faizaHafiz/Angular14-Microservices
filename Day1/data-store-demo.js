var seneca = require('seneca')({ log: 'silent' })
var entities = require('seneca-entity')

seneca
    .use(entities)
    .use('mongo-store', {
        uri: 'mongodb://127.0.0.1:27017/simpledb'
    })
seneca.ready(function () {
    var apple = seneca.make$('fruit');
    apple.name = 'Pink Lady';
    apple.price = 0.99;
    apple.save$(function (err, apple) {
        console.log("apple.id = " + apple.id)
        seneca.close((err) => console.log("connected closed.."))
    })

})