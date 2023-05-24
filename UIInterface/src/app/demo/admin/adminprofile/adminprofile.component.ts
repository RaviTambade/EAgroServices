import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { Admin } from '../admin';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.scss']
})
export class AdminprofileComponent implements OnInit {
  @Input() admin: Admin | any ;

  status: boolean = false;
  adminId: any;

  constructor(private svc: AdminService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.adminId = params.get('id');
    });
    this.svc.getAdmin(this.adminId).subscribe((response) => {
      this.admin = response;
      console.log(this.admin);
    })
  }
  onClick() {
    this.status = true;
    this.router.navigate(["admin/update", this.adminId]);
  }
  

}
