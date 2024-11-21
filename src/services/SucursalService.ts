import Swal from "sweetalert2";
import { BackendClient } from "./BackendClient";
import { ISucursal } from "../types/dtos/sucursal/ISucursal";
import { ICreateSucursal} from "../types/dtos/sucursal/ICreateSucursal";
import { IUpdateSucursal} from "../types/dtos/sucursal/IUpdateSucursal";
const API_URL = import.meta.env.VITE_URL_API;


export class SucursalService extends BackendClient<ISucursal | ICreateSucursal | IUpdateSucursal> {
    constructor(baseUrl : string = "sucursales") {
        super(`${API_URL}/${baseUrl}`);
    }

    async getAllSucursales(): Promise<ISucursal[] | null> {
        Swal.fire({
            title: "Cargando sucursales...",
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
                throw new Error("Error al cargar las sucursales");
            }

            const newData = await response.json();
            return newData as ISucursal[];
        } finally {
            Swal.close(); 
        }
    }

    async getSucursalById(idSucursal: number): Promise<ISucursal | null> {
        Swal.fire({
            title: "Buscando sucursal...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const response = await fetch(`${this.baseUrl}/${idSucursal}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar la empresa id:" + idSucursal);
            }

            const newData: ISucursal = await response.json();
            return newData;
        } finally {
            Swal.close();
        }
    }
    
    async getSucursalesPorEmpresa(idEmpresa : number): Promise<ISucursal[] | null> {
        Swal.fire({
            title: "Cargando sucursales...",
            allowOutsideClick: false, 
            didOpen: () => {
                Swal.showLoading(); 
            },
        });

        try{
            const response = await fetch(`${this.baseUrl}/porEmpresa/${idEmpresa}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar las sucursales de empresa id:" + idEmpresa);
            }

            const newData = await response.json();
            return newData as  ISucursal[];
        } finally {
            Swal.close(); 
        }
    }

    async getIsCasaMatriz(): Promise<ISucursal | null>{
        Swal.fire({
            title: "Cargando casa matriz...",
            allowOutsideClick: false, 
            didOpen: () => {
                Swal.showLoading(); 
            },
        });

        try{
            const response = await fetch(`${this.baseUrl}/existCasaMatriz/1`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar la casa matriz");
            }

            const newData = await response.json();
            return newData as ISucursal;
        } finally {
            Swal.close(); 
        }
    }

    async createSucursal(sucursal : ICreateSucursal): Promise<ISucursal | null>{
        Swal.fire({
            title: "Creando sucursal...",
            allowOutsideClick: false, 
            didOpen: () => {
                Swal.showLoading(); 
            },
        });

        try{
            const response = await fetch(`${this.baseUrl}/create`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify(sucursal),
            });

            if (!response.ok) {
                throw new Error("Error al crear la sucursal");
            }

            const newData = await response.json();
            return newData as ISucursal;
        } finally {
            Swal.close(); 
        }
    }

    async updateSucursal(idSucursal : number, sucursal : ICreateSucursal): Promise<void>{
        Swal.fire({
            title: "Acualizando sucursal...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const update = await fetch(`${this.baseUrl}/update/${idSucursal}`, { 
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sucursal),
            });

            if (!update.ok) {
                throw new Error("Error al modificar la sucursal");
            }

        } finally {
            Swal.close();
        }
    }
}