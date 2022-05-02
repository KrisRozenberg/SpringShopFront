import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../dto/product";

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent implements OnInit {
  @Input()
  product!: Product
  @Input()
  numberInCart!: number
  @Output()
  addEvent = new EventEmitter();
  @Output()
  removeEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  public addToCart(): void {
    this.numberInCart += 1;
    this.addEvent.emit();
  }

  public removeFromCart(): void {
    if (this.numberInCart != 0) {
      this.numberInCart -= 1;
      this.removeEvent.emit();
    }
  }

}
