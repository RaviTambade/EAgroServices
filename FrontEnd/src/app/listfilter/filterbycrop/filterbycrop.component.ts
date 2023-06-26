import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CollectionService } from 'src/app/spa/collection.service';
import { Collectionviewmodel } from 'src/app/vendors/collectionviewmodel';
import { Crop } from 'src/app/vendors/crop';

@Component({
  selector: 'app-filterbycrop',
  templateUrl: './filterbycrop.component.html',
  styleUrls: ['./filterbycrop.component.css']
})
export class FilterbycropComponent {
  collectionViewModels: Collectionviewmodel[] | any;
  @Output() newCollection=new EventEmitter<any>();
 farmerId:number |any;  
 collectionViewModel: Collectionviewmodel | any;
 crops:Crop[] |any;
   constructor(private svc: CollectionService,private route:ActivatedRoute) {}
   ngOnInit(): void {
     this.farmerId=this.route.snapshot.paramMap.get("id")

     this.svc.getCrops().subscribe((response) => {
      this.crops = response;
      console.log(response);
    });
   }
 
   form = new FormGroup({
     crop: new FormControl('', Validators.required)
   })
 
 
   get f() {
     return this.form.controls;
   }
 
   submit() {
     console.log(this.form.value);
   }
  
 
     changeCrop(crop: any) {
       console.log(crop.target.value);
       this.svc.getFarmerCollectionByCrop(this.farmerId, crop.target.value).subscribe((response) => {
         console.log(response)
         this.collectionViewModels =response
         this.newCollection.emit({collectionViewModels:this.collectionViewModels})
               console.log(this.farmerId)
       })
     
   }
   
   resetSelection() {
    window.location.reload();
    } 
   
}
