import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get(config.apiUrl + '/categories');
  }
}
