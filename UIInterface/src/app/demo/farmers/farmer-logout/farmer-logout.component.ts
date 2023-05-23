import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-farmer-logout',
  templateUrl: './farmer-logout.component.html',
  styleUrls: ['./farmer-logout.component.scss']
})
export class FarmerLogoutComponent {
  farmerId:string;
  constructor(private router:Router,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.farmerId = params.get('id');
    const result=window.confirm("Are you sure you want to log out?");
    if(result){
      this.router.navigate(["guest/login"])
      console.log ("logging out");
      localStorage.removeItem("jwtToken");
    }
    else{
      this.router.navigate(["farmers",this.farmerId,"dashboard"]);
      console.log("logout canceled");
    }
    })
  }
}
