const seneca = require('seneca')({log:'silent'})

seneca.use('./catalog_plugin.js')

// seneca.act({service:'catalog',by:'title',title:'Coffeehouse'},seneca.util.print)
seneca.listen({port:9090,path:"/catalog"})