import { Component, OnInit } from '@angular/core';
import { CollectionService } from 'src/app/collection-service.service';
import { UnverifiedCollection } from '../unverified-collection';
import { UserService } from 'src/app/Shared/users/user.service';

@Component({
  selector: 'app-collection-verification',
  templateUrl: './collection-verification.component.html',
  styleUrls: ['./collection-verification.component.css']
})
export class CollectionVerificationComponent implements OnInit {
  updateStatus: boolean = false;
  collections: UnverifiedCollection[] = [];

  constructor(private collectionsvc: CollectionService, private usrsvc: UserService) { }

  ngOnInit(): void {
    this.collectionsvc.getCollectionsForVerification().subscribe((res) => {
      this.collections = res;
      if (this.collections.length == 0) {
        return;
      }

      let distinctfarmerIds = this.collections.map(item => item.farmerId)
        .filter((number, index, array) => array.indexOf(number) === index);

      let farmerIdString = distinctfarmerIds.join(',');
      this.usrsvc.getUserNamesWithId(farmerIdString).subscribe((names) => {
        let farmerNames = names
        this.collections.forEach(item => {
          let matchingItem = farmerNames.find(element => element.id === item.farmerId);
          if (matchingItem != undefined)
            item.farmerName = matchingItem.name;
        });
      });

    })
  }

}
