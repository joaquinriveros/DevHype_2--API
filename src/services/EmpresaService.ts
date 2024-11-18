import { BackendClient } from "./BackendClient";
import { IEmpresa } from "../types/dtos/empresa/IEmpresa";
import { ICreateEmpresaDto } from "../types/dtos/empresa/ICreateEmpresaDto";
import { IUpdateEmpresaDto } from "../types/dtos/empresa/IUpdateEmpresaDto";
import Swal from "sweetalert2";
const API_URL = import.meta.env.VITE_URL_API;

export class EmpresaService extends BackendClient<IEmpresa | ICreateEmpresaDto | IUpdateEmpresaDto> {
    constructor(baseUrl : string = "empresas") {
        super(`${API_URL}/${baseUrl}`);
    }


     async getAllEmpresas(): Promise<IEmpresa[]> {
         Swal.fire({
             title: "Cargando empresas...",
             allowOutsideClick: false,
             didOpen: () => {
                 Swal.showLoading();
             },
         });

         try {
             const response = await fetch(this.baseUrl, {
                 method: "GET",
             });

             if (!response.ok) {
                 throw new Error("Error al cargar las empresas");
             }

             const newData: IEmpresa[] = await response.json();
             return newData;
         } finally {
             Swal.close();
         }
     }

     async getEmpresaById(idEmpresa: number): Promise<IEmpresa | null> {
         Swal.fire({
             title: "Buscando empresa...",
             allowOutsideClick: false,
             didOpen: () => {
                 Swal.showLoading();
             },
         });

         try {
             const response = await fetch(`${this.baseUrl}/${idEmpresa}`, {
                 method: "GET",
             });

             if (!response.ok) {
                 throw new Error("Error al cargar la empresa id:" + idEmpresa);
             }

             const newData: IEmpresa = await response.json();
             return newData;
         } finally {
             Swal.close();
         }
     }

     //CREATE
     async createEmpresa(empresa: ICreateEmpresaDto) {
         Swal.fire({
             title: "Creando empresa...",
             allowOutsideClick: false,
             didOpen: () => {
                 Swal.showLoading();
             },
         });

         try {
             const create = await fetch(`${this.baseUrl}`, { //PREGUNTAR
                 method: "POST",
                 headers: {
                     "Content-Type": "application/json" //PREGUNTAR
                 },
                 body: JSON.stringify(empresa), //PREGUNTAR
             });

             if (!create.ok) {
                 throw new Error("Error al crear la empresa");
             } else {
                 console.log("Empresa creada exitosamente");
             }

         } finally {
             Swal.close();
         }
     }

     //UPDATE
     async updateEmpresa( idEmpresa: number, empresa : IUpdateEmpresaDto){
         Swal.fire({
             title: "Acualizando empresa...",
             allowOutsideClick: false,
             didOpen: () => {
                 Swal.showLoading();
             },
         });

         try {
             const create = await fetch(`${this.baseUrl}/${idEmpresa}`, { //PREGUNTAR
                 method: "PUT",
                 headers: {
                     "Content-Type": "application/json" //PREGUNTAR
                 },
                 body: JSON.stringify(empresa), //PREGUNTAR
             });

             if (!create.ok) {
                 throw new Error("Error al modificar la empresa");
             } else {
                 console.log("Empresa modificada exitosamente");
             }

         } finally {
             Swal.close();
         }
     }
}