import { Component } from '@angular/core';
import { VendorService } from '../vendor.service';
import { Vendor } from 'src/app/vendors/vendor';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vendorslist',
  templateUrl: './vendorslist.component.html',
  styleUrls: ['./vendorslist.component.css']
})
export class VendorslistComponent {
  vendors:Vendor| any;

  constructor(private svc:VendorService,private router:Router,private route:ActivatedRoute){}
  
  ngOnInit(): void { 
this.svc.getVendors().subscribe((responce)=>{
  this.vendors=responce;
  console.log(responce);
})
}
onClickProfile(id:number){
 this.router.navigate(['./',id], { relativeTo: this.route });
}
  

}

