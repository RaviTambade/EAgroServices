import { Component, Input } from '@angular/core';
import { CollectionDetails } from '../collection-details';
import { CommonModule } from '@angular/common';
import { CollectionListComponent } from '../collection-list/collection-list.component';
import { CollectioncenterModule } from '../collectioncenter.module';
import { CollectionService } from 'src/app/collection-service.service';
import { UserService } from 'src/app/Shared/users/user.service';
import { HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { FiltersService } from 'src/app/Shared/filter/filters.service';

@Component({
  selector: 'app-collection-list-head',
  templateUrl: './collection-list-head.component.html',
  styleUrls: ['./collection-list-head.component.css']
})
export class CollectionListHeadComponent {
   @Input() collections: CollectionDetails[] = [];

 

}
