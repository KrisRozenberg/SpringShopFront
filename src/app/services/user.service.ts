import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserInfo} from "../dto/user-info";
import {LoginInfo} from "../dto/login-info";

@Injectable({providedIn: 'root'})
export class UserService {
  userInfo: any;

  private apiServerUrl = environment.apiBaseUrl;
  private requestOptions = {
    headers: new HttpHeaders({
      Accept: "application/json",
      "Content-Type": "application/json"
    })
  };

  constructor(private http: HttpClient) {
  }

  public getUserInfo() {
    return this.userInfo;
  }

  public setUserInfo(userInfo: UserInfo) {
    return this.userInfo = userInfo;
  }

  public clearUserInfo() {
    this.userInfo = undefined;
  }

  public login(loginInfo: LoginInfo): Observable<UserInfo> {

    return this.http.post<UserInfo>(`${this.apiServerUrl}/login`, loginInfo, this.requestOptions);
  }
}
