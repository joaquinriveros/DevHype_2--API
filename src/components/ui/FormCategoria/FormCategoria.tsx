import { useState } from "react";
import { useFormOwn } from "../../../hooks/useFormOwn";
import { Form, Row } from "react-bootstrap";
import styles from "./FormCategoria.module.css";
import { CategoriaService } from "../../../services/CategoriaService";
import { ICreateCategoria } from "../../../types/dtos/categorias/ICreateCategoria";
import { useParams } from "react-router-dom";

interface FormAlergenoProps {
  onClose: () => void;
}

export const FormCategoria: React.FC<FormAlergenoProps> = ({ onClose }) => {
  const [failTry, setFailTry] = useState(false);

  const idEmpresa = Number(useParams().empresaId);
  const categoriaService = new CategoriaService();

  const { values, handleChanges } = useFormOwn({
    denominacion: "",
  });

  const { denominacion } = values;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (denominacion === "") {
      setFailTry(true); // Activa el estado de error si el campo está vacío.
      return;
    }

    const newCategoria: ICreateCategoria = {
      idEmpresa: idEmpresa,
      denominacion: denominacion,
      idCategoriaPadre: null
    };
    try {
      await categoriaService.createCategoria(newCategoria);
      onClose();
    } catch (error) {
      console.error("Error al crear la empresa:", error);
      setFailTry(true);
    }
  };

  return (
    <div className={styles.form__container}>
      <h3>Crear Categoria</h3>
      <Form
        className={styles.form}
        noValidate
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <Row className={styles.form__input}>
          <Form.Group className={styles.form__group} controlId="nameInput">
            <Form.Label>Denominación</Form.Label>
            <Form.Control
              className={`${
                failTry && denominacion === ""
                  ? "form__inputText-fail"
                  : "form__inputText"
              }`}
              required
              type="text"
              placeholder="Nombre del alérgeno"
              value={denominacion}
              name="denominacion"
              onChange={handleChanges}
            />
          </Form.Group>
        </Row>
        <div className={styles.form__buttonContainer}>
          <button className="add__button-green" type="submit">
            Crear
          </button>
          <button className="add__button" type="button" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </Form>
    </div>
  );
};
export default FormCategoria;
