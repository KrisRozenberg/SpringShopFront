export class SignedInOrderInfo {
  login: string;
  address: string;
  isDelivery: boolean;
  productQuantity: Map<number, number>;

  constructor(isDelivery: boolean, address: string) {
    this.isDelivery = isDelivery;
    this.address = address;
  }
}
