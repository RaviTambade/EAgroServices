import { Component } from '@angular/core';
import { CollectionService } from '../collection.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-farmerlist',
  templateUrl: './farmerlist.component.html',
  styleUrls: ['./farmerlist.component.css']
})
export class FarmerlistComponent {
farmers:any[]|any;
  constructor(private svc:CollectionService,private router:Router,private route:ActivatedRoute){}
  ngOnInit(): void {
  this.farmers=this.svc.getFarmers();
   console.log(this.farmers);
   console.log("service is called successfuly");
  }

}
