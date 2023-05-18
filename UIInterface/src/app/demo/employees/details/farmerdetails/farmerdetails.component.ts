import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FarmerService } from 'src/app/demo/farmers/farmer.service';

@Component({
  selector: 'emp-farmerdetails',
  templateUrl: './farmerdetails.component.html',
  styleUrls: ['./farmerdetails.component.scss']
})
export class FarmerdetailsComponent {

  @Input() farmer:any;
  farmerId: any;
  update:boolean = false;

constructor(private svc:FarmerService,private route:ActivatedRoute){
}

ngOnInit(): void {
  this.route.paramMap.subscribe((params) => {
    console.log(params)
    this.farmerId = params.get('id');
  });
}

  editProfile() {
    this.svc.updateFarmerDetails(this.farmerId, this.farmer).subscribe((response) => {
      console.log(response)
    alert("Update Successfully")
    window.location.reload();

});
}
}

