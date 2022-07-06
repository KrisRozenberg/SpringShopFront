import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SignedInOrderInfo} from "../../../dto/signed-in-order-info";

@Component({
  selector: 'app-signed-in-order-form',
  templateUrl: './signed-in-order-form.component.html',
  styleUrls: ['./signed-in-order-form.component.css']
})
export class SignedInOrderFormComponent implements OnInit {
  orderForm: FormGroup;
  orderInfo: SignedInOrderInfo;
  @Output()
  confirmOrderEvent = new EventEmitter<SignedInOrderInfo>();
  @Input()
  orderInProcessMessage: string;
  @Input()
  serviceValidationErrors: String[];

  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.orderForm = new FormGroup({
      isDelivery: new FormControl(true),
      address: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)])
    });
  }

  public isControlInvalid(controlName: string): boolean {
    const control = this.orderForm.controls[controlName];
    return control.invalid && control.touched;
  }

  public onSubmit(): void {
    if (this.orderForm.invalid) {
      const controls = this.orderForm.controls;
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.confirmOrder();
  }

  public confirmOrder(): void {
    const isDelivery = this.orderForm.controls['isDelivery'].value;
    const address = this.orderForm.controls['address'].value;
    this.orderInfo = new SignedInOrderInfo(isDelivery, address);

    this.confirmOrderEvent.emit(this.orderInfo);
  }
}
