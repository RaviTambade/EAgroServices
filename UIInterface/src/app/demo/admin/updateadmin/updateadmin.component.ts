import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { Admin } from '../admin';

@Component({
  selector: 'app-updateadmin',
  templateUrl: './updateadmin.component.html',
  styleUrls: ['./updateadmin.component.scss']
})
export class UpdateadminComponent {
  adminId: any;
  admin: Admin|any={
    firstName:'',
    lastName:'',
    location:''

  }
  constructor(private httpClient:HttpClient,private route:ActivatedRoute,private svc:AdminService,private router:Router){}
  ngOnInit(): void {
    if(this.adminId==undefined){
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.adminId = params.get('id');
    });
  }
  this.svc.getAdmin(this.adminId).subscribe((response) => {
    this.admin = response;
    console.log(this.admin);
  });
  }
  editProfile() {
    this.svc.updateAdmin(this.adminId, this.admin).subscribe((response) => {
      console.log(response)
    alert("Update Successfully")
    this.router.navigate(["admin/profile",this.adminId]);

    })
}

}

