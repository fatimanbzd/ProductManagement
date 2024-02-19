import {Component, OnDestroy, ViewChild} from '@angular/core';
import {AgGridAngular, AgGridModule} from "ag-grid-angular";
import {ColDef, GridApi, GridReadyEvent} from "ag-grid-community";
import {ProductService} from "../product.service";
import {Subject, takeUntil} from "rxjs";
import {IProductResponse} from "../interfaces/product.model";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnDestroy {

  constructor(private productService: ProductService) {
  }

  themeClass =
    "ag-theme-quartz";
  rowData!: IProductResponse[];
  colDefs: ColDef[] = [
    {
      field: 'code',
      width: 150,
    },
    {
      field: 'name',
      width: 150,
    },
    {
      field: 'weight',
      width: 150,
    },
    {
      field: 'description',
      width: 150,
    },
  ];

  private _destroy = new Subject<void>();
  onGridReady = (event: GridReadyEvent) => {

    this.productService.products()
      .pipe(takeUntil(this._destroy))
      .subscribe(product => (this.rowData = product));
  }


  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
