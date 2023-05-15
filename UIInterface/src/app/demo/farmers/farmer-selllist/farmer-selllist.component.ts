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
  purchaseViewModel1: Purchaseviewmodel[];
  sortBy: string | undefined;
  sortOrder: string | undefined;
  filterStartDate: any;
  filterEndDate: any;
  filterVariety: any;
  filterGrade: any;
  showFilters: boolean = false;
  filteredPurchases: Purchaseviewmodel[];
  varieties: any;
  constructor(private svc: FarmerService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.farmerId = params.get('id');
    });

    this.svc.getFarmerPurchaseDetails(this.farmerId).subscribe((response) => {
      this.purchaseViewModel = response;
      this.purchaseViewModel1=response;
      console.log(this.purchaseViewModel);
    })
  }
  getVarities() {
    this.svc.getAllVarieties().subscribe((response) => {
      this.varieties = response;
      // console.log(this.varieties);
    })
  }

  reloadwindow() {
    window.location.reload();
  }

  onSortChange() {
    console.log(this.sortBy)
    console.log(this.sortOrder)
    this.purchaseViewModel = this.sortObjectsByProperty(this.purchaseViewModel, this.sortBy, this.sortOrder);
  }


  sortObjectsByProperty(objects: any[], property: string, sortOrder: string) {
    const sortedObjects = objects.slice();

    sortedObjects.sort((a, b) => {
      let aValue = a[property];
      let bValue = b[property];


      if (property.includes('.')) {
        const nestedProperties = property.split('.');

        aValue = a;
        bValue = b;

        for (const nestedProperty of nestedProperties) {
          aValue = aValue[nestedProperty];
          bValue = bValue[nestedProperty];
        }
      }

      if (sortOrder == 'asc') {
        return aValue > bValue ? 1 : -1;
      } else if (sortOrder == 'desc') {
        return aValue < bValue ? 1 : -1;
      }
      else {
        return 0;
      }
    });

    return sortedObjects;
  }

  onFilterSubmit() {
    let filteredPurchases = this.purchaseViewModel1;

    if (this.filterStartDate && this.filterEndDate) {
      console.log(this.filterStartDate)
      console.log(this.filterEndDate)
      filteredPurchases = filteredPurchases.filter(p => {
        const purchaseDate = new Date(p.purchaseItem.date.slice(0, 10)).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' }).split('/').join('-');
        const [day, month, year] = purchaseDate.split("-")
        const pdate = `${year}-${month}-${day}`;
        return pdate >= this.filterStartDate
          && pdate <= this.filterEndDate;
      });
    } else if (this.filterStartDate) {
      console.log(this.filterStartDate)
      filteredPurchases = filteredPurchases.filter(p => {
        const purchaseDate = new Date(p.purchaseItem.date.slice(0, 10)).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' }).split('/').join('-');
        const [day, month, year] = purchaseDate.split("-")
        const pdate = `${year}-${month}-${day}`;
        console.log(pdate)
        return pdate >= this.filterStartDate;
      });
    } else if (this.filterEndDate) {
      filteredPurchases = filteredPurchases.filter(p => {
        const purchaseDate = new Date(p.purchaseItem.date.slice(0, 10)).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' }).split('/').join('-');
        const [day, month, year] = purchaseDate.split("-")
        const pdate = `${year}-${month}-${day}`;
        return pdate <= this.filterEndDate;
      });
    }

    if (this.filterVariety) {
      console.log(this.filterVariety)
      filteredPurchases = filteredPurchases.filter(p => p.varietyName.toLowerCase().includes(this.filterVariety.toLowerCase()));
    }

    if (this.filterGrade) {
      filteredPurchases = filteredPurchases.filter(p => p.purchaseItem.grade.toLowerCase().includes(this.filterGrade.toLowerCase()));
    }
    this.purchaseViewModel = filteredPurchases;
    this.showFilters = false;
  }
}


