import { Component, Input } from '@angular/core';
import { GoodsCollection } from '../goods-collection';
import { UnverifiedCollection } from '../unverified-collection';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NameId } from 'src/app/name-id';
import { CropService } from 'src/app/crop.service';
import { UserService } from 'src/app/Shared/users/user.service';
import { UserRoleService } from 'src/app/user-role.service';
import { CollectionService } from 'src/app/collection-service.service';
import { UpdateCollection } from '../update-collection';
import { VerifiedCollectionService } from 'src/app/verified-collection.service';

@Component({
  selector: 'app-update-collection',
  templateUrl: './update-collection.component.html',
  styleUrls: ['./update-collection.component.css']
})
export class UpdateCollectionComponent {

  @Input() collection!: UnverifiedCollection

  collectionForm: FormGroup | any;
  farmers: NameId[] = [];
  crops: NameId[] = [];
  containerTypes: string[] = [];
  UpdateStatus:boolean=true;

  constructor(private formBuilder: FormBuilder, private cropsvc: CropService, private usrsvc: UserService,
    private collectionsvc: CollectionService, private userrolesvc: UserRoleService, private verifiedcollectionsvc: VerifiedCollectionService) {

  }

  ngOnInit() {
    this.collectionForm = this.formBuilder.group({
      farmerId: [this.collection.farmerId, Validators.required],
      cropId: [this.collection.cropId, Validators.required],
      containerType: [this.collection.containerType, Validators.required],
      quantity: [this.collection.quantity, [Validators.required, Validators.pattern('[0-9]+')]],
      weight: [this.collection.weight, [Validators.required, Validators.pattern('[0-9]+')]]
    });
    console.log();
    this.userrolesvc.getFarmersIds().subscribe((res) => {
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
      let collection: UpdateCollection = {
        farmerId: this.collectionForm.get('farmerId')?.value,
        cropId: this.collectionForm.get('cropId')?.value,
        containerType: this.collectionForm.get('containerType')?.value,
        quantity: this.collectionForm.get('quantity')?.value,
        weight: this.collectionForm.get('weight')?.value,
        id: this.collection.collectionId,
      }
      console.log("🚀 ~ OnSubmit ~ collection:", collection);

      this.collectionsvc.updateCollection(collection).subscribe((res) => {
        console.log(res);
        if(res){

          window.location.reload();
        //   this.collection={
        //     farmerId: this.collectionForm.get('farmerId')?.value,
        //     cropId: this.collectionForm.get('cropId')?.value,
        //     containerType: this.collectionForm.get('containerType')?.value,
        //     quantity: this.collectionForm.get('quantity')?.value,
        //     weight: this.collectionForm.get('weight')?.value,
        //     collectionId: this.collection.collectionId,
        //     farmerName:this.farmers.find(item => item.id === collection.farmerId)?.name,
        //     cropName:this.crops.find(item => item.id === collection.farmerId)?.name,
        //     collectionDate:this.collection.collectionDate
        //   };

        }

      })
    }
    else {
      console.log('Form is invalid. Please check the input fields.');
    }
  }

  onCancelClick(){
    this.UpdateStatus=false;
  }



}
