import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageKeys } from 'src/app/Models/local-storage-keys';
import { VerifyCollection } from 'src/app/Models/verifycollection';
import { InspectorService } from 'src/app/Services/inspector.service';
import { VerifiedCollectionService } from 'src/app/Services/verified-collection.service';

@Component({
  selector: 'app-verify-collection',
  templateUrl: './verify-collection.component.html',
  styleUrls: ['./verify-collection.component.css'],
})
export class VerifyCollectionComponent implements OnInit {
 collectionId: number=0;
  collectionForm: FormGroup;
  verifyStatus: boolean = true;
  grades: string[] = [];
  inspectorId: number=0;

  constructor(
    private formbuilder: FormBuilder,
    private verifiedcollectionsvc: VerifiedCollectionService,
    private inspectorsvc:InspectorService

  ) {
    this.collectionForm = this.formbuilder.group({
      grade: ['', Validators.required],
      weight: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    });
  }
  ngOnInit(): void {
    this.inspectorsvc.verifiedCollectionId$.subscribe((collectionId) => {
      this.collectionId = collectionId;
    this.verifiedcollectionsvc.getGrades().subscribe((res) => {
      this.grades = res;
    });
  })
  }

  OnSubmit() {
    if (this.collectionForm.valid && this.collectionId) {
      this.inspectorsvc.getcollectionCenterId().subscribe((res) => {
this.inspectorId=res.id;
console.log(res);
      
      const collection: VerifyCollection = {
        collectionId: this.collectionId,
        grade: this.collectionForm.get('grade')?.value,
        weight: this.collectionForm.get('weight')?.value,
        inspectorId: this.inspectorId,
      };
    

      console.log(collection);

      this.verifiedcollectionsvc
        .addVerifiedCollection(collection)
        .subscribe((res) => {
          if (res) {
            alert("Crop Verified Succesfully")
            window.location.reload();
          }
        });
      });
    }
  }

  onCancelClick() {
    this.verifyStatus = false;
  }
}
