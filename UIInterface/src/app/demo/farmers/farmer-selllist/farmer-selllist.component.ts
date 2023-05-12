import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Farmer } from '../farmer';
import { FarmerService } from '../farmer.service';
import { Farmersell } from '../farmersell';
import { Purchaseviewmodel } from '../purchaseviewmodel';

@Component({
  selector: 'app-farmer-selllist',
  templateUrl: './farmer-selllist.component.html',
  styleUrls: ['./farmer-selllist.component.scss']
})
export class FarmerSelllistComponent {
  farmer: Farmer | undefined;
  farmerId: string;
  purchaseViewModel: Purchaseviewmodel[];
  constructor(private svc: FarmerService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.farmerId = params.get('id');
    });

    this.svc.getFarmerPurchaseDetails(this.farmerId).subscribe((response) => {
      this.purchaseViewModel = response;
      console.log(this.purchaseViewModel);
    })

  }

      onClick(){
        this.svc.getFarmerPurchaseDetails(this.farmerId).subscribe((response) => {
          this.purchaseViewModel = response;
          console.log(this.purchaseViewModel);
        })

      }
    }
  

