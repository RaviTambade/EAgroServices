import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifiedCollection } from '../../Models/verified-collection';
import { VerifiedCollectionService } from 'src/app/Services/verified-collection.service';
import { LocalStorageKeys } from 'src/app/Models/Enums/local-storage-keys';

@Component({
  selector: 'app-verify-collection',
  templateUrl: './verify-collection.component.html',
  styleUrls: ['./verify-collection.component.css'],
})
export class VerifyCollectionComponent implements OnInit {
  @Input() collectionId: number | undefined;
  collectionForm: FormGroup;
  verifyStatus: boolean = true;
  grades: string[] = [];

  constructor(
    private formbuilder: FormBuilder,
    private verifiedcollectionsvc: VerifiedCollectionService
  ) {
    this.collectionForm = this.formbuilder.group({
      grade: ['', Validators.required],
      weight: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    });
  }
  ngOnInit(): void {
    this.verifiedcollectionsvc.getGrades().subscribe((res) => {
      this.grades = res;
    });
  }

  OnSubmit() {
    if (this.collectionForm.valid && this.collectionId) {
      const inspectorId: number = Number(
        localStorage.getItem(LocalStorageKeys.inspectorId)
      );

      const collection: VerifiedCollection = {
        collectionId: this.collectionId,
        grade: this.collectionForm.get('grade')?.value,
        weight: this.collectionForm.get('weight')?.value,
        inspectorId: inspectorId,
      };

      console.log(collection);

      this.verifiedcollectionsvc
        .addVerifiedCollection(collection)
        .subscribe((res) => {
          if (res) {
            window.location.reload();
          }
        });
    }
  }

  onCancelClick() {
    this.verifyStatus = false;
  }
}
