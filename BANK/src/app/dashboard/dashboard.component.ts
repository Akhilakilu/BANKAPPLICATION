import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../data.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //current user
user:any
//to hold  account to delete
accno:any
  //form group
depositForm=this.formBuilder.group({
  accno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  passwd:['',[Validators.required,Validators.pattern('[a-z A-Z 0-9]*')]],
  amount:['',[Validators.required,Validators.pattern('[0-9]*')]],

})
withdrawForm=this.formBuilder.group({
  accno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  passwd:['',[Validators.required,Validators.pattern('[a-z A-Z 0-9]*')]],
  amount:['',[Validators.required,Validators.pattern('[0-9]*')]],

})
constructor(private formBuilder:FormBuilder,private dataService:DataService,private router:Router) { }
//to communci with component
  ngOnInit(): void {
    if(!localStorage.getItem('token')){
      alert('please log in')
      this.router.navigateByUrl('')
    }
    if(localStorage.getItem('currentUser')){
      this.user=JSON.parse(localStorage.getItem('currentUser')||'')
    }
  }
deposit(){
  var accno=this.depositForm.value.accno
  var passwd=this.depositForm.value.passwd
  var amount=this.depositForm.value.amount
  if(this.depositForm.valid){

 this.dataService.deposit(accno,passwd,amount)
 .subscribe((result:any)=>{
alert(result.message)
 },
 result=>{
  alert(result.error.message)
 }
 )
}
   else{
     alert('invalid form')
   }
}
withdraw(){
  var accno=this.withdrawForm.value.accno
  var passwd=this.withdrawForm.value.passwd
  var amount=this.withdrawForm.value.amount
  if(this.withdrawForm.valid){
 this.dataService.withdraw(accno,passwd,amount)
 .subscribe((result:any)=>{
  alert(result.message)
   },
   result=>{
    alert(result.error.message)
   }
   )
   }
   else{
     alert('invalid form')
   }

}
logout(){

  localStorage.removeItem('currentAccno')
  localStorage.removeItem('currentUser')
  localStorage.removeItem('token')

this.router.navigateByUrl('')
}

deleteAcc(){
this.accno=JSON.parse(localStorage.getItem('currentAccno')|| "")
}
cancel(){
  this.accno='';
}
delete(event:any){
  this.dataService.deleteAcc(event)
  .subscribe((result:any)=>{
    alert(result.message)
    this.logout()
  },
  result=>{
    alert(result.error.message)
  }
  )
}
}
