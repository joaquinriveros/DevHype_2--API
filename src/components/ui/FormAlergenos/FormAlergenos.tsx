import { useState } from "react";
import { Form, Row } from "react-bootstrap";
import { AlergenoService } from "../../../services/AlergenosService";
import { IImagen } from "../../../types/IImagen";
import styles from "./FormAlergenos.module.css";

interface FormAlergenoProps {
  onClose: () => void;
  onSuccess: () => void;
  alergeno?: { id: number; denominacion: string; imagen?: IImagen | null };
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

      if (imagen) {
        const uploadResult = await alergenoService.uploadImage(imagen);
        imagenData = {
          id: uploadResult.id,
          name: uploadResult.name,
          url: uploadResult.url,
          eliminado: false,
        };
      }

      if (alergeno) {
        await alergenoService.updateAlergeno(alergeno.id, {
          denominacion,
          imagen: imagenData,
          id: 0,
        });
      } else {
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
    <div className={styles.form__container}>
      <h3>{alergeno ? "Editar Alérgeno" : "Crear Alérgeno"}</h3>
      <Form
        className={styles.form}
        noValidate
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <Row className={styles.form__input}>
          <Form.Group className={styles.form__group} controlId="denominacionInput">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Ingrese el nombre del alérgeno"
              value={denominacion}
              onChange={(e) => setDenominacion(e.target.value)}
            />
            <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className={styles.form__input}>
          <Form.Group className={styles.form__group} controlId="imagenInput">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              required
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Form.Group>
        </Row>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.form__buttonContainer}>
          <button
            className="add__button-green"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Guardando..." : alergeno ? "Guardar" : "Crear"}
          </button>
          <button
            className="add__button"
            type="button"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </Form>
    </div>
  );
};
export default FormAlergeno;