var express = require('express');
const axios = require('axios').default;
var router = express.Router();

//GET : http://localhost:3000/cart/view

router.get('/view', function(req, res, next) {
  axios.get('http://localhost:9092/cart',{
    params: {
      service: 'cart',
      action:'view'
    }
  }).then(serviceRes=>res.send(serviceRes.data))
  .catch(error=>res.status(500).send({message:'Service is down..'}))
});

//Post : http://localhost:3000/cart/add
router.post('/add/', function(req, res, next) {
    axios.get('http://localhost:9092/cart',{
      params: {
        service: 'cart',
        action:'add',
        title:req.body.title
      }
    }).then(serviceRes=>res.send(serviceRes.data))
    .catch(error=>res.status(500).send({message:'Service is down..'}))
  });




  //delete : http://localhost:3000/cart/delete/Coffeehouse
router.delete('/delete/:title', function(req, res, next) {
    axios.get('http://localhost:9092/cart',{
      params: {
        service: 'cart',
        action:'remove',
        title:req.params.title
      }
    }).then(serviceRes=>res.send(serviceRes.data))
    .catch(error=>res.status(500).send({message:'Service is down..'}))
  });




module.exports = router;