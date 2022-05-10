export class OrderInfo {
  name: string;
  surname: string;
  address: string;
  isDelivery: boolean;
  productQuantity: Map<number, number>;

  constructor(name: string, surname: string, isDelivery: boolean, address: string) {
    this.name = name;
    this.surname = surname;
    this.isDelivery = isDelivery;
    this.address = address;
  }
}
