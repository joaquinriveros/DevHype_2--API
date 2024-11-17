import Swal from "sweetalert2";
import { BackendClient } from "./BackendClient";
import { IAlergenos } from "../types/dtos/alergenos/IAlergenos";
import { ICreateAlergeno } from "../types/dtos/alergenos/ICreateAlergeno";
import { IUpdateAlergeno } from "../types/dtos/alergenos/IUpdateAlergeno";
const API_URL = import.meta.env.VITE_URL_API;

export class AlergenoService extends BackendClient<IAlergenos | ICreateAlergeno | IUpdateAlergeno> {
    constructor(baseUrl : string = "alergenos") {
        super(`${API_URL}/${baseUrl}`);
    }

    async getAllAlergenos(): Promise<IAlergenos[] | null> {
        Swal.fire({
            title: "Cargando alergenos...",
            allowOutsideClick: false, 
            didOpen: () => {
                Swal.showLoading(); 
            },
        });

        try{
            const response = await fetch(`${this.baseUrl}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar los alergenos");
            }

            const newData = await response.json();
            return newData as IAlergenos[];
        } finally {
            Swal.close(); 
        }
    }

    async getAlergenoById(idAlergeno : number): Promise<IAlergenos | null> {
        Swal.fire({
            title: "Buscando alergeno...",
            allowOutsideClick: false, 
            didOpen: () => {
                Swal.showLoading(); 
            },
        });

        try{
            const response = await fetch(`${this.baseUrl}/${idAlergeno}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar el alergeno");
            }

            const newData = await response.json();
            return newData as IAlergenos;
        } finally {
            Swal.close(); 
        }
    }

    async createAlergeneo(alergeno : ICreateAlergeno): Promise<IAlergenos | null>{
        Swal.fire({
            title: "Creando alergeno...",
            allowOutsideClick: false, 
            didOpen: () => {
                Swal.showLoading(); 
            },
        });

        try{
            const response = await fetch(`${this.baseUrl}`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify(alergeno),
            });

            if (!response.ok) {
                throw new Error("Error al crear el alergeno");
            }

            const newData = await response.json();
            return newData as IAlergenos;
        } finally {
            Swal.close(); 
        }
    }

    async updateAlergeno(idAlergeno : number, alergeno : IUpdateAlergeno): Promise<void>{
        Swal.fire({
            title: "Acualizando alergeno...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const create = await fetch(`${this.baseUrl}/${idAlergeno}`, { 
                method: "PUT",
                headers: {
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify(alergeno), 
            });

            if (!create.ok) {
                throw new Error("Error al modificar el alergeno");
            }

        } finally {
            Swal.close();
        }
    }
}