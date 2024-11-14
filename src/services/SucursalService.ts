import Swal from "sweetalert2";
import { BackendClient } from "./BackendClient";
import { ISucursal } from "../types/dtos/sucursal/ISucursal";
const API_URL = "http://190.221.207.224:8090/sucursales";


export class SucursalService extends BackendClient<ISucursal> {
    constructor() {
        super(`${API_URL}`);
    }

    async getAllSucursales(): Promise<ISucursal[]> {
        Swal.fire({
            title: "Cargando sucursales...",
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
                throw new Error("Error al cargar las sucursales");
            }

            const newData : ISucursal[] = await response.json();
            return newData;
        } finally {
            Swal.close(); 
        }
    }

    
    async getSucursalesPorEmpresa(idEmpresa : number): Promise<ISucursal[]> {
        Swal.fire({
            title: "Cargando sucursales...",
            allowOutsideClick: false, 
            didOpen: () => {
                Swal.showLoading(); 
            },
        });

        try{
            const response = await fetch(`${API_URL}/porEmpresa/${idEmpresa}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar las sucursales de empresa id:" + idEmpresa);
            }

            const newData : ISucursal[] = await response.json();
            return newData;
        } finally {
            Swal.close(); 
        }
    }

    async getIsCasaMatriz(): Promise<ISucursal>{
        Swal.fire({
            title: "Cargando casa matriz...",
            allowOutsideClick: false, 
            didOpen: () => {
                Swal.showLoading(); 
            },
        });

        try{
            const response = await fetch(`${API_URL}/existCasaMatriz/1`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar la casa matriz");
            }

            const newData : ISucursal = await response.json();
            return newData;
        } finally {
            Swal.close(); 
        }
    }

    //Create: http://190.221.207.224:8090/sucursales/create
    async createSucursal(sucursal : ISucursal){
        Swal.fire({
            title: "Creando sucursal...",
            allowOutsideClick: false, 
            didOpen: () => {
                Swal.showLoading(); 
            },
        });

        try{
            const create = await fetch(`${API_URL}/create`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" //PREGUNTAR
                },
                body: JSON.stringify(sucursal),
            });

            if (!create.ok) {
                throw new Error("Error al crear la sucursal");
            }else{
                console.log("Sucursal creada exitosamente");
            }

        } finally {
            Swal.close(); 
        }
    }

    //EditOneSucursal: http://190.221.207.224:8090/sucursales/update/1
    async updateSucursal(idSucursal : number, sucursal : ISucursal){
        Swal.fire({
            title: "Acualizando sucursal...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const create = await fetch(`${API_URL}/${idSucursal}`, { //PREGUNTAR
                method: "PUT",
                headers: {
                    "Content-Type": "application/json" //PREGUNTAR
                },
                body: JSON.stringify(sucursal), //PREGUNTAR
            });

            if (!create.ok) {
                throw new Error("Error al modificar la sucursal");
            } else {
                console.log("Sucursal modificada exitosamente");
            }

        } finally {
            Swal.close();
        }
    }
}