import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../dto/product";

@Component({
  selector: 'app-catalog-product',
  templateUrl: './catalog-product.component.html',
  styleUrls: ['./catalog-product.component.css']
})
export class CatalogProductComponent implements OnInit {
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
