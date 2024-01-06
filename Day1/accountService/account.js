const seneca = require('seneca')({log:'silent',timeout:1000000})
const entity = require('seneca-entity')

seneca.use(entity)
seneca.use('mongo-store', {
    host: "localhost",
    port: 27020,
    name: 'onlinebookdb'
})
seneca.use('./account_plugin.js')
seneca.ready(err=>{
    if(err) throw err;
    seneca.listen({host:'127.0.0.1',port:9094,path:"/account"})
})


// seneca.use('./account_plugin.js')

// seneca.act({service:'catalog',by:'title',title:'Coffeehouse'},seneca.util.print)
// seneca.listen({host:'127.0.0.1',port:9094,path:"/account"})

// seneca.act({service:'account',operation:'register',name:'mandar',email:'mandar@gmail.com',password:"mandar12345"},seneca.util.print)

//error login
// seneca.act({service:'account',operation:'login',email:'faiz@gmail.com',password:"faiz1234"},seneca.util.print)
// seneca.act({service:'account',operation:'login',email:'mandar@gmail.com',password:"mandar12345"},seneca.util.print)
// seneca.act({service:'account',operation:'login',email:'dipali@gmail.com',password:"dipali12345"},seneca.util.print)
