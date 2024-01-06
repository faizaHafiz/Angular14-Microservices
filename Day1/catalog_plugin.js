function init(option,done){
    console.log("catalog plugin initialised");
    books = require("./Books.json")
    done()
}

module.exports = function catalog(){
    this.add({service:'catalog'},(args,reply)=>{
        reply(null,{books:books})
    })
    
    //send details of particular book (first match) title
    this.add({service:'catalog',by:'title'},(args,reply)=>{
        let bookFound=[]
        bookFound.push(books.find(book=>book.title==args.title))
        if(bookFound) {
            // console.log(bookFound) 
            reply(null,{books:bookFound})
        }
        else reply({err:'Book not found'},null)
    })
    // send books details of particular category
    this.add({service:'catalog',by:'category'},(args,reply)=>{
        let booksFound = books.filter(books=>books.category==args.category)
        if(booksFound.length!=0) reply(null,{books:booksFound})
        else reply({err:'Books not found'},null)
    })
    // send books details of particular category with good rating
    this.add({service:'catalog',by:'category',rating:'good'},(args,reply)=>{
        let booksFound = books.filter(book=>book.category==args.category && book.rating >= 4.4)
        if(booksFound.length!=0) reply(null,{books:booksFound})
        else reply({err:'Books not found'},null)
    })

    this.add({init:'catalog'},init)
}