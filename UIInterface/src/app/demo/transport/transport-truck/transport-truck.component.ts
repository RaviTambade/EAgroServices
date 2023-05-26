import { Component } from '@angular/core';
import { TransportService } from '../../../Services/transport.service';
import { ActivatedRoute } from '@angular/router';
import { Truck } from 'src/app/Models/truck';

@Component({
  selector: 'app-transport-truck',
  templateUrl: './transport-truck.component.html',
  styleUrls: ['./transport-truck.component.scss']
})
export class TransportTruckComponent {
  truck: Truck = {
    transportId: 0,
    truckId: 0,
    truckNumber: ''
  };
  trucks: any[];
  trucks1: Truck[];
  transportId: any | undefined;
  status: boolean = false;
  deleteStatus: boolean;
  updateStatus: boolean;
  insertStatus: boolean;
  searchString: any;
  constructor(private svc: TransportService, private route: ActivatedRoute,) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.transportId = params.get('id');
    });
    this.svc.getAllTrucks(this.transportId).subscribe((response) => {
      this.trucks = response.slice(0, 5)
      this.trucks1 = response
      console.log(response)
    });
  }

  onSearch() {
    if (this.searchString == undefined) {
      return;
    }
    this.searchString = this.searchString.toLowerCase();
    this.trucks = this.trucks1.filter(truck => (truck.truckNumber.toLowerCase().startsWith(this.searchString))
      || (truck.truckNumber.slice(6, 10).startsWith(this.searchString)));


  }

  addTruck() {
    console.log("func called")
    const transportId = this.transportId;
    console.log(transportId);
    console.log(this.truck)
    this.svc.addTruck(transportId, this.truck).subscribe((response) => {
      console.log(response);
      window.location.reload();
    })
  }

  onUpdateClick(transportTruck: any) {
    transportTruck.showUpdateForm = true;
    transportTruck.showDeleteForm = false;

  }
  onInsertClick() {
    this.insertStatus = true;
  }
  updateTruck(transportTruck: any) {
    this.svc.updateTruck(transportTruck).subscribe((response) => {
      console.log(response);
    })
    transportTruck.showUpdateForm = false;
  }

  onDeleteClick(transportTruck) {
    transportTruck.showDeleteForm = true;
    transportTruck.showUpdateForm = false;

  }
  onCancelClick(transportTruck) {
    transportTruck.showDeleteForm = false;
  }

  confirmDelete(transportTruck) {
    this.svc.DeleteTruck(transportTruck.truckId).subscribe((response) => {
      console.log(response);
      window.location.reload();
    })
    transportTruck.showDeleteForm = false;
  }
}


