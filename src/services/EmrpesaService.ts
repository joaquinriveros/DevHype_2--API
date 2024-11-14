import Swal from "sweetalert2";
import { BackendClient } from "./BackendClient";
import { IEmpresa } from "../types/dtos/empresa/IEmpresa";
const API_URL = "http://190.221.207.224:8090/empresas";

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

        try {
            const response = await fetch(`${API_URL}`, {
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

    async getEmpresaById(idEmpresa: number): Promise<IEmpresa> {
        Swal.fire({
            title: "Buscando empresa...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const response = await fetch(`${API_URL}/${idEmpresa}`, {
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
    async createEmpresa(empresa: IEmpresa) {
        Swal.fire({
            title: "Creando empresa...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const create = await fetch(`${API_URL}`, { //PREGUNTAR
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
    async updateEmpresa( idEmpresa: number, empresa : IEmpresa){
        Swal.fire({
            title: "Acualizando empresa...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const create = await fetch(`${API_URL}/${idEmpresa}`, { //PREGUNTAR
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