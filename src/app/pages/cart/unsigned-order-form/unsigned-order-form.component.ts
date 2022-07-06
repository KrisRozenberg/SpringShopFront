import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UnsignedOrderInfo} from "../../../dto/unsigned-order-info";
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
  selector: 'app-unsigned-order-form',
  templateUrl: './unsigned-order-form.component.html',
  styleUrls: ['./unsigned-order-form.component.css']
})
export class UnsignedOrderFormComponent implements OnInit {
  orderForm: FormGroup;
  orderInfo: UnsignedOrderInfo;
  @Output()
  confirmOrderEvent = new EventEmitter<UnsignedOrderInfo>();
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
        name: new FormControl(null, [
          Validators.required,
          Validators.maxLength(30)]),
        surname: new FormControl(null, [
          Validators.required,
          Validators.maxLength(30)]),
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
    const name = this.orderForm.controls['name'].value;
    const surname = this.orderForm.controls['surname'].value;
    const isDelivery = this.orderForm.controls['isDelivery'].value;
    const address = this.orderForm.controls['address'].value;
    this.orderInfo = new UnsignedOrderInfo(name, surname, isDelivery, address);

    this.confirmOrderEvent.emit(this.orderInfo);
  }
}
