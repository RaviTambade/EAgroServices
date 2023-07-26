import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FilterRequest } from '../filter-request';
import { FiltersService } from '../filters.service';
import { UserService } from '../../users/user.service';
import { UserRoleService } from 'src/app/user-role.service';
import { NameId } from 'src/app/name-id';

@Component({
  selector: 'app-range-filter',
  templateUrl: './range-filter.component.html',
  styleUrls: ['./range-filter.component.css']
})
export class RangeFilterComponent implements OnInit {

  @Input() filterRequest!: FilterRequest;
  @Output() filterChange = new EventEmitter<void>();
  expandedPropertyIndex: number = 0;
  rangeProperties: string[] = [];
  isButtonClicked: boolean = false;
  initializationDone: boolean = false;
  farmers: NameId[] = [];
  inspectors: NameId[] = [];

  constructor(private filterservice: FiltersService, private usrsvc: UserService, private userrolesvc: UserRoleService) { }

  ngOnInit(): void {

    this.filterservice.getRangeProperties().subscribe((response) => {
      this.rangeProperties = response;
      if (!this.initializationDone) {
        if (!this.doesPreviousRequestContainsRangeProperties()) {
          this.initializeRangeFilters();
        }
        this.initializationDone = true;
      }
    });

    this.userrolesvc.getusersId("farmer").subscribe((res) => {
      this.usrsvc.getUserNamesWithId(res).subscribe((farmers) => {
        this.farmers = farmers;
      });
    });

    this.userrolesvc.getusersId("inspector").subscribe((res) => {
      this.usrsvc.getUserNamesWithId(res).subscribe((inspectors) => {
        this.inspectors = inspectors;
      });
    });
  }

  initializeRangeFilters() {
    this.filterRequest.rangeFilters = this.rangeProperties.map(property => {
      return { propertyName: property, minValue: undefined, maxValue: undefined };
    });
  }

  setMaxValue(index: number) {
    const minVal = this.filterRequest.rangeFilters[index].minValue;
    this.filterRequest.rangeFilters[index].maxValue = minVal;
    console.log("🚀 ~ setMaxValue ~       this.filterRequest.rangeFilters[index]:", this.filterRequest.rangeFilters[index]);

  }
  onSubmit() {
    this.filterChange.emit();
    this.isButtonClicked = true;
    setTimeout(() => {
      this.isButtonClicked = false;
    }, 500);
  }


  toggleProperty(index: number): void {
    this.expandedPropertyIndex = index;
  }

  isPropertyExpanded(index: number): boolean {
    return this.expandedPropertyIndex === index;
  }

  doesPreviousRequestContainsRangeProperties(): boolean {
    const prevFilterRequest = sessionStorage.getItem("prevFilterRequest");
    if (prevFilterRequest != null) {
      const filterRequest: FilterRequest = JSON.parse(prevFilterRequest);
      return filterRequest.rangeFilters.length > 0
    }
    return false;
  }

}
