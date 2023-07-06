import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transport } from 'src/app/Models/transport';
import { TransportService } from 'src/app/Services/transport.service';

@Component({
  selector: 'app-transport-nav-left',
  templateUrl: './transport-nav-left.component.html',
  styleUrls: ['./transport-nav-left.component.scss']
})
export class TransportNavLeftComponent {

  transportId:string|number;
  transport:Transport
  constructor( private route: ActivatedRoute, private transportsvc:TransportService) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.transportId = params.get('id');
    });

    this.transportsvc.getTransport(this.transportId).subscribe((response)=>{
      this.transport=response;
      console.log(this.transport);
    })
  }
}
