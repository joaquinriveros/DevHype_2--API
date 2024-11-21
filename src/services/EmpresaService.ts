import { BackendClient } from "./BackendClient";
import { IEmpresa } from "../types/dtos/empresa/IEmpresa";
import { ICreateEmpresaDto } from "../types/dtos/empresa/ICreateEmpresaDto";
import { IUpdateEmpresaDto } from "../types/dtos/empresa/IUpdateEmpresaDto";

const API_URL = import.meta.env.VITE_URL_API;

export class EmpresaService extends BackendClient<IEmpresa | ICreateEmpresaDto | IUpdateEmpresaDto> {
    constructor(baseUrl: string = "empresas") {
        super(`${API_URL}/${baseUrl}`);
    }

    async getAllEmpresas(): Promise<IEmpresa[]> {
        try {
            const response = await fetch(this.baseUrl, { method: "GET" });

            if (!response.ok) {
                throw new Error("Error al cargar las empresas");
            }

            const newData: IEmpresa[] = await response.json();
            return newData;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getEmpresaById(idEmpresa: number): Promise<IEmpresa | null> {
        try {
            const response = await fetch(`${this.baseUrl}/${idEmpresa}`, { method: "GET" });

            if (!response.ok) {
                throw new Error("Error al cargar la empresa con id: " + idEmpresa);
            }

            const newData: IEmpresa = await response.json();
            return newData;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async createEmpresa(empresa: ICreateEmpresaDto): Promise<void> {
        try {
            const response = await fetch(`${this.baseUrl}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(empresa),
            });

            if (!response.ok) {
                throw new Error("Error al crear la empresa");
            } else {
                console.log("Empresa creada exitosamente");
            }
        } catch (error) {
            console.error(error);
        }
    }

    async updateEmpresa(idEmpresa: number, empresa: IUpdateEmpresaDto): Promise<void> {
        try {
            const response = await fetch(`${this.baseUrl}/${idEmpresa}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(empresa),
            });

            if (!response.ok) {
                throw new Error("Error al modificar la empresa");
            } else {
                console.log("Empresa modificada exitosamente");
            }
        } catch (error) {
            console.error(error);
        }
    }
}
