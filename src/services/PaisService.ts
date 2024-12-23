import { BackendClient } from "./BackendClient";
import { IPais } from "../types/IPais";
const API_URL = import.meta.env.VITE_URL_API;

export class PaisService extends BackendClient<IPais> {
    constructor(baseUrl: string = "paises") {
        super(`${API_URL}/${baseUrl}`);
    }

    async getAllPaises(): Promise<IPais[]> {
        try {
            const response = await fetch(`${this.baseUrl}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar los países");
            }

            const newData = await response.json();
            return newData as IPais[];
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}
