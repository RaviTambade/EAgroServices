import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-nav-left',
  templateUrl: './employee-nav-left.component.html',
  styleUrls: ['./employee-nav-left.component.scss']
})
export class EmployeeNavLeftComponent implements OnInit{
  employeeId:string;
  constructor(private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
        this.employeeId = params.get('id');
    })
  }
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
 

}

