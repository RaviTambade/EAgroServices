import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FarmerService } from '../../../Services/farmer.service';
import { VarietyService } from 'src/app/Services/variety.service';
import { Purchaseviewmodel } from 'src/app/Models/purchaseviewmodel';
import { Farmer } from 'src/app/Models/farmer';

@Component({
  selector: 'app-farmer-selllist',
  templateUrl: './farmer-selllist.component.html',
  styleUrls: ['./farmer-selllist.component.scss']
})
export class FarmerSelllistComponent {
  farmer: Farmer | undefined;
  @Input() farmerId: number|string;
  purchaseViewModel: Purchaseviewmodel[];
  purchaseViewModel1: Purchaseviewmodel[];
  sortBy: string | undefined;
  sortOrder: string | undefined;
  filterStartDate: any;
  filterEndDate: any;
  filterVariety: any;
  filterGrade: any;
  showFilters: boolean = false;
  varieties: any;
  @Input() callFromParent:boolean=false;

  constructor(private svc: FarmerService, private route: ActivatedRoute,private varietysvc:VarietyService) { }
  ngOnInit(): void {
    if(this.farmerId==undefined){
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.farmerId = params.get('id');
    });
  }

    this.svc.getFarmerPurchaseDetails(this.farmerId).subscribe((response) => {
      this.purchaseViewModel = response.slice(0,10);
      this.purchaseViewModel1=response;
      console.log(this.purchaseViewModel);
    })
  }
  getVarities() {
    this.varietysvc.getAllVarieties().subscribe((response) => {
      this.varieties = response;
    })
  }

  cancelFilters() {
    this.showFilters = false;
    
  }

  onSortChange() {
    console.log(this.sortBy)
    console.log(this.sortOrder)
    if(this.sortOrder!=undefined)
    this.purchaseViewModel = this.sortObjectsByProperty(this.purchaseViewModel, this.sortBy, this.sortOrder);
  }


  sortObjectsByProperty(objects: Purchaseviewmodel[], property: string, sortOrder: string) {
    const sortedObjects = objects.slice();

    sortedObjects.sort((a, b) => {
      let aValue = a[property];
      let bValue = b[property];

      
      if (property.includes('.')) {
        const nestedProperties = property.split('.');

        aValue = a;
        bValue = b;
      console.log(aValue)


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
      filteredPurchases = filteredPurchases.filter(p => {
        const purchaseDate = p.purchaseItem.date.slice(0, 10);
        return purchaseDate >= this.filterStartDate
          && purchaseDate <= this.filterEndDate;
      });
    } else if (this.filterStartDate) {
      console.log("send date from here", this.filterStartDate)
      filteredPurchases = filteredPurchases.filter(p => {
        const purchaseDate = p.purchaseItem.date.slice(0, 10);
      console.log("from api date", purchaseDate);
        return purchaseDate >= this.filterStartDate;
      });
    } else if (this.filterEndDate) {
      console.log("send date from here", this.filterEndDate)

      filteredPurchases = filteredPurchases.filter(p => {
        const purchaseDate = p.purchaseItem.date.slice(0, 10);
        console.log("from api date", purchaseDate);
        return purchaseDate <= this.filterEndDate;
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
  showAllRecords()
  {
    this.purchaseViewModel=this.purchaseViewModel1
  }
}


