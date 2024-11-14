import Swal from "sweetalert2";
import { BackendClient } from "./BackendClient";
import { IProductos } from "../types/dtos/productos/IProductos";
const API_URL = "http://190.221.207.224:8090/articulos";

export class ClienteService extends BackendClient<IProductos> {
    constructor() {
        super(`${API_URL}`);
    }

    async getAllProductos(): Promise<IProductos[]> {
        Swal.fire({
            title: "Cargando productos...",
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
                throw new Error("Error al cargar los productos");
            }

            const newData : IProductos[] = await response.json();
            return newData;
        } finally {
            Swal.close(); 
        }
    }

    async getProductoById(idProducto : number): Promise<IProductos>{
        Swal.fire({
            title: "Cargando producto...",
            allowOutsideClick: false, 
            didOpen: () => {
                Swal.showLoading(); 
            },
        });

        try{
            const response = await fetch(`${API_URL}/${idProducto}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar el producto");
            }

            const newData : IProductos = await response.json();
            return newData;
        } finally {
            Swal.close(); 
        }
    }

    async getProductosPorSucursal(idSucursal : number): Promise<IProductos[]> {
        Swal.fire({
            title: "Cargando productos...",
            allowOutsideClick: false, 
            didOpen: () => {
                Swal.showLoading(); 
            },
        });

        try{
            const response = await fetch(`${API_URL}/porSucursal/${idSucursal}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar los productos");
            }

            const newData : IProductos[] = await response.json();
            return newData;
        } finally {
            Swal.close(); 
        }
    }

    async getPagedPorSucursal(idSucursal : number): Promise<IProductos> {
        Swal.fire({
            title: "Cargando productos...",
            allowOutsideClick: false, 
            didOpen: () => {
                Swal.showLoading(); 
            },
        });

        try{
            const response = await fetch(`${API_URL}/pagedPorSucursal/${idSucursal}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar los productos");
            }

            const newData : IProductos = await response.json();
            return newData;
        } finally {
            Swal.close(); 
        }
    }

    //"CREATE "/articulos/create"
    async createProducto(producto : IProductos){
        Swal.fire({
            title: "Creando producto...",
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
                body: JSON.stringify(producto),
            });

            if (!create.ok) {
                throw new Error("Error al crear el producto");
            }else{
                console.log("Producto creado exitosamente");
            }

        } finally {
            Swal.close(); 
        }
    }

    //UPDATE
    async updateProducto(idProducto : number , producto : IProductos){
        Swal.fire({
            title: "Acualizando producto...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const create = await fetch(`${API_URL}/update/${idProducto}`, { //PREGUNTAR
                method: "PUT",
                headers: {
                    "Content-Type": "application/json" //PREGUNTAR
                },
                body: JSON.stringify(producto), //PREGUNTAR
            });

            if (!create.ok) {
                throw new Error("Error al modificar el producto");
            } else {
                console.log("Producto modificado exitosamente");
            }

        } finally {
            Swal.close();
        }
    }
}