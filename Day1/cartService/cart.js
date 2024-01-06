const seneca=require('seneca')({log:'silent',timeout:1000000})
const entity = require('seneca-entity')

seneca.use(entity)
seneca.use('mongo-store', {
    host: "localhost",
    port: 27018,
    name: 'cartdb'
})
seneca.use('./cart_plugin.js')
seneca.ready(err=>{
    if(err) throw err;
    seneca.listen({host:'127.0.0.1',port:9092,path:"/cart"})
})