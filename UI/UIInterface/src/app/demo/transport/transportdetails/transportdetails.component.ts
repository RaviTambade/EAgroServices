import { Component, Input, OnInit } from '@angular/core';
import { TransportService } from '../../../Services/transport.service';
import { ActivatedRoute } from '@angular/router';
import { TransportFaredetails } from 'src/app/Models/transportFaredetails';
import { Truck } from 'src/app/Models/truck';

@Component({
  selector: 'app-transport-details',
  templateUrl: './transportdetails.component.html',
  styleUrls: ['./transportdetails.component.scss']
})
export class TransportdetailsComponent implements OnInit {

  @Input() transportId: number | string;
  transportfaredetails: TransportFaredetails[];
  transportfaredetails1: TransportFaredetails[];
  sortBy: string | undefined;
  sortOrder: string | undefined;
  filterStartDate: any;
  filterEndDate: any;
  filterTruckNumber: any;
  showFilters: boolean = false;
  transportTrucks: Truck[];

  @Input() callFromParent: boolean = false;

  constructor(private transportsvc: TransportService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.transportId == undefined) {
      this.route.paramMap.subscribe((params) => {
        console.log(params)
        this.transportId = params.get('id');
      });
    }

    this.transportsvc.transportHistory(this.transportId).subscribe((response) => {
      this.transportfaredetails = response.slice(0, 10);
      this.transportfaredetails1 = response;
      console.log(this.transportfaredetails);
    });
  };
  getAllTrucks() {
    this.transportsvc.getAllTrucks(this.transportId).subscribe((response) => {
      this.transportTrucks = response;
      console.log(response)
    });
  }
  cancelFilters() {
    this.showFilters = false;
  }

  onSortChange() {
    console.log(this.sortBy)
    console.log(this.sortOrder)
    if (this.sortOrder != undefined)
      this.transportfaredetails = this.sortObjectsByProperty(this.transportfaredetails1, this.sortBy, this.sortOrder);
  }


  sortObjectsByProperty(objects: TransportFaredetails[], property: string, sortOrder: string) {
    const sortedObjects = objects.slice();

    sortedObjects.sort((a, b) => {
      let aValue = a[property];
      let bValue = b[property];

      if (sortOrder == 'asc') {
        return aValue > bValue ? 1 : -1;
      } else if (sortOrder == 'desc') {
        return aValue < bValue ? 1 : -1;
      }
      else {
        return 0;
      }
    });

    return sortedObjects;
  }

  onFilterSubmit() {
    let filteredTransportFareDetails = this.transportfaredetails1;

    if (this.filterStartDate && this.filterEndDate) {
      filteredTransportFareDetails = filteredTransportFareDetails.filter(p => {
        const date = p.date.slice(0, 10);
        return date >= this.filterStartDate
          && date <= this.filterEndDate;
      });
    } else if (this.filterStartDate) {

      filteredTransportFareDetails = filteredTransportFareDetails.filter(p => {
        const date = p.date.slice(0, 10);
        return date >= this.filterStartDate;
      });
    } else if (this.filterEndDate) {

      filteredTransportFareDetails = filteredTransportFareDetails.filter(p => {
        const date = p.date.slice(0, 10);
        console.log("from api date", date);
        return date <= this.filterEndDate;
      });
    }

    if (this.filterTruckNumber) {
      console.log(this.filterTruckNumber)
      filteredTransportFareDetails = filteredTransportFareDetails.filter(p => p.truckNumber.toLowerCase().includes(this.filterTruckNumber.toLowerCase()));
    }
    this.transportfaredetails = filteredTransportFareDetails;
    this.showFilters = false;
  }
  showAllRecords() {
    this.transportfaredetails = this.transportfaredetails1
  }
}