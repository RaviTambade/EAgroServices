import { Component, Input, OnInit } from '@angular/core';
import { FarmerService } from '../../../Services/farmer.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { window } from 'rxjs';
import { Farmer } from 'src/app/Models/farmer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
 @Input() farmer: Farmer | any ;
  status: boolean = false;
  farmerId: string;

  constructor(private svc: FarmerService, private route: ActivatedRoute,private router:Router) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.farmerId = params.get('id');
    });
    this.svc.getFarmer(this.farmerId).subscribe((response) => {
      this.farmer = response;
      console.log(this.farmer);
    })
  }
  onClick() {
    this.status = true;
    this.router.navigate(["farmers/update",this.farmerId]);
  }
  }


