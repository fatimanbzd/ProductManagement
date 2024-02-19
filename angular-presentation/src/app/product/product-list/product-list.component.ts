import {Component, OnDestroy} from '@angular/core';
import {AgGridModule} from "ag-grid-angular";
import {ColDef, GridReadyEvent} from "ag-grid-community";
import {ProductService} from "../product.service";
import {Subject, takeUntil} from "rxjs";
import {IProductResponse} from "../interfaces/product.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnDestroy {

  constructor(private productService: ProductService,
              private router: Router) {
  }

  themeClass =
    "ag-theme-quartz";
  rowData!: IProductResponse[];
  colDefs: ColDef[] = [
    {
      field: 'code'
    },
    {
      field: 'name'
    },
    {
      field: 'weight'
    },
    {
      field: 'description'
    },
  ];

  private _destroy = new Subject<void>();
  onGridReady = (event: GridReadyEvent) => {

    this.productService.products()
      .pipe(takeUntil(this._destroy))
      .subscribe(product => (this.rowData = product));
  }

  addProduct(){
    this.router.navigateByUrl('/product-add')
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
