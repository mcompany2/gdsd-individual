import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GravatarModule } from 'ngx-gravatar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { CategoriesComponent } from './categories/categories.component';

import { MatToolbarModule, MatInputModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule,
   MatNativeDateModule, MatBadgeModule, MatMenuModule, MatSelectModule, MatCheckboxModule, MatSnackBarModule } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdvSearchComponent } from './adv-search/adv-search.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NewProductComponent } from './new-product/new-product.component';
import { ImageUploadModule } from 'angular2-image-upload';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './_services/authentication.service';
import { AlertService } from './_services/alert.service';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { CustomerService } from './_services/customer.service';
import { NavAdminComponent } from './nav-admin/nav-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProductComponent,
    ProductListComponent,
    CategoriesComponent,
    NewProductComponent,
    ProductDetailComponent,
    AdvSearchComponent,
    LoginComponent,
    SignupComponent,
    NavAdminComponent
  ],
  imports: [
    ImageUploadModule.forRoot(),
    BrowserModule,
    MatInputModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    GravatarModule,
    LayoutModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatBadgeModule,
    MatListModule,
    MatMenuModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  providers: [
    HttpClientModule,
    AuthenticationService,
    CustomerService,
    // AuthGuard,
    AlertService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
