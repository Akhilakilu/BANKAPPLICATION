import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  accno:any
  transactions:any
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    //get the account number
 this.accno=JSON.parse(localStorage.getItem("currentAccno")||'')
 this.dataService.getTransaction(this.accno)
 .subscribe((result:any)=>{
  this.transactions=result.transaction
 },
 result=>{
  alert(result.error.message)
 }
 )
}}

