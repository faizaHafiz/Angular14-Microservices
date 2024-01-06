var express = require('express');
const axios = require('axios').default;
var router = express.Router();

//GET : http://localhost:3000/account/login

router.post('/login', function(req, res, next) {
  axios.get('http://localhost:9094/account',{
    params: {
      service: 'account',
      operation:'login',
      username: req.body.username,
      password: req.body.password
    }
  }).then(serviceRes=>res.send(serviceRes.data))
  .catch(error=>res.status(500).send({message:'Service is down..'}))
});

router.post('/register', function(req, res, next) {
  axios.get('http://localhost:9094/account',{
    params: {
      service: 'account',
      operation:'register',
      fullname: req.body.fullname,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    }
  }).then(serviceRes=>res.send(serviceRes.data))
  .catch(error=>res.status(500).send({message:'Service is down..'}))
});

module.exports = router;