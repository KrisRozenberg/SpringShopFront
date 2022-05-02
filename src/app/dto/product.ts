import {Category} from "./category";

export class Product {
  productId: number;
  name: string;
  description: string;
  imageUrl: string;
  quantity: number;
  price: number;
  status: string;
  category: Category;
}
