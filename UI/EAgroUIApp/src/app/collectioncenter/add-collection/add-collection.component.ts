import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/Models/Enums/role';
import { GoodsCollection } from 'src/app/Models/goods-collection';
import { NameId } from 'src/app/Models/name-id';
import { CollectionService } from 'src/app/Services/collection-service.service';
import { CropService } from 'src/app/Services/crop.service';
import { UserRoleService } from 'src/app/Services/user-role.service';
import { VerifiedCollectionService } from 'src/app/Services/verified-collection.service';
import { UserService } from 'src/app/Shared/users/user.service';


@Component({
  selector: 'app-add-collection',
  templateUrl: './add-collection.component.html',
  styleUrls: ['./add-collection.component.css']
})
export class AddCollectionComponent implements OnInit, OnDestroy {

  collectionForm: FormGroup;
  farmers: NameId[] = [];
  crops: NameId[] = [];
  containerTypes: string[] = [];

  private usersSubscription: Subscription | undefined;
  private cropsSubscription: Subscription | undefined;
  private containerTypesSubscription: Subscription | undefined;

  constructor(
    private formbuilder: FormBuilder,
    private cropsvc: CropService,
    private usersvc: UserService,
    private collectionsvc: CollectionService,
    private userrolesvc: UserRoleService,
    private verifiedcollectionsvc: VerifiedCollectionService) {
    this.collectionForm = this.formbuilder.group({
      farmerId: ['', Validators.required],
      cropId: ['', Validators.required],
      containerType: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      weight: ['', [Validators.required, Validators.pattern('[0-9]+')]]
    });
  }

  ngOnInit() {

    this.usersSubscription = this.userrolesvc.getusersId(Role.farmer).subscribe((res) => {
      this.usersvc.getUserNamesWithId(res).subscribe((farmers) => {
        this.farmers = farmers;
      });
    })
    this.cropsSubscription = this.cropsvc.getCrops().subscribe((res) => {
      this.crops = res;
    });
    this.containerTypesSubscription = this.verifiedcollectionsvc.getContainerTypes().subscribe((res) => {
      this.containerTypes = res;
    });
  }

  OnSubmit() {

    if (this.collectionForm.valid) {
      let collection: GoodsCollection = {
        farmerId: this.collectionForm.get('farmerId')?.value,
        cropId: this.collectionForm.get('cropId')?.value,
        containerType: this.collectionForm.get('containerType')?.value,
        quantity: this.collectionForm.get('quantity')?.value,
        weight: this.collectionForm.get('weight')?.value,
        collectionCenterId: Number(localStorage.getItem("collectionCenterId")),
      }

      this.collectionsvc.addCollection(collection).subscribe((res) => {
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
