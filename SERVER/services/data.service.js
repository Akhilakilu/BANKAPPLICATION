// import json webtoken
const jwt=require('jsonwebtoken')
//import db.js
const db=require('./db')

database={
    1000:{accno:1000,username:'sarojini',password:1000,balance:5000,transaction:[]},
    1001:{accno:1001,username:'aravind',password:1000,balance:7000,transaction:[]},
    1002:{accno:1002,username:'babu',password:1000,balance:8000,transaction:[]} 
  }

  //register
  //username accno password
  const register=(accno,username,password)=>{
        //asynchronous

 return db.User.findOne({
  accno
 }).then(result=>{
  if(result){
    return {
      statusCode:404,
      status:false,
      message:'User already exist,pls login'
    }
  }
  else{
    const newUser=new db.User({
      accno,
      username,
      password,
      balance:0,
      transaction:[]
    })
    newUser.save()
    return {
      statusCode:200,
      status:true,
      message:'Successfully registered'

    }
  }
 })
  
  }

  //login


  const login=(accno,passwd)=>{
   //search accno,passwd in mongodb
   return db.User.findOne({
    accno,
    password:passwd
   }).then(result=>{
    if(result){
      currentUser=result.username
      currentAccno=accno
      //token generation sign()
      const token=jwt.sign({
        currentAccno:accno
      },`supersecretkey12345`)
      return{
        statusCode:200,
        status:true,
        message:'login successfull',
        currentUser,
        currentAccno,
        token
      }
    }
 
    else{
      return  {
        statusCode:404,
        status:false,
        message:'INCORRECT PASSWORD/account number '
      }
    }
  
  })
}
//deposit
const deposit=(accno,passwd,amt)=>{
  const amount=parseInt(amt)
  return db.User.findOne({
    accno,
    password:passwd
  }).then(result=>{
    if(result){
      result.balance+=amount
      result.transaction.push({
        type:`CREDIT`,
        amount
      })
      result.save()
      return{
        statusCode:200,
        status:true,
        message:`${amount} is depositted successfully and the new balance is ${result.balance}`
      }
    }
    else{
      return  {
        statusCode:404,
        status:false,
        message:'INCORRECT PASSWORD/ACCOUNT NUMBER'
      }
    }
  })
  }

  //withdraw
  const withdraw=(accno,passwd,amt)=>{
    const amount=parseInt(amt)
    return db.User.findOne({
      accno,
      password:passwd
    }).then(result=>{
      if(result){
        if(result.balance>amount){
        result.balance-=amount
        result.transaction.push({
          type:`DEBIT`,
          amount
        })
        result.save()
        return{
          statusCode:200,
          status:true,
          message:`${amount} is debited successfully and the new balance is ${result.balance}`
        }
      }
      else{
        return  {
          statusCode:404,
          status:false,
          message:'insufficient balance'
        }
      }
    
    }
  else{
    return{
      statusCode:404,
      status:false,
      message:'INCORRECT PASSWORD/ACCOUNT NUMBER'
    }
  }
})
  
    }
  //transaction
  const getTransaction=(accno)=>{
    return db.User.findOne({
      accno,
    }).then(result=>{
    if(result){
    return {
      statusCode:200,
        status:true,
        transaction:result.transaction
    }
  }
  else{
    return{
      statusCode:404,
        status:false,
        message:'user doesnt exist'
    }
  }
})
}
//delete

const deleteAccount=(accno)=>{
  return db.User.deleteOne({
    accno
  }).then(result=>{
    if(result){
      return{
        statusCode:200,
        status:true,
        message:"ACCOUNT deleted successfully"
      }
      }
    else{
      return{
        statusCode:404,
        status:false,
        message:"ACCOUNT doesnot exist"
      }
    }
  })
}
  module.exports={
    register,
    login,
    deposit,
    withdraw,
    getTransaction,
    deleteAccount
  }