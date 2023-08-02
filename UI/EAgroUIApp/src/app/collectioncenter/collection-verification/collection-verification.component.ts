import { Component, Input, OnInit } from '@angular/core';
import { Collection } from '../collection';

@Component({
  selector: 'app-collection-verification',
  templateUrl: './collection-verification.component.html',
  styleUrls: ['./collection-verification.component.css']
})
export class CollectionVerificationComponent  {
  @Input() collections: Collection[] = [];
}