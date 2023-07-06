import { Component, Input } from '@angular/core';
import { TransportService } from '../../../Services/transport.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/Services/employee.service';
import { Transport } from 'src/app/Models/transport';

@Component({
  selector: 'app-transport-update',
  templateUrl: './transportupdate.component.html',
  styleUrls: ['./transportupdate.component.scss']
})
export class TransportupdateComponent {
  transport: Transport;
  @Input() transportId: any;
  @Input() callFromParent:boolean=false;

  constructor(private svc: TransportService, private route: ActivatedRoute, private router: Router,private empsvc:EmployeeService) { }
  ngOnInit(): void {
    if (this.transportId == undefined) {
      this.route.paramMap.subscribe((params) => {
        console.log(params)
        this.transportId = params.get('id');
      });
    }
    this.svc.getTransport(this.transportId).subscribe((response) => {
      this.transport = response;
      console.log(this.transport);
    });
  }
  editProfile() {
    this.svc.updateTransport(this.transportId, this.transport).subscribe((response) => {
      console.log(response)
      if(this.callFromParent==false){
      this.router.navigate(["transports/profile", this.transportId]);
      }
      else{
        this.empsvc.sendRole({selectedRole:"Transport"})  ;
       }
    })
  }

}
