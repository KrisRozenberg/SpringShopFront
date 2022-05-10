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

@NgModule({
  declarations: [
    AppComponent,
    CatalogProductComponent,
    FooterComponent,
    HeaderComponent,
    CartComponent,
    CatalogComponent,
    CartProductComponent,
    UnsignedOrderFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: CatalogComponent },
      { path: 'cart', component: CartComponent },
    ])
  ],
  providers: [ProductService, CartProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
