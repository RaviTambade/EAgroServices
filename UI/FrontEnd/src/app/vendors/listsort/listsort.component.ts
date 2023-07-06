import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listsort',
  templateUrl: './listsort.component.html',
  styleUrls: ['./listsort.component.css']
})
export class ListsortComponent  {

  nums:any[];
  numsSort:any[];
  constructor(){
    this.nums=[6,7,8,9,7,5,5,4,3,2,1,7,8,9,0];
    this.numsSort=[]
  }
 
  onclick(){
  this.nums.sort((a,b)=>a-b)
  }
  


}
