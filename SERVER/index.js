//import express
const express=require('express')
//import data services
const dataService=require('./services/data.service')
// import json webtoken
const jwt=require('jsonwebtoken')
//import cors
const cors=require('cors')
//using express create server app
const app=express()
// use cors to specify origin
app.use(cors({
    origin:`http://localhost:4200`
}))
// to parse json data
app.use(express.json())
// APPLICATION MIDDLEWARE
const appMiddleware=(req,res,next)=>{
    console.log(`INSIDE APPLICATION MIDDLEWARE`);
    next()
}
//app.use(appMiddleware)

//router specific middleware
const jwtMiddleware=(req,res,next)=>{
    console.log(`inside jwtMiddleware`);
    //to fetch token
    const token=req.headers['x-access-token']
    //verify token -verify()
try{
    const data=jwt.verify(token,`supersecretkey12345`)
console.log(data);
next()
}
catch{
    res.status(404).json({
        statusCode:404,
        status:true,
        message:'pls login'
    })
}
}
//http
//get- to read data from server
app.get('/',(req,res)=>{

    res.send('GET METHOD')
})

//post- server create
app.post('/',(req,res)=>{

    res.send('POST METHOD')
})

//put  - modify fully

app.put('/',(req,res)=>{

    res.send('PUT METHOD')
})
//patch -partial modification
app.patch('/',(req,res)=>{

    res.send('PATCH METHOD')
})
//delete

app.delete('/',(req,res)=>{

    res.send('DELETE METHOD')
})

//bank app

//resgister API
app.post('/register',(req,res)=>{
    console.log(req.body);
        //asynchronous

    const result=dataService.register(req.body.accno,
        req.body.username,req.body.password).then(result=>{
            res.status(result.statusCode).json(result)

        })
})
//login API
app.post('/login',(req,res)=>{
    console.log(req.body);
    //asynchronous

   dataService.login(req.body.accno,req.body.passwd)
   .then(result=>{
    res.status(result.statusCode).json(result)
   })
})

//deposit api
app.post('/deposit',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    //ASYNCRONOUS
dataService.deposit(req.body.accno,req.body.passwd,req.body.amt).then(result=>{
    res.status(result.statusCode).json(result)

})

})
//withdraw api

app.post('/withdraw',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataService.withdraw(req.body.accno,req.body.passwd,req.body.amt).then(result=>{
        res.status(result.statusCode).json(result)

})
})
//transaction API
app.post('/transaction',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataService.getTransaction(req.body.accno).then(result=>{
        res.status(result.statusCode).json(result)

})

})
//deleteAcc Api
app.delete('/deleteAcc/:accno',(req,res)=>{
    dataService.deleteAccount(req.params.accno)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

// set port number 3000
app.listen(3001,()=>{
    console.log('SERVER STARTED AT PORT NUMBER 3001');
})