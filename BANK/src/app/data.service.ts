import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const options={
  headers:new HttpHeaders()
}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  
  constructor(private http:HttpClient) {
   }

  
  
  //register
  register(accno:any,username:any,password:any){
    const body={
      accno,
      username,
      password
    }
    return this.http.post('http://localhost:3001/register',body)

 
  }
  login(accno:any,passwd:any){
    const body={
      accno,
      passwd
    }
    //login api
    return this.http.post('http://localhost:3001/login',body)

  
  }

deposit(accno:any,passwd:any,amt:any){

  const body={
    accno,
    passwd,
    amt
  }
  //deposit API
  return this.http.post('http://localhost:3001/deposit',body,this.getToken())
}
  // to get token and attach to req header
  getToken(){
    //get token
    var token =JSON.parse(localStorage.getItem('token')||'')
    //create request header
    let headers=new HttpHeaders()
    headers=headers.append('x-access-token',token)
    //function overloading
    options.headers=headers
    return options
  }



withdraw(accno:any,passwd:any,amt:any){
  const body={
    accno,
    passwd,
    amt
  }
  //withdraw  API
  return this.http.post('http://localhost:3001/withdraw',body,this.getToken())

  }

  getTransaction(accno:any){
    const body={
      accno
    }
    //transaction  API
    return this.http.post('http://localhost:3001/transaction',body,this.getToken())
    }

deleteAcc(accno:any){
  //delete Api
  return this.http.delete('http://localhost:3001/deleteAcc/'+accno)
}

}