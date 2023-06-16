import { Component } from '@angular/core';
import { CollectionService } from '../collection.service';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { Farmer } from 'src/app/vendors/farmer';

@Component({
  selector: 'app-farmerlist',
  templateUrl: './farmerlist.component.html',
  styleUrls: ['./farmerlist.component.css']
})
export class FarmerlistComponent {
  farmers: Farmer[] | any;
  constructor(private svc: CollectionService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.svc.getfarmers().subscribe((response) => {
      this.farmers = response
      console.log(response)
    })
  }
  onClick(id: number) {
    this.router.navigate(['./', id], { relativeTo: this.route });
  }
 
}
