import { AbstractBackendClient } from "./AbstractBackendClient";

export abstract class BackendClient<T> extends AbstractBackendClient<T> {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  async getAll(): Promise<T[]> {
    const response = await fetch(`${this.baseUrl}`);
    if (!response.ok) {
      throw new Error(`Error al obtener todos los elementos`);
    }
    const data = await response.json();
    return data as T[];
  }

  async getById(id: string): Promise<T | null> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) {
      throw new Error(`Error al obtener el elemento con ID ${id}`);
    }
    const data = await response.json();
    return data as T;
  }

  async post(data: T): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Error al enviar los datos`);
      }
      const newData = await response.json();
      return newData as T;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async put(id: number, data: T): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Error al actualizar el elemento con ID ${id}`);
      }
      const newData = await response.json();
      return newData as T;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error al eliminar el elemento con ID ${id}`);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
