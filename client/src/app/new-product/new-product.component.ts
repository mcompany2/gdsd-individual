import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../_services/product.service';
import { CategoryService } from '../_services/category.service';
import { ActivatedRoute } from '@angular/router';
import { config } from '../config';
import { Customer, Product } from '../model';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  $categories;
  locations: Array<String>;
  newProduct: FormGroup;
  uploadedImages = [];
  config = config;
  product: Product;
  update: boolean = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private auth: AuthenticationService,
  ) {}

  ngOnInit() {
    if(this.route.snapshot.params.product){
      this.product = JSON.parse(this.route.snapshot.params.product);
      this.locations = this.productService.locations;
    this.$categories = this.categoryService.get();
      this.newProduct = this.formBuilder.group({
        'description': [this.product.description, Validators.required],
        'name': [this.product.name, Validators.required],
        'price': [this.product.price, Validators.required],
        'location': [this.product.location, Validators.required],
        'categoryId': [this.product.category.id, Validators.required],
        'customerId': [this.auth.currentUser.id],
        'postedDate': new Date(),
        'sold': [false],
        'status': ['pending'],
        'images': [''],
      });
      this.update=true;
      }
else{
    this.locations = this.productService.locations;
    this.$categories = this.categoryService.get();
    this.newProduct = this.formBuilder.group({
      'description': ['', Validators.required],
      'name': ['', Validators.required],
      'price': ['', Validators.required],
      'location': ['', Validators.required],
      'categoryId': ['', Validators.required],
      'customerId': [this.auth.currentUser.id],
      'postedDate': new Date(),
      'sold': [false],
      'status': ['pending'],
      'images': [''],
    });
    this.update=false;
  }
  }

  createNewProduct() {
    this.newProduct.controls['images'].setValue(this.uploadedImages.map(i => i.location));
    this.productService.createProduct(this.newProduct.value);
  }

  onImageRemoved($event) {
    const imageName = $event.file.name;
    const imageSize = $event.file.size;
    this.uploadedImages = this.uploadedImages.filter(e => !(e.name === imageName && e.size === imageSize));
  }

  onImageUploaded($event) {
    const data = $event.serverResponse;
    console.log(data);
    if (data && data.status === 200) {
      this.uploadedImages.push(JSON.parse(data.response._body));
    }
  }

}
