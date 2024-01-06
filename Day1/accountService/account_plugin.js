function init(message, respond) {
    console.log("account plugin initialised");
    // users = require("./users.json")
    // users=[{name:"faiza",password:"12345"}]
    respond()
}

module.exports = function account() {
    this.add({ service: 'account', operation: 'login' }, (args, reply) => {
        const users = this.make$('users');      
        users.list$({username:args.username}, (err, userlist) => {
            if (err) reply(err, null)
            // console.log("User data retrieved "+userlist)
            let result=""
            loggedIn=false
            if(userlist.length==0){
                result="Invalid user. Please register first"
            }
            else{
                if(userlist[0].password == args.password){
                    result="Logged in successfully"
                    loggedIn=true
                    // result=userlist[0]
                }
                else{
                    result="Incorrect password"
                }
            }
            
            reply(null, { users: result,loggedIn:loggedIn})
            
        })
        
        // let userAvailable = users.find(user => user.email == args.email)
        // if (userAvailable) {
        //     if (userAvailable.password == args.password) {
        //         reply(null, { mssg: "Logged in" })
        //     } else {
        //         reply({ err: "Incorrect password" }, null)
        //     }
        // }
        // else {
        //     reply({ err: "Invalid user" }, null)
        // }

    })

    //register user
    this.add({ service: 'account', operation: 'register' }, (args, reply) => {
        const users = this.make$('users')
        users.fullname = args.fullname;
        users.username = args.username;
        users.email = args.email;
        users.password = args.password;
        users.save$((err,userdata)=>{
            if(err) reply(err,null)
            reply(null,{message:`user ${userdata.fullname} is added successfully`})
        })

        // const fs = require("fs");
        // if(users.find(user => user.email == args.email)){
        //     reply({err:"User already exists"},null)
        // }else{
        //     users.push({
        //         name: args.name,
        //         email: args.email,
        //         password: args.password
        //     })
        //     var newData2 = JSON.stringify(users); //convert json to string

        //     fs.writeFile('users.json', newData2, err => {
        //         if(err) throw err;
        //         // console.log("New data added");
        //     });  
        //     reply(null,{success:"Registered successflly. Please login to continue"})
        // }
    })


    this.add({ init: 'account' }, init)
}