import { ISucursal } from "./ISucursal";

export interface IEmpresa {
  name: string;
  description: string;
  cuit: string;
  sucursales: ISucursal[]
}