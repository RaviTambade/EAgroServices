import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-nav-left',
  templateUrl: './admin-nav-left.component.html',
  styleUrls: ['./admin-nav-left.component.scss']
})
export class AdminNavLeftComponent {
  adminId: any;

  constructor( private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.adminId = params.get('id');
    });
}
}
