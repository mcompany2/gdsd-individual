import { Component, OnInit } from '@angular/core';
import { CategoryService} from '../_services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories$;

  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categories$ = this.categoryService.get();
  }

  searchByCategory(categoryId) {
    this.router.navigate([''], { queryParamsHandling: 'merge', queryParams: { categoryId: categoryId }});
  }

}
