import { BackendClient } from "./BackendClient";
import { IProvincia } from "../types/IProvincia";
const API_URL = import.meta.env.VITE_URL_API;

export class ProvinciaService extends BackendClient<IProvincia> {
    constructor(baseUrl: string = "provincias") {
        super(`${API_URL}/${baseUrl}`);
    }

    async getAllProvinciaByPais(idPais: number): Promise<IProvincia[] | null> {
        try {
            const response = await fetch(`${this.baseUrl}/findByPais/${idPais}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar las provincias");
            }

            const newData = await response.json();
            return newData as IProvincia[];
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
