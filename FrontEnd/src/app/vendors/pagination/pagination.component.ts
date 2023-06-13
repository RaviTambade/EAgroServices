import { Component } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  items = ["abh", "ay", "yui", "ioi", "yui", "uio", "uio", "opo", "hjh", "yuy", "etrty", "uio", "opo", "hjh", "yuy","abc"];
  currentPage = 0;
  arrLenght = 0;
  constructor() {
    this.arrLenght = this.items.length
    console.log("🚀 ~ constructor ~ this.arrLenght:", this.arrLenght);
  }
  get getItems(): any[] {
    const startindex = this.currentPage * 5;
    const endindex = startindex + 5;
    return this.items.slice(startindex, endindex);
  }
  next() {
    this.currentPage++;
  }
  hasNextPage(): boolean {
    const totalpages = Math.trunc(this.arrLenght / 5);
    console.log("🚀 ~ hasnextPage ~ totalpages:", totalpages);
   
    if(this.arrLenght %5 ==0){
      return this.currentPage < totalpages-1;
    }

    if (this.currentPage < totalpages ) {
      return true;
    }
    return false;
  }
  hasPreviousPage(): boolean {
    return this.currentPage != 0;
  }
  previous() {
    this.currentPage--;
  }
}


