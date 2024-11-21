import { BackendClient } from "./BackendClient";
import { ISucursal } from "../types/dtos/sucursal/ISucursal";
import { ICreateSucursal } from "../types/dtos/sucursal/ICreateSucursal";
import { IUpdateSucursal } from "../types/dtos/sucursal/IUpdateSucursal";

const API_URL = import.meta.env.VITE_URL_API;

export class SucursalService extends BackendClient<ISucursal | ICreateSucursal | IUpdateSucursal> {
    constructor(baseUrl: string = "sucursales") {
        super(`${API_URL}/${baseUrl}`);
    }

    async getAllSucursales(): Promise<ISucursal[] | null> {
        try {
            const response = await fetch(`${this.baseUrl}`, { method: "GET" });
            if (!response.ok) {
                throw new Error("Error al cargar las sucursales");
            }
            const newData = await response.json();
            return newData as ISucursal[];
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getSucursalById(idSucursal: number): Promise<ISucursal | null> {
        try {
            const response = await fetch(`${this.baseUrl}/${idSucursal}`, { method: "GET" });
            if (!response.ok) {
                throw new Error("Error al cargar la sucursal con id: " + idSucursal);
            }
            const newData: ISucursal = await response.json();
            return newData;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getSucursalesPorEmpresa(idEmpresa: number): Promise<ISucursal[] | null> {
        try {
            const response = await fetch(`${this.baseUrl}/porEmpresa/${idEmpresa}`, { method: "GET" });
            if (!response.ok) {
                throw new Error("Error al cargar las sucursales de empresa con id: " + idEmpresa);
            }
            const newData = await response.json();
            return newData as ISucursal[];
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getIsCasaMatriz(): Promise<ISucursal | null> {
        try {
            const response = await fetch(`${this.baseUrl}/existCasaMatriz/1`, { method: "GET" });
            if (!response.ok) {
                throw new Error("Error al cargar la casa matriz");
            }
            const newData = await response.json();
            return newData as ISucursal;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async createSucursal(sucursal: ICreateSucursal): Promise<ISucursal | null> {
        try {
            const response = await fetch(`${this.baseUrl}/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sucursal),
            });
            if (!response.ok) {
                throw new Error("Error al crear la sucursal");
            }
            const newData = await response.json();
            return newData as ISucursal;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateSucursal(idSucursal: number, sucursal: ICreateSucursal): Promise<void> {
        try {

            const response = await fetch(`${this.baseUrl}/update/${idSucursal}`, {

                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sucursal),
            });
            if (!response.ok) {
                throw new Error("Error al modificar la sucursal");
            }
        } catch (error) {
            console.error(error);
        }
    }
}
