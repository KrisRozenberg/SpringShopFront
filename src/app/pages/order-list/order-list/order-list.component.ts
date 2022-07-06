import { Component, OnInit } from '@angular/core';
import {Order} from "../../../dto/order";
import {OrderService} from "../../../services/order.service";
import {UserService} from "../../../services/user.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[];
  userInfo: any;

  constructor(private orderService: OrderService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.userInfo = this.userService.getUserInfo();
    this.getOrders();
  }

  public getOrders(): void {
    let token = "Bearer_" + this.userInfo.access_token;

    if(this.userInfo.role == 'ADMIN') {
      this.orderService.getOrders(token).subscribe(
        (response: Order[]) => {
          this.orders = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }

    else {
      this.orderService.getClientOrders(token, this.userInfo.login).subscribe(
        (response: Order[]) => {
          this.orders = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }
}
