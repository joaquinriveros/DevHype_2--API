import Swal from "sweetalert2";
import { BackendClient } from "./BackendClient";
import { ICategorias } from "../types/dtos/categorias/ICategorias";
// Obtenemos la URL base de la API desde las variables de entorno
const API_URL = "http://190.221.207.224:8090/categorias";

export class CategoriaService extends BackendClient<ICategorias> {
    constructor() {
        super(`${API_URL}`);
    }

    async getAllCategoriaPorSucursal(idSucursal : number): Promise<ICategorias[]> {
        Swal.fire({
            title: "Cargando categorías de la sucursal...",
            allowOutsideClick: false, 
            didOpen: () => {
                Swal.showLoading(); 
            },
        });

        try{
            const response = await fetch(`${API_URL}/allCategoriasPorSucursal/${idSucursal}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar las categorias de sucursal id: " + idSucursal);
            }

            const newData : ICategorias[] = await response.json();
            return newData;
        } finally {
            Swal.close(); 
        }
    }

    async getAllCategoriaPorEmpresa(idEmpresa : number): Promise<ICategorias[]> {
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

            const newData : ICategorias[] = await response.json();
            return newData;
        } finally {
            Swal.close(); 
        }
    }

    async getOneCategoria(idCategoria : number): Promise<ICategorias> {
        Swal.fire({
            title: "Cargando categoría...",
            allowOutsideClick: false, 
            didOpen: () => {
                Swal.showLoading(); 
            },
        });

        try{
            const response = await fetch(`${API_URL}/categorias/${idCategoria}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar la categoria");
            }

            const newData : ICategorias = await response.json();
            return newData;
        } finally {
            Swal.close(); 
        }
    }

    //PREGUNTAR: http://190.221.207.224:8090/categorias/allSubCategoriasPorCategoriaPadre/1/1

    async getAllSubCategoriasPorCategoriaPadre(idPadre : number): Promise<ICategorias[]>{
        Swal.fire({
            title: "Cargando categoría...",
            allowOutsideClick: false, 
            didOpen: () => {
                Swal.showLoading(); 
            },
        });

        try{
            const response = await fetch(`${API_URL}/categorias/allSubCategoriasPorCategoriaPadre/${idPadre}/`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar la categoria");
            }

            const newData : ICategorias[] = await response.json();
            return newData;
        } finally {
            Swal.close(); 
        }
    }

    async createCategoria(categoria : ICategorias){
        Swal.fire({
            title: "Creando categoria...",
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
                body: JSON.stringify(categoria),
            });

            if (!create.ok) {
                throw new Error("Error al crear la categoria");
            }else{
                console.log("Categoria creada exitosamente");
            }

        } finally {
            Swal.close(); 
        }
    }

    async updateCategoria(idCategoria : number , categoria : ICategorias){
        Swal.fire({
            title: "Acualizando categoria...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const create = await fetch(`${API_URL}/update/${idCategoria}`, { //PREGUNTAR
                method: "PUT",
                headers: {
                    "Content-Type": "application/json" //PREGUNTAR
                },
                body: JSON.stringify(categoria), //PREGUNTAR
            });

            if (!create.ok) {
                throw new Error("Error al modificar la categoria");
            } else {
                console.log("Categoria modificada exitosamente");
            }

        } finally {
            Swal.close();
        }
    }
}