import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifiedCollection } from '../verified-collection';
import { VerifiedCollectionService } from 'src/app/verified-collection.service';

@Component({
  selector: 'app-verify-collection',
  templateUrl: './verify-collection.component.html',
  styleUrls: ['./verify-collection.component.css']
})
export class VerifyCollectionComponent implements OnInit {
  @Input() collectionId!:number;
  collectionForm: FormGroup;
  verifyStatus:boolean=true;
  grades:string[]=[];

  constructor(private formBuilder: FormBuilder,
    private verifiedcollectionsvc: VerifiedCollectionService) {
    this.collectionForm = this.formBuilder.group({
      grade: ['', Validators.required],
      weight: ['', [Validators.required, Validators.pattern('[0-9]+')]]
    });
  }
  ngOnInit(): void {
    this.verifiedcollectionsvc.getGrades().subscribe((res)=>{
      this.grades=res;
    })
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

    console.log(collection)

    this.verifiedcollectionsvc.addVerifiedCollection(collection).subscribe((res)=> {
      if(res){
        window.location.reload();
      }
    });

  }

  }

  onCancelClick(){
    this.verifyStatus=false;
  }
}
