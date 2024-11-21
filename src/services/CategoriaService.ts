import { BackendClient } from "./BackendClient";
import { ICategorias } from "../types/dtos/categorias/ICategorias";
import { ICreateCategoria } from "../types/dtos/categorias/ICreateCategoria";
import { IUpdateCategoria } from "../types/dtos/categorias/IUpdateCategoria";
const API_URL = import.meta.env.VITE_URL_API;

export class CategoriaService extends BackendClient<ICategorias | ICreateCategoria | IUpdateCategoria> {
    constructor(baseUrl: string = "categorias") {
        super(`${API_URL}/${baseUrl}`);
    }

    async getAllCategoriaPorSucursal(idSucursal: number): Promise<ICategorias[] | null> {
        try {
            const response = await fetch(`${this.baseUrl}/allCategoriasPorSucursal/${idSucursal}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar las categorías de la sucursal id: " + idSucursal);
            }

            const newData = await response.json();
            return newData as ICategorias[];
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getAllCategoriaPorEmpresa(idEmpresa: number): Promise<ICategorias[] | null> {
        try {
            const response = await fetch(`${API_URL}/allCategoriasPorEmpresa/${idEmpresa}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar las categorías de la empresa id: " + idEmpresa);
            }

            const newData = await response.json();
            return newData as ICategorias[];
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getOneCategoria(idCategoria: number): Promise<ICategorias | null> {
        try {
            const response = await fetch(`${this.baseUrl}/${idCategoria}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error al cargar la categoría");
            }

            const newData = await response.json();
            return newData as ICategorias;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getAllSubCategoriasPorCategoriaPadre(idPadre: number, idSucursal: number): Promise<ICategorias[]> {
        try {
            const response = await fetch(
                `${this.baseUrl}/allSubCategoriasPorCategoriaPadre/${idPadre}/${idSucursal}`,
                {
                    method: "GET",
                }
            );

            if (!response.ok) {
                throw new Error("Error al cargar la subcategoría");
            }

            const newData = await response.json();
            return newData as ICategorias[];
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async createCategoria(categoria: ICreateCategoria): Promise<ICategorias | null> {
        try {
            const response = await fetch(`${this.baseUrl}/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(categoria),
            });

            if (!response.ok) {
                throw new Error("Error al crear la categoría");
            }

            const data = await response.json();
            return data as ICategorias;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateCategoria(idCategoria: number, categoria: IUpdateCategoria): Promise<ICategorias | null> {
        try {
            const response = await fetch(`${this.baseUrl}/update/${idCategoria}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(categoria),
            });

            if (!response.ok) {
                throw new Error("Error al modificar la categoría");
            }

            const newData = await response.json();
            return newData as ICategorias;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async bajaPorSucursal(idCategoria: number, idSucursal: number): Promise<void> {
        try {
            const response = await fetch(`${this.baseUrl}/bajaPorSucursal/${idCategoria}/${idSucursal}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Error al dar de baja la categoría");
            }
        } catch (error) {
            console.error(error);
        }
    }
}
