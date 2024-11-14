import Swal from "sweetalert2";
import { BackendClient } from "./BackendClient";
import { ISucursal } from "../types/dtos/sucursal/ISucursal";
const API_URL = "http://localhost:8090/sucursales";


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

    //EditOneSucursal: http://190.221.207.224:8090/sucursales/update/1

    //
}