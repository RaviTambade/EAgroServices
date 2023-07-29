import { Component, OnInit } from '@angular/core';
import { CropService } from '../crop.service';
import { Crop } from '../crop';

@Component({
  selector: 'app-cropsdetails',
  templateUrl: './cropsdetails.component.html',
  styleUrls: ['./cropsdetails.component.css']
})
export class CropsdetailsComponent implements OnInit{
  constructor(private svc:CropService){}
  crops:Crop[]|any;
  ngOnInit(): void {
   this.svc.cropDetails().subscribe((response)=>{
    this.crops=response;
    console.log(response);
   })
  }

}
