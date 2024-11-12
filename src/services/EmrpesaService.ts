// Importamos SweetAlert2 para mostrar alertas de carga y errores
import Swal from "sweetalert2";
// Importamos la clase BackendClient que extiende las funcionalidades de llamadas a API
import { BackendClient } from "./BackendClient";
// Importamos el tipo de datos IImagen para manejar imágenes en nuestra aplicación
import { IEmpresa } from "../types/dtos/empresa/IEmpresa";
// Obtenemos la URL base de la API desde las variables de entorno
const API_URL = "http://localhost:8090/empresas";

// Clase ImageService que extiende BackendClient para manejar imágenes con la API
export class ClienteService extends BackendClient<IEmpresa> {
    constructor() {
        super(`${API_URL}`);
    }


    async getAllEmpresas(): Promise<IEmpresa[]> {
        Swal.fire({
            title: "Cargando empresas...",
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
                throw new Error("Error al cargar las empresas");
            }

            const newData : IEmpresa[] = await response.json();
            return newData;
        } finally {
            Swal.close(); 
        }
    }

    async getEmpresaById(idEmpresa : number): Promise<IEmpresa> {
        Swal.fire({
            title: "Buscando empresa...",
            allowOutsideClick: false, 
            didOpen: () => {
                Swal.showLoading(); 
            },
        });

        try{
            const response = await fetch(`${API_URL}/${idEmpresa}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar la empresa id:" + idEmpresa);
            }

            const newData : IEmpresa = await response.json();
            return newData;
        } finally {
            Swal.close(); 
        }
    }

    
}