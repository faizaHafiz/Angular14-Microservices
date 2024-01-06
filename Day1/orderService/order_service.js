const seneca=require('seneca')({log:'silent',timeout:100000})
const entity=require('seneca-entity')

seneca.use(entity)
seneca.use('mongo-store',{
    host:"localhost",
    port:27018,
    name:'orderdb'
})
seneca.use('./order_plugin.js')
seneca.ready(err=>{
    if(err) throw err;
    seneca.listen({host:'127.0.0.1',port:9093,path:"/order"})
})
