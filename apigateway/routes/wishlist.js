var express = require('express')
var router = express.Router()
let wishlist = [
    {pid:1002,pname:'logitech 5100 wired mouse'},
    {pid:1003,pname:'logitech 5100 wired mouse'},
    {pid:1004,pname:'logitech keyboard'},
    {pid:1005,pname:'logitech 5100 wired mouse'}
]

router.get('/',function(req,res,next){
    // res.send({wishlist})
    let list = wishlist.slice(0,req.query.limit)
    res.send({list})
});

router.get('/:pid',function(req,res,next){//route parameter
    // res.send({wishlist})
    let product = wishlist.find(prod=>prod.pid==req.params.pid)
    res.send({product})
});

router.post('/add',function(req,res,next){
    wishlist.push(req.body)
    res.send({message:"Added to the wishlist"})
    // res.send(req.body)
})

module.exports = router