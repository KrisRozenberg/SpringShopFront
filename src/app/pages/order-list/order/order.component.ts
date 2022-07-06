import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../../../dto/order";
import {HttpErrorResponse} from "@angular/common/http";
import {OrderService} from "../../../services/order.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input()
  order!: Order;
  @Input()
  userInfo!: any;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
  }

  public completeOrder(): void {
    let token = "Bearer_" + this.userInfo.access_token;
    this.orderService.completeOrder(token, this.order.orderId).subscribe(
      () => {
        this.order.status = "DONE";
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public rejectOrder(): void {
    let token = "Bearer_" + this.userInfo.access_token;
    this.orderService.rejectOrder(token, this.order.orderId).subscribe(
      () => {
        this.order.status = "REJECTED";
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
