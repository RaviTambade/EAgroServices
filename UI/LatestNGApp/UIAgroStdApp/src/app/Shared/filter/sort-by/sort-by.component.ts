import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FilterRequest } from '../filter-request';
import { FiltersService } from '../filters.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.css']
})
export class SortByComponent implements OnInit, OnDestroy {
  @Input() filterRequest: FilterRequest | undefined;
  @Input() filterFor!: string;
  @Output() filterChange = new EventEmitter<void>();

  sortByProperties: string[] = []
  private propertiesSubscription: Subscription | undefined;

  constructor(private filterservice: FiltersService) { }
  ngOnInit(): void {
    // fetching all properties for sorting
    this.propertiesSubscription = this.filterservice.getAllProperties(this.filterFor).subscribe((response) => {
      this.sortByProperties = response;
      const displayNameKeys = this.filterservice.getDisplayNamesMap().map(property => property.key);

      this.sortByProperties = this.sortByProperties.filter(
        prop => !displayNameKeys.includes(prop) && !prop.endsWith('Id')
      );
      
    });


  }

  onChange() {
    this.filterChange.emit();
  }
  ngOnDestroy(): void {
    this.propertiesSubscription?.unsubscribe();
  }
}
