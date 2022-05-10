import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Order} from "../dto/order";
import {Observable} from "rxjs";
import {OrderInfo} from "../dto/order-info";

@Injectable({providedIn: 'root'})
export class OrderService {
  private apiServerUrl = environment.apiBaseUrl;
  private requestOptions = {
    headers: new HttpHeaders({
      Accept: "application/json",
      "Content-Type": "application/json"
    })
  };

  constructor(private http: HttpClient) {
  }

  public makeOrder(orderInfo: OrderInfo): Observable<void> {
    let jsonProductQuantity: any = {};
    orderInfo.productQuantity.forEach((value, key) => {
      jsonProductQuantity[key.toString()] = value
    });

    let jsonOrderInfo = JSON.stringify(orderInfo).replace("\{\}", JSON.stringify(jsonProductQuantity));

    return this.http.post<void>(`${this.apiServerUrl}/makeOrder`, jsonOrderInfo, this.requestOptions);
  }

}
