import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CollectionService } from 'src/app/spa/collection.service';
import { Collectionviewmodel } from 'src/app/vendors/collectionviewmodel';

@Component({
  selector: 'app-filterbycontainer',
  templateUrl: './filterbycontainer.component.html',
  styleUrls: ['./filterbycontainer.component.css']
})
export class FilterbycontainerComponent {
 collectionViewModels: Collectionviewmodel[] | any;
 @Output() newCollection=new EventEmitter<any>();
  farmerId: number;
  container: string;
  constructor(private svc: CollectionService) {
    this.collectionViewModel = { collection: { farmerId: 3, containerType: '' } };
    this.farmerId = this.collectionViewModel.collection.farmerId,
      this.container = this.collectionViewModel.collection.containerType

  }
  collectionViewModel: Collectionviewmodel | any;
  form = new FormGroup({
    containerType: new FormControl('', Validators.required)
  })


  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
  }

  changeContainer(container: any) {
    console.log(container.target.value);
    // if(e.target.value ==this.container){
    this.svc.getCollectionByContainer(this.farmerId, container.target.value).subscribe((response) => {
      console.log(response)
      this.collectionViewModels =response
      this.newCollection.emit({collectionViewModels:this.collectionViewModels})
            console.log(this.farmerId)
    })
  }
}
// }