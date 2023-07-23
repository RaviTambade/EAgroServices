import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CollectionService } from 'src/app/collection-service.service';
import { VerifiedCollection } from '../verified-collection';
import { VerifiedCollectionService } from 'src/app/verified-collection.service';
import { window } from 'rxjs';

@Component({
  selector: 'app-verify-collection',
  templateUrl: './verify-collection.component.html',
  styleUrls: ['./verify-collection.component.css']
})
export class VerifyCollectionComponent {
  @Input() collectionId!:number;
  collectionForm: FormGroup;
  verifyStatus:boolean=true;
  grades:any[]=[];

  constructor(private formBuilder: FormBuilder,
    private verifiedcollectionsvc: VerifiedCollectionService,) {
    this.collectionForm = this.formBuilder.group({
      grade: ['', Validators.required],
      weight: ['', [Validators.required, Validators.pattern('[0-9]+')]]
    });
  }

  OnSubmit(){
    if (this.collectionForm.valid) {
      const userId:number=Number(localStorage.getItem("userId"));

    const collection :VerifiedCollection={
      collectionId: this.collectionId,
      grade: this.collectionForm.get('grade')?.value,
      weight: this.collectionForm.get('weight')?.value,
      inspectorId: userId
    }
    this.verifiedcollectionsvc.addVerifiedCollection(collection).subscribe((res)=>{
      if(res){
        // window.location.reload();
      }
    });

  }

  }

  onCancelClick(){
    this.verifyStatus=false;
  }
}
