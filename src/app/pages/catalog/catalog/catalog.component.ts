import { Component, OnInit } from '@angular/core';
import {Product} from "../../../dto/product";
import {ProductService} from "../../../services/product.service";
import {HttpErrorResponse} from "@angular/common/http";
import {CartProductService} from "../../../services/cart-product.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  title = 'SpringShopFront';

  products: Product[];
  cartProducts:  Map<number, number>;

  constructor(private productService: ProductService,
              private cartProductService: CartProductService) {
  }

  ngOnInit(): void {
    this.getProducts();
    this.cartProducts = this.cartProductService.getCartProducts();
  }

  public getProducts(): void {
    this.productService.getProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
        console.log("products", this.products);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public addProductToCart(key: number): void {

    this.cartProductService.addProductToCart(key);
  }

  public removeProductFromCart(key: number): void {

    this.cartProductService.removeProductFromCart(key);
  }
}
