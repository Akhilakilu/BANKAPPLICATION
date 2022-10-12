import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
//form group
registerForm=this.formBuilder.group({
  uname:['',[Validators.required,Validators.pattern('[a-z A-Z]*')]],
  accno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  passwd:['',[Validators.required,Validators.pattern('[a-z A-Z 0-9]*')]]
})
  constructor(private formBuilder:FormBuilder,private dataService:DataService,private router:Router) { }

  ngOnInit(): void {
  }
register(){
  var accno=this.registerForm.value.accno
  var uname=this.registerForm.value.uname
  var passwd=this.registerForm.value.passwd

  if(this.registerForm.valid){
    //asyncronous
 this.dataService.register(accno,uname,passwd)
 .subscribe(
  //status 200
  (result:any)=>{
    alert(result.message)
    this.router.navigateByUrl('')
  },
  //status 400
  result=>{
    alert(result.error.message)
  }
  )
  }
 
else{
  alert('invalid form')
}
}

}
