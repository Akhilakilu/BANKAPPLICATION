import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
//property/variable
// header0="hai"
// header="welcome"
// // header1="......."
// accno=""  // variable inside class
// passwd=""// variable inside class
accplaceholder="type account number here"
//form group
loginForm=this.formBuilder.group({
  accno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  passwd:['',[Validators.required,Validators.pattern('[a-z A-Z 0-9]*')]]
})

// //database
// database:any={
//   1000:{accno:1000,username:'sarojini',password:1000,balance:5000},
//   1001:{accno:1001,username:'aravind',password:1000,balance:7000},
//   1002:{accno:1002,username:'babu',password:1000,balance:8000} 
// }
constructor(private formBuilder:FormBuilder,private dataService:DataService,private router:Router) { }

  ngOnInit(): void {
  }



//user defined functions
//accnoChange(event:any){
  //accno inside class
 // this.accno=event.target.value
  //console.log(event.target.value);
  //we have to give this to another function so declare variable in class
  
  
  //passwdChange(event:any){
    //accno inside class
    //this.passwd=event.target.value
    //console.log(event.target.value);
    
    
//   }
// // login(){
//   //fetch accno
//   //alert('login clicked')
//   var accno1=this.accno
//   //console.log(accno);
//     //fetch accno

//     var passwd1=this.passwd
//     //console.log(passwd);
//     let userDetails=this.database
//     if(accno1 in userDetails)
//   {
//     if(passwd1==userDetails[accno1]['password']){
//   alert('login successful')
//     }
    
  
//   else{
//     alert('incorrect password')
//   }

// }
// else{
//   alert('user does not exist')
// }
// }

// login(a:any,b:any){
//   console.log(a);
//   var accno1=a.value
//   var passwd1=b.value
//   let userDetails=this.database
//     if(accno1 in userDetails)
//   {
//     if(passwd1==userDetails[accno1]['password']){
//   alert('login successful')
//     }
    
  
//   else{
//     alert('incorrect password entered')
//   }

// }
// else{
//   alert('user does not exist')

  
// }}
login(){
  //fetch accno
  var accno=this.loginForm.value.accno
    //fetch passwd

    var passwd=this.loginForm.value.passwd
    if(this.loginForm.valid){
    const result=this.dataService.login(accno,passwd)
.subscribe(
  //status:200
  (result:any)=>{
 localStorage.setItem('token',JSON.stringify(result.token))
 localStorage.setItem('currentUser',JSON.stringify(result.currentUser))
 localStorage.setItem('currentAccno',JSON.stringify(result.currentAccno))
 alert(result.message)
 this.router.navigateByUrl('dashboard')

  },
  //status:404
  result=>{
    alert(result.error.message)
  }
)
    }

else{
  alert('invalid form')
}
}}