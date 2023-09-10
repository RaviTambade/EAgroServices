import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FarmerService } from 'src/app/Services/farmer.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {
  constructor(private router:Router,private farmersvc:FarmerService){}
 
  ngOnInit(): void {
  }


}
