import Swal from "sweetalert2";
import { BackendClient } from "./BackendClient";
import { IProductos } from "../types/dtos/productos/IProductos";
import { ICreateProducto } from "../types/dtos/productos/ICreateProducto";
import { IUpdateProducto } from "../types/dtos/productos/IUpdateProducto";
const API_URL = import.meta.env.VITE_URL_API;

export class ProductoService extends BackendClient<IProductos | ICreateProducto | IUpdateProducto> {
    constructor(baseUrl : string = "articulos") {
        super(`${API_URL}/${baseUrl}`);
    }

    async getAllProductos(): Promise<IProductos[] | null> {
        Swal.fire({
            title: "Cargando productos...",
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
                throw new Error("Error al cargar los productos");
            }

            const newData = await response.json();
            return newData as  IProductos[];
        } finally {
            Swal.close(); 
        }
    }

    async getProductoById(idProducto : number): Promise<IProductos | null>{
        Swal.fire({
            title: "Cargando producto...",
            allowOutsideClick: false, 
            didOpen: () => {
                Swal.showLoading(); 
            },
        });

        try{
            const response = await fetch(`${this.baseUrl}/${idProducto}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar el producto");
            }

            const newData = await response.json();
            return newData as  IProductos;
        } finally {
            Swal.close(); 
        }
    }

    async getProductosPorSucursal(idSucursal : number): Promise<IProductos[] | null> {
        Swal.fire({
            title: "Cargando productos...",
            allowOutsideClick: false, 
            didOpen: () => {
                Swal.showLoading(); 
            },
        });

        try{
            const response = await fetch(`${this.baseUrl}/porSucursal/${idSucursal}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar los productos");
            }

            const newData = await response.json();
            return newData as  IProductos[];
        } finally {
            Swal.close(); 
        }
    }

    async getPagedPorSucursal(idSucursal : number): Promise<IProductos | null> {
        Swal.fire({
            title: "Cargando productos...",
            allowOutsideClick: false, 
            didOpen: () => {
                Swal.showLoading(); 
            },
        });

        try{
            const response = await fetch(`${this.baseUrl}/pagedPorSucursal/${idSucursal}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar los productos");
            }

            const newData = await response.json();
            return newData as IProductos;
        } finally {
            Swal.close(); 
        }
    }

    async createProducto(producto : ICreateProducto): Promise<IProductos | null>{
        Swal.fire({
            title: "Creando producto...",
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
                body: JSON.stringify(producto),
            });

            if (!response.ok) {
                throw new Error("Error al crear el producto");
            }

            const newData = await response.json();
            return newData as IProductos;
        } finally {
            Swal.close(); 
        }
    }

    async updateProducto(idProducto : number , producto : IUpdateProducto): Promise<void>{
        Swal.fire({
            title: "Acualizando producto...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const response = await fetch(`${API_URL}/update/${idProducto}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify(producto), 
            });

            if (!response.ok) {
                throw new Error("Error al modificar el producto");
            }
        } finally {
            Swal.close();
        }
    }
}