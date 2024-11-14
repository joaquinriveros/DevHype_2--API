import Swal from "sweetalert2";
import { BackendClient } from "./BackendClient";
import { IPais } from "../types/IPais";
const API_URL = "http://localhost:8090/paises";

export class ClienteService extends BackendClient<IPais> {
    constructor() {
        super(`${API_URL}`);
    }


    async getAllPaises(): Promise<IPais[]> {
        Swal.fire({
            title: "Cargando paises...",
            allowOutsideClick: false, 
            didOpen: () => {
                Swal.showLoading(); 
            },
        });

        try{
            const response = await fetch(`${API_URL}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar los paises");
            }

            const newData : IPais[] = await response.json();
            return newData;
        } finally {
            Swal.close(); 
        }
    }
}