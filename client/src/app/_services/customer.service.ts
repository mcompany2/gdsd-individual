import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Customer } from '../model';
import { config } from '../config';

@Injectable()
export class CustomerService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Customer[]>(`${config.apiUrl}/customers`);
  }

  getById(id: number) {
    return this.http.get(`${config.apiUrl}/customers/` + id);
  }

  register(customer: Customer) {
    return this.http.post(`${config.apiUrl}/customers`, customer);
  }

  update(customer: Customer) {
    return this.http.put(`${config.apiUrl}/customers/` + customer.id, customer);
  }

  delete(id: number) {
    return this.http.delete(`${config.apiUrl}/customers/` + id);
  }
}
