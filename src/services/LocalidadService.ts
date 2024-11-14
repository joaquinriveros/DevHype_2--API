import Swal from "sweetalert2";
import { BackendClient } from "./BackendClient";
import { ILocalidad } from "../types/ILocalidad";
const API_URL = "http://190.221.207.224:8090/localidades";

export class ClienteService extends BackendClient<ILocalidad> {
    constructor() {
        super(`${API_URL}`);
    }


    async getLocalidadesByProvincia(idProvincia : number): Promise<ILocalidad[]> {
        Swal.fire({
            title: "Cargando localidades...",
            allowOutsideClick: false, 
            didOpen: () => {
                Swal.showLoading(); 
            },
        });

        try{
            const response = await fetch(`${API_URL}/findByProvincia/${idProvincia}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar las localidades");
            }

            const newData : ILocalidad[] = await response.json();
            return newData;
        } finally {
            Swal.close(); 
        }
    }

}