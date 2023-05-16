import { Component } from '@angular/core';
import { Transport } from '../transport';
import { TransportService } from '../transport.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transportupdate',
  templateUrl: './transportupdate.component.html',
  styleUrls: ['./transportupdate.component.scss']
})
export class TransportupdateComponent {
  transport:Transport | any = {
    officeName:'',
    firstName: '',
    lastName: '',
    location: ''
  };
  transportId: any;
  constructor(private svc: TransportService, private route: ActivatedRoute,private router:Router) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.transportId = params.get('id');
    });
    this.svc.getTransport(this.transportId).subscribe((response) => {
      this.transport = response;
      console.log(this.transport);
    });
  }
    editProfile() {
      this.svc.updateTransport(this.transportId, this.transport).subscribe((response) => {
        console.log(response)
      alert("Update Successfully")
      this.router.navigate(["transports/profile",this.transportId]);

      })
}

}
