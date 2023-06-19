import { Component } from '@angular/core';
import { Merchant } from 'src/app/vendors/merchant';
import { MerchantService } from '../merchant.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-merchantlist',
  templateUrl: './merchantlist.component.html',
  styleUrls: ['./merchantlist.component.css']
})
export class MerchantlistComponent {

  merchants: Merchant[] | any;
  constructor(private svc: MerchantService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.svc.getMerchants().subscribe((response) => {
      this.merchants = response
      console.log(response)
    })

}
// onClick(id: number) {
//   this.router.navigate(['./', id], { relativeTo: this.route });
// }
// onClickProfile(id:number){
//   this.router.navigate(['farmers/',id,'profile'])
// }


}


