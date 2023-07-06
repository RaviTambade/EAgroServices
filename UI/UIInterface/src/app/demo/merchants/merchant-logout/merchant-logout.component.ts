import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-merchant-logout',
  templateUrl: './merchant-logout.component.html',
  styleUrls: ['./merchant-logout.component.scss']
})
export class MerchantLogoutComponent implements OnInit{
  merchantId:string;
  constructor(private router:Router,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.merchantId = params.get('id');
    const result=window.confirm("Are you sure you want to log out?");
    if(result){
      this.router.navigate(["guest/login"])
      console.log ("logging out");
    }
    else{
      this.router.navigate(["merchants/dashboard",this.merchantId]);
      console.log("logout canceled");
    }
    })
  }
}
