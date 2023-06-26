import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CollectionService } from 'src/app/spa/collection.service';
import { Collectionviewmodel } from 'src/app/vendors/collectionviewmodel';
import { __values } from 'tslib';

@Component({
  selector: 'app-filterbycontainer',
  templateUrl: './filterbycontainer.component.html',
  styleUrls: ['./filterbycontainer.component.css']
})
export class FilterbycontainerComponent implements OnInit {
 collectionViewModels: Collectionviewmodel[] | any;
 @Output() newCollection=new EventEmitter<any>();
farmerId:number |any;  
collectionViewModel: Collectionviewmodel | any;
  constructor(private svc: CollectionService,private route:ActivatedRoute) {}
  ngOnInit(): void {
    this.farmerId=this.route.snapshot.paramMap.get("id")
  }

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
    this.svc.getCollectionByContainer(this.farmerId, container.target.value).subscribe((response) => {
      console.log(response)
      this.collectionViewModels =response
      this.newCollection.emit({collectionViewModels:this.collectionViewModels})
            console.log(this.farmerId)
    })
  }
 
  
}
// }