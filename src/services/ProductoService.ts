import { BackendClient } from "./BackendClient";
import { IProductos } from "../types/dtos/productos/IProductos";
import { ICreateProducto } from "../types/dtos/productos/ICreateProducto";
import { IUpdateProducto } from "../types/dtos/productos/IUpdateProducto";
const API_URL = import.meta.env.VITE_URL_API;

export class ProductoService extends BackendClient<IProductos | ICreateProducto | IUpdateProducto> {
    constructor(baseUrl: string = "articulos") {
        super(`${API_URL}/${baseUrl}`);
    }

    async getAllProductos(): Promise<IProductos[] | null> {
        try {
            const response = await fetch(`${this.baseUrl}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar los productos");
            }

            const newData = await response.json();
            return newData as IProductos[];
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getProductoById(idProducto: number): Promise<IProductos | null> {
        try {
            const response = await fetch(`${this.baseUrl}/${idProducto}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar el producto");
            }

            const newData = await response.json();
            return newData as IProductos;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getProductosPorSucursal(idSucursal: number): Promise<IProductos[] | null> {
        try {
            const response = await fetch(`${this.baseUrl}/porSucursal/${idSucursal}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar los productos");
            }

            const newData = await response.json();
            return newData as IProductos[];
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getPagedPorSucursal(idSucursal: number): Promise<IProductos | null> {
        try {
            const response = await fetch(`${this.baseUrl}/pagedPorSucursal/${idSucursal}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar los productos");
            }

            const newData = await response.json();
            return newData as IProductos;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async createProducto(producto: ICreateProducto): Promise<IProductos | null> {
        try {
            const response = await fetch(`${this.baseUrl}/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(producto),
            });

            if (!response.ok) {
                throw new Error("Error al crear el producto");
            }

            const newData = await response.json();
            return newData as IProductos;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateProducto(idProducto: number, producto: IUpdateProducto): Promise<void> {
        try {
            const response = await fetch(`${API_URL}/update/${idProducto}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(producto),
            });

            if (!response.ok) {
                throw new Error("Error al modificar el producto");
            }
        } catch (error) {
            console.error(error);
        }
    }

    async deleteProducto(idProducto: number): Promise<void> {
        try {
            const response = await fetch(`${this.baseUrl}/${idProducto}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ eliminado: true }), // Actualiza el campo eliminado
            });
    
            if (!response.ok) {
                throw new Error(`Error al marcar el producto con ID ${idProducto} como eliminado`);
            }
    
            console.log(`Producto con ID ${idProducto} marcado como eliminado exitosamente.`);
        } catch (error) {
            console.error(`Error al intentar eliminar el producto con ID ${idProducto}:`, error);
            throw error;
        }
    }
}
