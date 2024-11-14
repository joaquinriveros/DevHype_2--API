import Swal from "sweetalert2";
import { BackendClient } from "./BackendClient";
import { IProvincia } from "../types/IProvincia";
const API_URL = "http://190.221.207.224:8090/provincias";



export class ClienteService extends BackendClient<IProvincia> {
    constructor() {
        super(`${API_URL}`);
    }


    async getAllProvinciaByPais(idPais : number): Promise<IProvincia[]> {
        Swal.fire({
            title: "Cargando provincias...",
            allowOutsideClick: false, 
            didOpen: () => {
                Swal.showLoading(); 
            },
        });

        try{
            const response = await fetch(`${API_URL}/findByPais/${idPais}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar las provincias");
            }

            const newData : IProvincia[] = await response.json();
            return newData;
        } finally {
            Swal.close(); 
        }
    }


}