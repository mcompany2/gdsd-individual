import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../_services/product.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product = new Product();
  currentUser;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private auth: AuthenticationService,
  ) { }

  ngOnInit() {
    this.currentUser = this.auth.currentUser;
    this.route.params.subscribe(params => {
      this.productService.getById(params['id']).subscribe(product => {
          this.product = product;
      });
    });
  }

}
