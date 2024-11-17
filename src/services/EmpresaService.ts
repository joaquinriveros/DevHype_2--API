import Swal from "sweetalert2";
import { BackendClient } from "./BackendClient";
import { IEmpresa } from "../types/dtos/empresa/IEmpresa";
const API_URL = "http://190.221.207.224:8090/empresas";

export class EmpresaService extends BackendClient<IEmpresa> {
    
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