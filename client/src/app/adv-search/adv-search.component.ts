import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-adv-search',
  templateUrl: './adv-search.component.html',
  styleUrls: ['./adv-search.component.css', '../app.component.css']
})
export class AdvSearchComponent implements OnInit {
  locations: Array<String>;
  advSearch: FormGroup;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router) {}

  ngOnInit() {
    this.locations = this.productService.locations;
    this.advSearch = this.formBuilder.group({
      'description': [''],
      'minPrice': [''],
      'maxPrice': [''],
      'location': [''],
      'minDate': [''],
      'maxDate': [''],
    });
  }

  search() {
    const formValue = this.advSearch.value;
    const queryParams = {};
    for (const key in formValue) {
      if (formValue.hasOwnProperty(key)) {
        let param = formValue[key];
        if (param === '' || param === undefined || param === null) {
          queryParams[key] = null;
        } else {
          if (key === 'minDate' || key === 'maxDate') {
            param = param.toISOString();
          }
          queryParams[key] = param;
        }
      }
    }
    this.router.navigate([''], { queryParamsHandling: 'merge', queryParams });
  }

}
