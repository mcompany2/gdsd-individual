import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators/takeUntil';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  _destroy$ = new Subject();
  products: Product[];
  advanceSearch: Boolean;

  searchTerm;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.products$.pipe(takeUntil(this._destroy$)).subscribe(data => {
      this.products = data;
    });
    this.productService.advanceSearch$.pipe(takeUntil(this._destroy$)).subscribe(data => {
      this.advanceSearch = data;
    });
  }

  ngOnDestroy() {
    this._destroy$.next();
  }

}
