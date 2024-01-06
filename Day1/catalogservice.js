const seneca = require('seneca')({log:'silent'})
const books = require('./Books.json')

//all books
seneca.add({service:'catalog'},(args,reply)=>{
    reply(null,{books})
})

//send details of particular book (first match)
seneca.add({service:'catalog',by:'title'},(args,reply)=>{
    let bookFound = books.find(book=>book.title==args.title)
    if(bookFound) reply(null,{bookFound})
    else reply({err:'Book not found'},null)
})
// send books details of particular category
seneca.add({service:'catalog',by:'category'},(args,reply)=>{
    let booksFound = books.filter(books=>books.category==args.category)
    if(booksFound.length!=0) reply(null,{booksFound})
    else reply({err:'Books not found'},null)
})
// send books details of particular category with good rating
seneca.add({service:'catalog',by:'category',rating:'good'},(args,reply)=>{
    let booksFound = books.filter(book=>book.category==args.category && book.rating >= 4.4)
    if(booksFound.length!=0) reply(null,{booksFound})
    else reply({err:'Books not found'},null)
})
// seneca.act({service:'catalog'},seneca.util.print)
// seneca.act({service:'catalog',by:'title',title:'Angular'},seneca.util.print)
// seneca.act({service:'catalog',by:'title',title:'Coffeehouse'},seneca.util.print)
seneca.act({service:'catalog',by:'category',category:'Internet'},seneca.util.print)
seneca.act({service:'catalog',by:'category',category:'Internet',rating:'good'},seneca.util.print)