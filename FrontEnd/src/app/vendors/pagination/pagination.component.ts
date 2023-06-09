import { Component } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
 items=["abh","ay","yui","ioi","yui","uio","uio","opo","hjh","yuy","etrty","uio","opo","hjh","yuy","etrty"];
currentPage=0;
arrLenght=0;
constructor(){
  this.arrLenght=this.items.length
}
get getItems():any[]{
  const startindex = this.currentPage * 5;
  const endindex = startindex + 5;
  return this.items.slice(startindex, endindex);
}
 next(){
  // if(this.currentPage >= this.arrLenght )
  this.currentPage++;
 }
 previous(){
  if (this.currentPage > 0) {
    this.currentPage--;
  }
 }
}

