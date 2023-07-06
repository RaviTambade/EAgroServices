import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transportlogout',
  templateUrl: './transportlogout.component.html',
  styleUrls: ['./transportlogout.component.scss']
})
export class TransportlogoutComponent { transportId:string;
  constructor(private router:Router,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.transportId = params.get('id');
    const result=window.confirm("Are you sure you want to log out?");
    if(result){
      this.router.navigate(["guest/login"])
      console.log ("logging out");
      localStorage.removeItem("jwt");
    }
    else{
      this.router.navigate(["transports/dashboard",this.transportId]);
      console.log("logout canceled");
    }
    })
  }
}



