import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginInfo} from "../../../dto/login-info";
import {UnsignedOrderInfo} from "../../../dto/unsigned-order-info";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../../services/user.service";
import {UserInfo} from "../../../dto/user-info";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  loginInfo: LoginInfo;
  // userInfo: UserInfo;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = new FormGroup({
      login: new FormControl(null, [
        Validators.required,
        Validators.maxLength(25)]),
      password: new FormControl(null, [
        Validators.required,
        Validators.maxLength(60)])
    });
  }

  public isControlInvalid(controlName: string): boolean {
    const control = this.loginForm.controls[controlName];
    return control.invalid && control.touched;
  }

  public onSubmit(): void {
    if (this.loginForm.invalid) {
      const controls = this.loginForm.controls;
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.confirmLogin();
  }

  public confirmLogin(): void {
    const login = this.loginForm.controls['login'].value;
    const password = this.loginForm.controls['password'].value;
    this.loginInfo = new LoginInfo(login, password);

    this.userService.login(this.loginInfo).subscribe(
      (response: UserInfo) => {
        this.userService.setUserInfo(response);
        this.router.navigateByUrl('/');
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
}
