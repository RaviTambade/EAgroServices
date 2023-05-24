import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Admin } from '../admin';
import { AdminService } from '../admin.service';

@Component({
  selector: 'admin-nav-left',
  templateUrl: './admin-nav-left.component.html',
  styleUrls: ['./admin-nav-left.component.scss']
})
export class AdminNavLeftComponent {
  adminId: any;
  admin:Admin|any;

  constructor( private route: ActivatedRoute,private svc:AdminService) { }
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
}
