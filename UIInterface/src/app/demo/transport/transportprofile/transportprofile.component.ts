import { Component } from '@angular/core';
import { Transport } from '../transport';
import { ActivatedRoute, Router } from '@angular/router';
import { TransportService } from '../../../Services/transport.service';

@Component({
  selector: 'app-transportprofile',
  templateUrl: './transportprofile.component.html',
  styleUrls: ['./transportprofile.component.scss']
})
export class TransportprofileComponent {
  transport: Transport | any = {
    officeName:'',
    firstName: '',
    lastName: '',
    location: ''
  };
  status: boolean = false;
  transportId: string;

  constructor(private svc: TransportService, private route: ActivatedRoute,private router:Router) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.transportId = params.get('id');
    });
    this.svc.getTransport(this.transportId).subscribe((response) => {
      this.transport = response;
      console.log(this.transport);
    })
  }
  onClick() {
    this.status = true;
    this.router.navigate(["transports/update",this.transportId]);
  }
  }





