import { Component, OnInit } from '@angular/core';
import {CartProductService} from "../../../services/cart-product.service";
import {Product} from "../../../dto/product";
import {ProductService} from "../../../services/product.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Order} from "../../../dto/order";
import {OrderService} from "../../../services/order.service";
import {UnsignedOrderInfo} from "../../../dto/unsigned-order-info";
import {catchError, Observable} from "rxjs";
import {error} from "@angular/compiler/src/util";
import {UserService} from "../../../services/user.service";
import {SignedInOrderInfo} from "../../../dto/signed-in-order-info";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: Product[];
  cartProducts:  Map<number, number>;
  orderInProcessMessage: string;
  serviceValidationErrors: String[];
  userInfo: any;

  constructor(private productService: ProductService,
              private cartProductService: CartProductService,
              private orderService: OrderService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.getProducts();
    this.cartProducts = this.cartProductService.getCartProducts();
    this.userInfo = this.userService.getUserInfo();
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

  public makeUnsignedOrder(orderInfo: UnsignedOrderInfo): void {
    orderInfo.productQuantity = this.cartProducts;

    this.orderService.makeUnsignedOrder(orderInfo).subscribe(
      () => {
        this.serviceValidationErrors = [];
        this.orderInProcessMessage = "Your order is in process!";
        this.cartProducts.clear();
      },
      (error: HttpErrorResponse) => {
        this.serviceValidationErrors = error.error.errors;
      }
    );
  }

  public makeSignedInOrder(orderInfo: SignedInOrderInfo): void {
    orderInfo.productQuantity = this.cartProducts;
    orderInfo.login = this.userInfo.login;
    let token = "Bearer_" + this.userInfo.access_token;

    this.orderService.makeSignedInOrder(orderInfo, token).subscribe(
      () => {
        this.serviceValidationErrors = [];
        this.orderInProcessMessage = "Your order is in process!";
        this.cartProducts.clear();
      },
      (error: HttpErrorResponse) => {
        this.serviceValidationErrors = error.error.errors;
      }
    );
  }

}
