import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NewProductComponent } from './new-product/new-product.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './_guard/auth.guard';
import { NavComponent } from './nav/nav.component';

const routes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'home', component: NavComponent,
    children: [
      { path: '', component: ProductListComponent},
      { path: 'new', component: NewProductComponent, canActivate: [AuthGuard]},
      { path: 'product/:id', component: ProductDetailComponent, canActivate: [AuthGuard]},
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule
  ],
  providers: [ AuthGuard ],
  declarations: []
})
export class AppRoutingModule { }
