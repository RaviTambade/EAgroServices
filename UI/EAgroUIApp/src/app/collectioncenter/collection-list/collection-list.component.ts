import { Component, Input, OnInit } from '@angular/core';
import { CollectioncenterService } from 'src/app/collectioncenter.service';
import { CollectionDetails } from '../collection-details';
import { UserService } from 'src/app/Shared/users/user.service';
import { CollectionService } from 'src/app/collection-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'collection-center-collection-list',
  templateUrl: './collection-list.component.html',
  standalone:true,
  imports:[CommonModule],
  styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent implements OnInit {
  @Input()collections: CollectionDetails[] = [];
  addToShipmentStatus:boolean=false;

  constructor(private collectionsvc: CollectionService, private usrsvc: UserService) { }


  ngOnInit(): void {
    
  }
  // ngOnInit(): void {
  //   this.collectionsvc.getCollections().subscribe((res) => {
  //     this.collections = res;
  //     if (this.collections.length == 0) {
  //       return;
  //     }

  //     let distinctfarmerIds = this.collections.map(item => item.farmerId)
  //       .filter((number, index, array) => array.indexOf(number) === index);

  //     let farmerIdString = distinctfarmerIds.join(',');

  //     let distinctinspectorIds = this.collections.map(item => item.inspectorId)
  //       .filter((number, index, array) => array.indexOf(number) === index);

  //     let inspectorIdString = distinctinspectorIds.join(',');


  //     this.usrsvc.getUserNamesWithId(farmerIdString).subscribe((names) => {
  //       let farmerNames = names
  //       this.collections.forEach(item => {
  //         let matchingItem = farmerNames.find(element => element.id === item.farmerId);
  //         if (matchingItem != undefined)
  //           item.farmerName = matchingItem.name;
  //       });
  //     });

  //     this.usrsvc.getUserNamesWithId(inspectorIdString).subscribe((names) => {
  //       let inspectorNames = names
  //       this.collections.forEach(item => {
  //         let matchingItem = inspectorNames.find(element => element.id === item.inspectorId);
  //         if (matchingItem != undefined)
  //           item.inspectorName = matchingItem.name;
  //       });
  //     });
  //   });
  // }

}
