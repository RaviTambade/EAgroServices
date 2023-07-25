import { Component, OnInit } from '@angular/core';
import { GoodsCollection } from '../goods-collection';
import { NameId } from 'src/app/name-id';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CropService } from 'src/app/crop.service';
import { CollectionService } from 'src/app/collection-service.service';
import { UserRoleService } from 'src/app/user-role.service';
import { UserService } from 'src/app/Shared/users/user.service';
import { VerifiedCollectionService } from 'src/app/verified-collection.service';

@Component({
  selector: 'app-add-collection',
  templateUrl: './add-collection.component.html',
  styleUrls: ['./add-collection.component.css']
})
export class AddCollectionComponent implements OnInit {

  collectionForm: FormGroup;
  farmers: NameId[] = [];
  crops: NameId[] = [];
  containerTypes: string[] = [];

  constructor(private formBuilder: FormBuilder, private cropsvc: CropService, private usrsvc: UserService,
    private collectionsvc: CollectionService, private userrolesvc: UserRoleService,private verifiedcollectionsvc:VerifiedCollectionService) {
    this.collectionForm = this.formBuilder.group({
      farmerId: ['', Validators.required],
      cropId: ['', Validators.required],
      containerType: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      weight: ['', [Validators.required, Validators.pattern('[0-9]+')]]
    });
  }

  ngOnInit() {
    
   console.log( );
    this.userrolesvc.getusersId("farmer").subscribe((res) => {
      this.usrsvc.getUserNamesWithId(res).subscribe((farmers) => {
        this.farmers = farmers;
      });
    })
    this.cropsvc.getCrops().subscribe((res) => {
      this.crops = res;
    });
    this.verifiedcollectionsvc.getContainerTypes().subscribe((res) => {
      this.containerTypes = res;
    });


  }

  OnSubmit() {

    if (this.collectionForm.valid) {
      let collection:GoodsCollection={
        farmerId: this.collectionForm.get('farmerId')?.value,
        cropId: this.collectionForm.get('cropId')?.value,
        containerType: this.collectionForm.get('containerType')?.value,
        quantity: this.collectionForm.get('quantity')?.value,
        weight: this.collectionForm.get('weight')?.value,
        collectionCenterId: Number(localStorage.getItem("collectionCenterId")),
        // collectionDate: new Date().toISOString().slice(0,19)
      }
      console.log("🚀 ~ OnSubmit ~ collection:", collection);

      this.collectionsvc.addCollection(collection).subscribe((res)=>{
      console.log('res');
      })
    } 
    else {
      console.log('Form is invalid. Please check the input fields.');
    }
  }

}
