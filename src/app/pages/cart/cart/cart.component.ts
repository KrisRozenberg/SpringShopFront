import { Component, OnInit } from '@angular/core';
import {CartProductService} from "../../../services/cart-product.service";
import {Product} from "../../../dto/product";
import {ProductService} from "../../../services/product.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Order} from "../../../dto/order";
import {OrderService} from "../../../services/order.service";
import {OrderInfo} from "../../../dto/orderInfo";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: Product[];
  cartProducts:  Map<number, number>;

  constructor(private productService: ProductService,
              private cartProductService: CartProductService,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.getProducts();
    this.cartProducts = this.cartProductService.getCartProducts();
  }

  public getProducts(): void {
    this.productService.getProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
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

  public makeOrder(orderInfo: OrderInfo): void {
    orderInfo.productQuantity = this.cartProducts;

    this.orderService.makeOrder(orderInfo).subscribe(
      (response: Order) => {
        console.log("Created order", response);
        this.cartProducts.clear();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
