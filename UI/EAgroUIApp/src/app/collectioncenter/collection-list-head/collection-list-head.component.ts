import { Component, Input } from '@angular/core';
import { CollectionDetails } from '../collection-details';
import { CommonModule } from '@angular/common';
import { CollectionListComponent } from '../collection-list/collection-list.component';
import { CollectioncenterModule } from '../collectioncenter.module';

@Component({
  selector: 'app-collection-list-head',
  templateUrl: './collection-list-head.component.html',
  standalone:true,
  imports:[CommonModule,CollectioncenterModule],
  styleUrls: ['./collection-list-head.component.css']
})
export class CollectionListHeadComponent {
  @Input()collections: CollectionDetails[] = [];

}
