import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ProductService } from './services/product.service';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { CatalogProductComponent } from './pages/catalog/catalog-product/catalog-product.component';
import { FooterComponent } from './pages/common/footer/footer.component';
import { HeaderComponent } from './pages/common/header/header.component';
import { CartComponent } from './pages/cart/cart/cart.component';
import { CatalogComponent } from './pages/catalog/catalog/catalog.component';
import {RouterModule} from "@angular/router";
import {CartProductService} from "./services/cart-product.service";
import { CartProductComponent } from './pages/cart/cart-product/cart-product.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UnsignedOrderFormComponent } from './pages/cart/unsigned-order-form/unsigned-order-form.component';
import { LoginFormComponent } from './pages/login/login-form/login-form.component';
import { SignedInOrderFormComponent } from './pages/cart/signed-in-order-form/signed-in-order-form.component';
import { OrderComponent } from './pages/order-list/order/order.component';
import { OrderListComponent } from './pages/order-list/order-list/order-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogProductComponent,
    FooterComponent,
    HeaderComponent,
    CartComponent,
    CatalogComponent,
    CartProductComponent,
    UnsignedOrderFormComponent,
    LoginFormComponent,
    SignedInOrderFormComponent,
    OrderComponent,
    OrderListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: CatalogComponent },
      { path: 'cart', component: CartComponent },
      { path: 'login', component: LoginFormComponent },
      { path: 'orderList', component: OrderListComponent },
    ])
  ],
  providers: [ProductService, CartProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
