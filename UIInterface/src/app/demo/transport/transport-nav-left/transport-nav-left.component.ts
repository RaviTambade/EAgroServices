import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transport-nav-left',
  templateUrl: './transport-nav-left.component.html',
  styleUrls: ['./transport-nav-left.component.scss']
})
export class TransportNavLeftComponent {

  transportId:any;
  constructor( private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.transportId = params.get('id');
    });
  }
}
