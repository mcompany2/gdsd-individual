import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Product, Customer } from '../model';
import { config } from '../config';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  products: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  constructor(private http: HttpClient) { }

  getPending() {
    let queryString = '';
      queryString = '?filter[where][status][like]=pending';
    this.http.get<Product[]>(config.apiUrl + '/products' + queryString)
      .subscribe(data => {
        this.products.next(data);
      });
  }

  getApproved() {
    let queryString = '';
      queryString = '?filter[where][status]=approved';
    this.http.get<Product[]>(config.apiUrl + '/products' + queryString)
      .subscribe(data => {
        this.products.next(data);
      });
  }
  
  getDisapproved() {
    let queryString = '';
      queryString = '?filter[where][status]=disapproved';
    this.http.get<Product[]>(config.apiUrl + '/products' + queryString)
      .subscribe(data => {
        this.products.next(data);
      });
  }

  approved(product){
    console.log("in approve service");
    console.log(product);
    return this.http.put(config.apiUrl + '/products' , product );
  }
  
}
