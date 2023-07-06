import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-logout',
  templateUrl: './admin-logout.component.html',
  styleUrls: ['./admin-logout.component.scss']
})
export class AdminLogoutComponent implements OnInit {
  adminId: string;
  constructor(private route:ActivatedRoute,private router:Router){}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.adminId = params.get('id');
    const result=window.confirm("Are you sure you want to log out?");
    if(result){
      this.router.navigate(["guest/login"])
      console.log ("logging out");
      localStorage.removeItem("jwtToken");
    }
    else{
      this.router.navigate(['/admin/dashboard/',this.adminId]);
      console.log("logout canceled");
    }
    })
    
  }
  
  
}

