import { Component, Input } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'emp-farmerdetails',
  templateUrl: './farmerdetails.component.html',
  styleUrls: ['./farmerdetails.component.scss']
})
export class FarmerdetailsComponent {

  @Input() farmer:any;
  farmerId: any;
  update:boolean = false;

constructor(private route:ActivatedRoute){
}

ngOnInit(): void {
  this.route.paramMap.subscribe((params) => {
    console.log(params)
    this.farmerId = params.get('id');
  });
}
}

