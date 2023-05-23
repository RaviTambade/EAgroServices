import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss']
})
export class AdmindashboardComponent {
  adminId: any;
  constructor(private svc: AdminService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.adminId = params.get('id');
    });

}
}
