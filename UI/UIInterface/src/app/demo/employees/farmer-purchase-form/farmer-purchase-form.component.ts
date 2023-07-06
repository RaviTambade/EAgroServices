import { Component, OnInit } from '@angular/core';

interface WeightRow {
  weight: number;
}

@Component({
  selector: 'app-farmer-purchase-form',
  templateUrl: './farmer-purchase-form.component.html',
  styleUrls: ['./farmer-purchase-form.component.scss']
})
export class FarmerPurchaseFormComponent implements OnInit {
  weightRows: WeightRow[] = [];
  weights: WeightRow[] = [];
  totalWeight: number = 0;
  totalBags: number = 0;

  ngOnInit() {
    this.initializeRows(10);
    this.updateSlip();
  }

  initializeRows(count: number) {
    for (let i = 0; i < count; i++) {
      this.addRow();
    }
  }

  addRow() {
    this.weightRows.push({ weight: null });
  }

  updateSlip() {
    this.weights = this.weightRows.filter(row => row.weight !== null);
    this.totalWeight = this.weights.reduce((acc, row) => acc + row.weight, 0);
    this.totalBags = this.weights.length;

    if (this.weights.length >= 10&& this.weightRows.length === this.weights.length) {
      this.initializeRows(10);
    }
  }
}
