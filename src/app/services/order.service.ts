import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {UnsignedOrderInfo} from "../dto/unsigned-order-info";
import {SignedInOrderInfo} from "../dto/signed-in-order-info";
import {Order} from "../dto/order";

@Injectable({providedIn: 'root'})
export class OrderService{
  private apiServerUrl = environment.apiBaseUrl;
  private requestOptions = {
    headers: new HttpHeaders({
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": ""
    }),
    params: new HttpParams()
  };

  constructor(private http: HttpClient) {
  }

  public getOrders(token: string): Observable<Order[]> {
    this.requestOptions.headers = this.requestOptions.headers.set("Authorization", token);

    return this.http.get<Order[]>(`${this.apiServerUrl}/admin/getOrderList`, this.requestOptions);
  }

  public getClientOrders(token: string, login: string): Observable<Order[]> {
    this.requestOptions.headers = this.requestOptions.headers.set("Authorization", token);
    this.requestOptions.params = this.requestOptions.params.set("login", login);

    return this.http.get<Order[]>(`${this.apiServerUrl}/client/getOrderList`, this.requestOptions);
  }

  public completeOrder(token: string, id: number) {
    this.requestOptions.params = this.requestOptions.params.set("id", id)
    return this.http.get(`${this.apiServerUrl}/admin/completeOrder`, this.requestOptions);
  }

  public rejectOrder(token: string, id: number) {
    this.requestOptions.params = this.requestOptions.params.set("id", id)
    return this.http.get(`${this.apiServerUrl}/client/rejectOrder`, this.requestOptions);
  }

  public makeUnsignedOrder(orderInfo: UnsignedOrderInfo): Observable<void> {
    let jsonProductQuantity: any = {};
    orderInfo.productQuantity.forEach((value, key) => {
      jsonProductQuantity[key.toString()] = value
    });

    let jsonOrderInfo = JSON.stringify(orderInfo).replace("\{\}", JSON.stringify(jsonProductQuantity));

    return this.http.post<void>(`${this.apiServerUrl}/makeUnsignedOrder`, jsonOrderInfo, this.requestOptions);
  }

  public makeSignedInOrder(orderInfo: SignedInOrderInfo, token: string): Observable<void>{
    this.requestOptions.headers = this.requestOptions.headers.set("Authorization", token);

    let jsonProductQuantity: any = {};
    orderInfo.productQuantity.forEach((value, key) => {
      jsonProductQuantity[key.toString()] = value
    });

    let jsonOrderInfo = JSON.stringify(orderInfo).replace("\{\}", JSON.stringify(jsonProductQuantity));

    return this.http.post<void>(`${this.apiServerUrl}/client/makeSignedInOrder`, jsonOrderInfo, this.requestOptions);
  }
}
