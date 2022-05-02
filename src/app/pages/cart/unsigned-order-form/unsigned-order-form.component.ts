import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OrderInfo} from "../../../dto/orderInfo";

@Component({
  selector: 'app-unsigned-order-form',
  templateUrl: './unsigned-order-form.component.html',
  styleUrls: ['./unsigned-order-form.component.css']
})
export class UnsignedOrderFormComponent implements OnInit {
  orderInfo: OrderInfo;
  @Output()
  confirmOrderEvent = new EventEmitter<OrderInfo>();

  constructor() { }

  ngOnInit(): void {
    this.orderInfo = new OrderInfo();
  }

  public confirmOrder(): void {
    this.confirmOrderEvent.emit(this.orderInfo);
  }

}
