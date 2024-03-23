import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Collection } from 'src/app/Models/collection';
import { CollectionCenter } from 'src/app/Models/collectioncenter';
import { NameId } from 'src/app/Models/name-id';
import { Role } from 'src/app/Models/Enum/role';
import { CollectionmanagerService } from 'src/app/Services/collectionmanager.service';
import { CropService } from 'src/app/Services/crop.service';
import { UserService } from 'src/app/Services/user.service';
import { UserroleService } from 'src/app/Services/userrole.service';
import { Userdetails } from 'src/app/Models/userdetails';

@Component({
  selector: 'app-addcollection',
  templateUrl: './addcollection.component.html',
  styleUrls: ['./addcollection.component.css']
})
export class AddcollectionComponent {

  collectionForm: FormGroup;
  farmers: Userdetails[] = [];
  crops: NameId[] = [];
  containerTypes: string[] = [];

  private usersSubscription: Subscription | undefined;
  private cropsSubscription: Subscription | undefined;
  private containerTypesSubscription: Subscription | undefined;
  collectionCenterId: number=0;

  constructor(
    private formbuilder: FormBuilder,
    private cropsvc: CropService,
    private usersvc: UserService,
    // private collectionsvc: CollectionService,
    private userrolesvc: UserroleService,
    private colmsvc:CollectionmanagerService
    ) {
    this.collectionForm = this.formbuilder.group({
      farmerId: ['', Validators.required],
      cropId: ['', Validators.required],
      containerType: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      weight: ['', [Validators.required, Validators.pattern('[0-9]+')]]
    });
  }

  ngOnInit() {

    this.usersSubscription = this.userrolesvc.getusers(Role.farmer).subscribe((res) => {
             this.farmers = res;
             console.log(res);
      });
    
    this.cropsSubscription = this.cropsvc.getCrops().subscribe((res) => {
      this.crops = res;
    });
    this.containerTypesSubscription = this.colmsvc.getContainerTypes().subscribe((res) => {
      this.containerTypes = res;
    });
    this.colmsvc.getCollectionCenterId().subscribe((collectionCenterId)=>{
      this.collectionCenterId=collectionCenterId;
      console.log("🚀 ~ this.colmsvc.getCollectionCenterId ~ collectionCenterId:", collectionCenterId);
    })
  }

  OnSubmit() {

    if (this.collectionForm.valid) {
      let collection:Collection = {
        farmerId: this.collectionForm.get('farmerId')?.value,
        cropId: this.collectionForm.get('cropId')?.value,
        containerType: this.collectionForm.get('containerType')?.value,
        quantity: this.collectionForm.get('quantity')?.value,
        weight: this.collectionForm.get('weight')?.value,
        collectionCenterId:this.collectionCenterId,
      }
      console.log(collection);


      this.colmsvc.addCollection(collection).subscribe((res) => {
        if (res) {
          alert("collection added Sucessfully")
          this.collectionForm.reset();
        }
      })
    }
    else {
      console.log('Form is invalid. Please check the input fields.');
    }
  }
  ngOnDestroy(): void {
    this.usersSubscription?.unsubscribe();
    this.containerTypesSubscription?.unsubscribe();
    this.cropsSubscription?.unsubscribe();
  }

}



