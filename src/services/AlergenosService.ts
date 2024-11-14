import Swal from "sweetalert2";
import { BackendClient } from "./BackendClient";
import { IAlergenos } from "../types/dtos/alergenos/IAlergenos";
// Obtenemos la URL base de la API desde las variables de entorno
const API_URL = "http://localhost:8090/alergenos";

export class AlegenoService extends BackendClient<IAlergenos> {
    constructor() {
        super(`${API_URL}`);
    }

    async getAllAlergenos(): Promise<IAlergenos[]> {
        Swal.fire({
            title: "Cargando alergenos...",
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
                throw new Error("Error al cargar los alergenos");
            }

            const newData : IAlergenos[] = await response.json();
            return newData;
        } finally {
            Swal.close(); 
        }
    }

    async getAlergenoById(idAlergeno : number): Promise<IAlergenos> {
        Swal.fire({
            title: "Buscando alergeno...",
            allowOutsideClick: false, 
            didOpen: () => {
                Swal.showLoading(); 
            },
        });

        try{
            const response = await fetch(`${API_URL}/${idAlergeno}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar el alergeno");
            }

            const newData : IAlergenos = await response.json();
            return newData;
        } finally {
            Swal.close(); 
        }
    }

    async createAlergeneo(alergeno : IAlergenos){
        Swal.fire({
            title: "Creando alergeno...",
            allowOutsideClick: false, 
            didOpen: () => {
                Swal.showLoading(); 
            },
        });

        try{
            const create = await fetch(`${API_URL}`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" //PREGUNTAR
                },
                body: JSON.stringify(alergeno),
            });

            if (!create.ok) {
                throw new Error("Error al crear el alergeno");
            }else{
                console.log("Alergeno creado exitosamente");
            }

        } finally {
            Swal.close(); 
        }
    }

    async updateAlergeno(idAlergeno : number, alergeno : IAlergenos){
        Swal.fire({
            title: "Acualizando alergeno...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const create = await fetch(`${API_URL}/${idAlergeno}`, { //PREGUNTAR
                method: "PUT",
                headers: {
                    "Content-Type": "application/json" //PREGUNTAR
                },
                body: JSON.stringify(alergeno), //PREGUNTAR
            });

            if (!create.ok) {
                throw new Error("Error al modificar el alergeno");
            } else {
                console.log("Alergeno modificado exitosamente");
            }

        } finally {
            Swal.close();
        }
    }
}