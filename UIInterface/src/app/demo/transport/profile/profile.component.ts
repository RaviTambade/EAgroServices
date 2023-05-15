import { Component, OnInit } from '@angular/core';
import { Transport } from '../transport';
import { TransportService } from '../transport.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
 
  transport:Transport|any={
    officeName:'',
    firstName:'',
    lastName:'',
    location:''
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
    this.router.navigate(["transport/update",this.transportId]);
  }

}
