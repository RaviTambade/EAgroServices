import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Subscription } from 'rxjs';
import { Farmer } from '../../farmers/farmer';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{
 
  subscription: Subscription|undefined;
  userList:any[];
  userList1:Farmer[];
  role: string;
  searchString:string;
  showAllStatus: boolean;

  constructor(private svc:EmployeeService){}
  ngOnInit(): void {
    this.subscription = this.svc.getData().subscribe((response)=>{
      this.role=response.role
      this.userList=response.data.slice(0,10);
      this.userList1=response.data;
      console.log(this.role)
      console.log(response)
    })
    }
   

 onSearch(){
  if(this.searchString==undefined){
    return;
  }
  this.searchString=this.searchString.toLowerCase();
  this.userList=this.userList1.filter(user=>(user.firstName.toLowerCase().startsWith(this.searchString)
                ||  user.lastName.toLowerCase().startsWith(this.searchString)
                || user.firstName.concat(" "+user.lastName).toLowerCase().startsWith(this.searchString)
                || user.firstName.concat(user.lastName).toLowerCase().startsWith(this.searchString)));
  console.log(this.userList)
}
onShowAll(){
 this.userList=this.userList1;
}

    ngOnDestroy() {
      if(this.subscription !=undefined)
      this.subscription.unsubscribe();
    }
  }


