import { Component, OnInit } from '@angular/core';
import {UserInfo} from "../../../dto/user-info";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userInfo: any;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.userInfo = this.userService.getUserInfo();
  }

  logout(): void {
    this.userService.clearUserInfo();
    this.userInfo = undefined;
    this.router.navigateByUrl('/');
  }
}
