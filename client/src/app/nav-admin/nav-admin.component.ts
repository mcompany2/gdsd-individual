import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.css'],
})
export class NavAdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  searchByStatus(status) {
    this.router.navigate([''], { queryParamsHandling: 'merge', queryParams: { status: status }});
  }
}
