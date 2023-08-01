import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-userlogout',
  templateUrl: './userlogout.component.html',
  styleUrls: ['./userlogout.component.css']
})
export class UserlogoutComponent implements OnInit{
  constructor(private route:ActivatedRoute,private router:Router){}
  ngOnInit(): void {
    // const jwt=localStorage.getItem("jwt")
    const result=window.confirm("Are you sure you want to log out?");
    if(result){
      this.router.navigate(["auth/login"])
      console.log ("logging out");
      localStorage.removeItem("jwt");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");   
    
    }
    else{
      this.router.navigate(["home"]);
      console.log("logout canceled");
    }
    
  }
}
