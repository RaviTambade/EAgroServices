import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterTestComponent } from './filter-test/filter-test.component';
import { SortByComponent } from './sort-by/sort-by.component';
import { EqualFilterComponent } from './equal-filter/equal-filter.component';
import { DateFilterComponent } from './date-filter/date-filter.component';
import { RangeFilterComponent } from './range-filter/range-filter.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { InspectorModule } from '../inspector/inspector.module';



@NgModule({
    declarations: [
        FilterTestComponent,
        SortByComponent,
        EqualFilterComponent,
        DateFilterComponent,
        RangeFilterComponent,
        SearchBarComponent,
    ],
    exports: [
        FilterTestComponent
    ],
    imports: [
        FormsModule,
        HttpClientModule,
        CommonModule,
    ]
})
export class FilterModule { }
