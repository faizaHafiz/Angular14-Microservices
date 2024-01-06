const seneca = require('seneca')({log:'silent'})

// seneca.quiet()
console.log(seneca.id);

//Math service - add sub addbythree

//defining the feature using action & pattern. reply is callback fn
seneca.add({service:'Math',feature:'add'},(args,reply)=>{
    let result = args.inum1 + args.inum2;
    if(args.inum2 <= 0){
        reply({err:'Number 2 cannot be less than 0'},null)
    }else{
        reply(null,{result}) //reply(err:'',response)
    }
})

//exending the pattern of add
seneca.add({service:'Math',feature:'add',by:'three'},(args,reply)=>{
    let total = args.inum1 + args.inum2 +args.inum3;
    reply(null,{total})
})

//calling the action using particular pattern
seneca.act({service:'Math',feature:'add',inum1:4,inum2:4},(err,response)=>{
    if(err) console.log("error: "+err)
    else console.log("result : "+response.result)
})

seneca.act({service:'Math',feature:'add',inum1:15,inum2:0},seneca.util.print)

//subtraction feature
seneca.add({service:'Math',feature:'subtract'},(args,reply)=>{
    let difference = args.inum1 - args.inum2;
    reply(null,{difference})
})
seneca.act({service:'Math',feature:'subtract',inum1:8,inum2:4},seneca.util.print)
seneca.act({service:'Math',feature:'add',inum1:8,inum2:4},seneca.util.print)
seneca.act({service:'Math',feature:'add',by:'three',inum1:8,inum2:4,inum3:9},seneca.util.print)