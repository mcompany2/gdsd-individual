import { Component, Input } from '@angular/core';
import { Product } from '../model';
import { ProductService } from '../_services/product.service';
import { AdminService } from '../_services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { NavAdminComponent } from '../nav-admin/nav-admin.component';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [NavAdminComponent]
})
export class ProductComponent {
  @Input() product: Product;
  @Input() isAdmin: Boolean;
  show: Boolean = true;
  currentUser;

  constructor(
    private productService: ProductService,
    private adminService: AdminService, 
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private nAdmin : NavAdminComponent, 
    private router: Router,
    private auth: AuthenticationService,
  ) {
    this.currentUser = this.auth.currentUser;
  }

  detailProduct(product: Product) {
    this.router.navigate(['product/' + product.id], { relativeTo: this.route });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    }); 
  }

  approved(product){      
    product.status='approved';
    this.adminService.approved(product).subscribe(result => this.show=false, error=> this.show=true);
    this.openSnackBar("Notify","Product Approved");
    this.nAdmin.searchByStatus('pending');
    //location.reload();
  }

  disapproved(product){
    product.status='disapproved';
    this.adminService.approved(product).subscribe(result => this.show=false, error=> this.show=true);
    this.openSnackBar("Notify","Product Dispproved");
    this.nAdmin.searchByStatus('pending');
  }

  editProduct(product: Product){
    this.router.navigate(['home/new',{product:JSON.stringify(product)}]);
  }

  deleteProduct(product){
     this.productService.delete(product.id).subscribe(data => {
         this.openSnackBar("Notify","Product has been deleted");
         this.productService.getByCustomerId(this.currentUser.id);
     });
  }

  buy() {
    // this.productService.solveProduct(this.product).subscribe(data => {
    //   this.product.solved = true;
    // });
  }

  hasWished() {
    return this.product.customerToWish.filter(customer => customer.username === this.currentUser.username).length > 0;
  }

  wish() {
    this.productService.wish(this.product, this.currentUser).subscribe(product => {
      this.product.customerToWish.push(this.currentUser);
    });
  }

  unwish() {
    this.productService.unwish(this.product, this.currentUser).subscribe(data => {
      this.product.customerToWish = data.product.customerToWish;
    });
  }
}
