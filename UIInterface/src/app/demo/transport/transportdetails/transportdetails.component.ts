import { Component } from '@angular/core';
import { TransportService } from '../../../Services/transport.service';
import { ActivatedRoute } from '@angular/router';
import { TransportFaredetails} from '../transportFaredetails';

@Component({
  selector: 'app-transportdetails',
  templateUrl: './transportdetails.component.html',
  styleUrls: ['./transportdetails.component.scss']
})
export class TransportdetailsComponent {
constructor(private svc:TransportService ,private route:ActivatedRoute){}

transportId:any;
transports:TransportFaredetails[];
filteredCharges: TransportFaredetails[];

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