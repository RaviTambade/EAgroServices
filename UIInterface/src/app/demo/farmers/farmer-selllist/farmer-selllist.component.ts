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

      onSortByVarietyNameChange(event:Event) {
        const target = event.target as HTMLInputElement;
        const order = target.value;
        this.purchaseViewModel = this.sortPurchasesByVarietyName(this.purchaseViewModel, order);
      }
      
      onSortByAmountChange(event:Event) {
        const target = event.target as HTMLInputElement;
        const order = target.value;
        this.purchaseViewModel = this.sortPurchasesByAmount(this.purchaseViewModel, order);
      }
      
      sortPurchasesByVarietyName(purchases: Purchaseviewmodel[], sortOrder: string): Purchaseviewmodel[] {
        let sortedPurchases = purchases.slice();
        if (sortOrder === 'asc') {
          sortedPurchases.sort((a, b) => a.varietyName.localeCompare(b.varietyName));
        } else {
          sortedPurchases.sort((a, b) => b.varietyName.localeCompare(a.varietyName));
        }
        return sortedPurchases;
      }
      
      sortPurchasesByAmount(purchases: Purchaseviewmodel[], sortOrder: string): Purchaseviewmodel[] {
        let sortedPurchases = purchases.slice();
        if (sortOrder === 'asc') {
          sortedPurchases.sort((a, b) => a.purchaseItem.amount - b.purchaseItem.amount);
        } else {
          sortedPurchases.sort((a, b) => b.purchaseItem.amount - a.purchaseItem.amount);
        }
        return sortedPurchases;
      }
      
      
      

    }
  

