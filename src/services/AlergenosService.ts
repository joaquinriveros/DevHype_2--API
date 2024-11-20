import Swal from "sweetalert2";
import { BackendClient } from "./BackendClient";
import { IAlergenos } from "../types/dtos/alergenos/IAlergenos";
import { ICreateAlergeno } from "../types/dtos/alergenos/ICreateAlergeno";
import { IUpdateAlergeno } from "../types/dtos/alergenos/IUpdateAlergeno";
const API_URL = import.meta.env.VITE_URL_API;

export class AlergenoService extends BackendClient<IAlergenos | ICreateAlergeno | IUpdateAlergeno> {
  constructor(baseUrl: string = "alergenos") {
    super(`${API_URL}/${baseUrl}`);
  }

  /**
   * Subir una imagen al servidor
   * @param imagen Archivo de la imagen que se desea subir
   * @returns Datos de la imagen subida (id, url, name)
   */
  async uploadImage(imagen: File): Promise<{ id: number; url: string; name: string }> {
    Swal.fire({
      title: "Subiendo imagen...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const formData = new FormData();
      formData.append("file", imagen);

      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al subir la imagen");
      }

      const uploadedImage = await response.json();
      return uploadedImage; // El servidor debe devolver { id, url, name }
    } finally {
      Swal.close();
    }
  }

  async getAllAlergenos(): Promise<IAlergenos[] | null> {
    Swal.fire({
      title: "Cargando alérgenos...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch(`${this.baseUrl}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Error al cargar los alérgenos");
      }

      const newData = await response.json();
      return newData as IAlergenos[];
    } finally {
      Swal.close();
    }
  }

  async getAlergenoById(idAlergeno: number): Promise<IAlergenos | null> {
    Swal.fire({
      title: "Buscando alérgeno...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch(`${this.baseUrl}/${idAlergeno}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Error al cargar el alérgeno");
      }

      const newData = await response.json();
      return newData as IAlergenos;
    } finally {
      Swal.close();
    }
  }

  async createAlergeno(alergeno: ICreateAlergeno): Promise<IAlergenos | null> {
    Swal.fire({
      title: "Creando alérgeno...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch(`${this.baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(alergeno),
      });

      if (!response.ok) {
        throw new Error("Error al crear el alérgeno");
      }

      const newData = await response.json();
      return newData as IAlergenos;
    } finally {
      Swal.close();
    }
  }

  async updateAlergeno(idAlergeno: number, alergeno: IUpdateAlergeno): Promise<void> {
    Swal.fire({
      title: "Actualizando alérgeno...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch(`${this.baseUrl}/${idAlergeno}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(alergeno),
      });

      if (!response.ok) {
        throw new Error("Error al modificar el alérgeno");
      }
    } finally {
      Swal.close();
    }
  }
}
