import { Component, OnInit } from '@angular/core';
import { Crop } from '../../Models/crop';
import { CropService } from 'src/app/Services/crop.service';

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
