import { useState } from "react";
import { AlergenoService } from "../../../services/AlergenosService";
import { IImagen } from "../../../types/IImagen"; // Asegúrate de que esta importación sea correcta
import styles from "./FormAlergenos.module.css";

interface FormAlergenoProps {
  onClose: () => void;
  onSuccess: () => void;
  alergeno?: { id: number; denominacion: string; imagen?: IImagen | null }; // Opcional para edición
}

export const FormAlergeno: React.FC<FormAlergenoProps> = ({
  onClose,
  onSuccess,
  alergeno,
}) => {
  const [denominacion, setDenominacion] = useState(alergeno?.denominacion || "");
  const [imagen, setImagen] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const alergenoService = new AlergenoService();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setImagen(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      let imagenData: IImagen | null = alergeno?.imagen || null;

      // Subir la imagen si se ha seleccionado
      if (imagen) {
        const uploadResult = await alergenoService.uploadImage(imagen); // Este método debe devolver { id, url, name }
        imagenData = {
          id: uploadResult.id,
          name: uploadResult.name,
          url: uploadResult.url,
          eliminado: false,
        };
      }

      if (alergeno) {
        // Editar el alérgeno existente
        await alergenoService.updateAlergeno(alergeno.id, {
            denominacion,
            imagen: imagenData,
            id: 0
        });
      } else {
        // Crear un nuevo alérgeno
        await alergenoService.createAlergeno({
          denominacion,
          imagen: imagenData,
        });
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError("Error al guardar el alérgeno. Por favor, inténtalo nuevamente.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h3>{alergeno ? "Editar Alergeno" : "Crear Alergeno"}</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="denominacion">Nombre</label>
        <input
          type="text"
          id="denominacion"
          value={denominacion}
          onChange={(e) => setDenominacion(e.target.value)}
          required
        />
        <label htmlFor="imagen">Imagen</label>
        <input type="file" id="imagen" accept="image/*" onChange={handleImageChange} />
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.buttonGroup}>
          <button type="submit" className="add__button-green" disabled={isLoading}>
            {isLoading ? "Guardando..." : alergeno ? "Guardar" : "Crear"}
          </button>
          <button type="button" onClick={onClose} className="add__button">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
