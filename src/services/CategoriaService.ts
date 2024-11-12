import Swal from "sweetalert2";
import { BackendClient } from "./BackendClient";
import { ICategorias } from "../types/dtos/categorias/ICategorias";
// Obtenemos la URL base de la API desde las variables de entorno
const API_URL = "http://localhost:8090/categorias";

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

    
}