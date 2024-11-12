import { IProduct } from "./IProduct";

export interface ISucursal {
  idSucursal: string;
  name: string;
  description: string;
  url: string;
  productos: IProduct[]
}