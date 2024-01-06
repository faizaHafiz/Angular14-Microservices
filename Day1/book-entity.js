var seneca = require('seneca')({ log: 'silent' })
var entities = require('seneca-entity')

seneca.use(entities)

var book = seneca.make$('books');
book.id = 1
book.title = 'Nodejs in Action'
book.pages = 213

book.save$(function (err, book) {
    // console.log(book)
})

var book2 = seneca.make$('books');
book2.id = 2
book2.title = 'Mastering Angular'
book2.pages = 288



book2.save$(function (err, book) {
    //  console.log(book)
})

book.list$({}, function (err, list) {
    console.log("List of books");
    console.log("====================");
    console.log(list);
})