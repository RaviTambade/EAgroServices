import { Component } from '@angular/core';
import { TransportService } from '../transport.service';
import { ActivatedRoute } from '@angular/router';
import { Transport } from '../transport';
import { Truck } from '../truck';
import { FreightRate } from '../freight-rate';
import { Transportdetails } from '../transportdetails';

@Component({
  selector: 'app-transportdetails',
  templateUrl: './transportdetails.component.html',
  styleUrls: ['./transportdetails.component.scss']
})
export class TransportdetailsComponent {
constructor(private svc:TransportService ,private route:ActivatedRoute){}

transportId:any;
transports:Transportdetails[]|any
sortBy: string | undefined;
sortOrder: string | undefined;
filterStartDate: any;
filterEndDate: any;
filterTruckNumber: any;
showFilters: boolean = false;
filteredCharges: Transportdetails[];

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.transportId = params.get('id');
    });
    this.svc.transportHistory(this.transportId).subscribe((responce)=>{
      this.transports=responce 
      console.log(responce);
    })

}
}