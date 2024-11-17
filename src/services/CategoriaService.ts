import Swal from "sweetalert2";
import { BackendClient } from "./BackendClient";
import { ICategorias } from "../types/dtos/categorias/ICategorias";
import { ICreateCategoria } from "../types/dtos/categorias/ICreateCategoria";
import { IUpdateCategoria } from "../types/dtos/categorias/IUpdateCategoria";
const API_URL = import.meta.env.VITE_URL_API;

export class CategoriaService extends BackendClient<ICategorias | ICreateCategoria | IUpdateCategoria> {
    constructor(baseUrl : string = "categorias") {
        super(`${API_URL}/${baseUrl}`);
    }

    async getAllCategoriaPorSucursal(idSucursal : number): Promise<ICategorias[] | null> {
        Swal.fire({
            title: "Cargando categorías de la sucursal...",
            allowOutsideClick: false, 
            didOpen: () => {
                Swal.showLoading(); 
            },
        });

        try{
            const response = await fetch(`${this.baseUrl}/allCategoriasPorSucursal/${idSucursal}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar las categorias de sucursal id: " + idSucursal);
            }

            const newData = await response.json();
            return newData as ICategorias[];
        } finally {
            Swal.close(); 
        }
    }

    async getAllCategoriaPorEmpresa(idEmpresa : number): Promise<ICategorias[] | null> {
        Swal.fire({
            title: "Cargando categorias de la empresa...",
            allowOutsideClick: false, 
            didOpen: () => {
                Swal.showLoading(); 
            },
        });

        try{
            const response = await fetch(`${API_URL}/allCategoriasPorEmpresa/${idEmpresa}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar las categorias de epresa id: " + idEmpresa);
            }

            const newData = await response.json();
            return newData as ICategorias[];
        } finally {
            Swal.close(); 
        }
    }

    async getOneCategoria(idCategoria : number): Promise<ICategorias | null> {
        Swal.fire({
            title: "Cargando categoría...",
            allowOutsideClick: false, 
            didOpen: () => {
                Swal.showLoading(); 
            },
        });

        try{
            const response = await fetch(`${this.baseUrl}/${idCategoria}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar la categoria");
            }

            const newData = await response.json();
            return newData as ICategorias;
        } finally {
            Swal.close(); 
        }
    }

    async getAllSubCategoriasPorCategoriaPadre(idPadre : number, idSucursal : number): Promise<ICategorias[]>{
        Swal.fire({
            title: "Cargando categoría...",
            allowOutsideClick: false, 
            didOpen: () => {
                Swal.showLoading(); 
            },
        });

        try{
            const response = await fetch(
                `${this.baseUrl}/allSubCategoriasPorCategoriaPadre/${idPadre}/${idSucursal}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar la categoria");
            }

            const newData = await response.json();
            return newData as ICategorias[];
        } finally {
            Swal.close(); 
        }
    }

    async createCategoria(categoria : ICreateCategoria): Promise<ICategorias | null>{
        Swal.fire({
            title: "Creando categoria...",
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
                body: JSON.stringify(categoria),
            });

            if (!response.ok) {
                throw new Error("Error al crear la categoria");
            }
            
            const data = await response.json();
            return data as ICategorias;
        } finally {
            Swal.close(); 
        }
    }

    async updateCategoria(idCategoria : number , categoria : IUpdateCategoria): Promise<ICategorias | null>{
        Swal.fire({
            title: "Acualizando categoria...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const response = await fetch(`${this.baseUrl}/update/${idCategoria}`, { 
                method: "PUT",
                headers: {
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify(categoria), 
            });

            if (!response.ok) {
                throw new Error("Error al modificar la categoria");
            }

            const newData = await response.json();
            return newData as ICategorias;

        } finally {
            Swal.close();
        }
    }

    async bajaPorSucursal(idCategoria : number, idSucursal : number) : Promise<void>{
        Swal.fire({
            title: "Dando de baja categoria...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const response = await fetch(`${this.baseUrl}/bajaPorSucursal/${idCategoria}/${idSucursal}`, { 
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Error al dar de baja la categoria");
            }

        } finally {
            Swal.close();
        }
    }
}