import { IProduct } from "./IProduct";

export interface ISucursal {
  name: string;
  description: string;
  url: string;
  productos: IProduct[]
}