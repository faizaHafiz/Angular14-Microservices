var express = require('express');
const axios = require('axios').default;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://localhost:9090/catalog',{
    params:{
      service:'catalog'
    }
  })
  .then(serviceRes=>res.send(serviceRes.data))
  .catch(error=>res.status(500).send({message:'Service is down'}))  
});

//////////search by bookname
router.get('/title/:bookName', function(req, res, next) {
  axios.get('http://localhost:9090/catalog',{
    params:{
      service:'catalog',
      by:'title',
      title:req.params.bookName
    }
  })
  .then(serviceRes=>{
    if(serviceRes.data.err){
      res.status(404).send(serviceRes.data)
    }else{
      res.send(serviceRes.data)
    }
  }
    )
  .catch(error=>res.status(500).send({message:'Service is down'}))  
});

///////////search by category  http://localhost:3000/catalog/category/Internet
router.get('/category/:categoryName', function(req, res, next) {
  axios.get('http://localhost:9090/catalog',{ 
    params:{
      service:'catalog',
      by:'category',
      category:req.params.categoryName
    }
  })
  .then(serviceRes=>{
    if(serviceRes.data.err){
      res.status(404).send(serviceRes.data)
    }else{
      res.send(serviceRes.data)
    }
  }
    )
  .catch(error=>res.status(500).send({message:'Service is down'}))  
});

/////////search by good rating http://localhost:3000/catalog/category/Internet/rating/good

router.get('/category/:categoryName/rating/:ratingName',function(req,res,next){
  axios.get('http://localhost:9090/catalog',{
    params:{
      service:"catalog",
      by:'category',
      category:req.params.categoryName,
      rating:req.params.ratingName
    }
  })
  .then(serviceRes=>{
    if(serviceRes.data.err){
      res.status(404).send(serviceRes.data)
    }else{
      res.send(serviceRes.data)
    }
  })
  .catch(error=>res.status(500).send({message:'Service is down'}))
})


module.exports = router;
