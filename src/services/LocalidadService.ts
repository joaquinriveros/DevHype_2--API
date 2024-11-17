import Swal from "sweetalert2";
import { BackendClient } from "./BackendClient";
import { ILocalidad } from "../types/ILocalidad";
const API_URL = import.meta.env.VITE_URL_API;

export class LocalidadService extends BackendClient<ILocalidad> {
    constructor(baseUrl : string = "localidades") {
        super(`${API_URL}/${baseUrl}`);
    }


    async getLocalidadesByProvincia(idProvincia : number): Promise<ILocalidad[] | null> {
        Swal.fire({
            title: "Cargando localidades...",
            allowOutsideClick: false, 
            didOpen: () => {
                Swal.showLoading(); 
            },
        });

        try{
            const response = await fetch(`${this.baseUrl}/findByProvincia/${idProvincia}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar las localidades");
            }

            const newData = await response.json();
            return newData as ILocalidad[];
        } finally {
            Swal.close(); 
        }
    }

}