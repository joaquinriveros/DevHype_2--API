import { ISucursal } from "./ISucursal";

export interface IEmpresa {
  name: string;
  description: string;
  cuit: string;
  urlImg: string;
  sucursales: ISucursal[]
}