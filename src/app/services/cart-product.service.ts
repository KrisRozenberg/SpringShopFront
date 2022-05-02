import {EventEmitter, Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class CartProductService {
  cartProducts = new Map<number, number>();

  constructor() { }

  public getCartProducts() {
    return this.cartProducts;
  }

  public addProductToCart(key: number): void {
    let quantity = this.cartProducts.get(key) ?? 0;
    this.cartProducts.set(key, quantity + 1);
  }

  public removeProductFromCart(key: number): void {
    let quantity = this.cartProducts.get(key) ?? 0;
    if (quantity != 0) {
      (quantity > 1) ? this.cartProducts.set(key, quantity - 1) : this.cartProducts.delete(key);
    }
  }
}
