import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-farmer-nav-left',
  templateUrl: './farmer-nav-left.component.html',
  styleUrls: ['./farmer-nav-left.component.scss']
})
export class FarmerNavLeftComponent {
  farmerId:any;
  constructor( private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.farmerId = params.get('id');
    });
  }
}

