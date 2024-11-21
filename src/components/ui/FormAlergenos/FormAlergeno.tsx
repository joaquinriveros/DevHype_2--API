import { useState } from "react";
import { useFormOwn } from "../../../hooks/useFormOwn";
import { Form, Row } from "react-bootstrap";
import { AlergenoService } from "../../../services/AlergenosService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import styles from "./FormAlergeno.module.css";
import { ICreateAlergeno } from "../../../types/dtos/alergenos/ICreateAlergeno";

interface FormAlergenoProps {
  onClose: () => void;
}

export const FormAlergeno: React.FC<FormAlergenoProps> = ({ onClose }) => {
  const [imagen, setImagen] = useState<File | null>(null);
  const [failTry, setFailTry] = useState(false);

  const alergenoService = new AlergenoService();

  const { values, handleChanges } = useFormOwn({
    denominacion: "",
    logo: "",
  });

  const { denominacion, logo } = values;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagen(file); // Actualiza el estado con el archivo seleccionado
      const url = URL.createObjectURL(file);
      values.logo = url;
    }
    console.log(imagen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (denominacion === "") {
      setFailTry(true); // Activa el estado de error si el campo está vacío.
      return;
    }

    const newAlergeno: ICreateAlergeno = {
      denominacion: denominacion,
      imagen: { name: denominacion, url: logo },
    };
    try {
      await alergenoService.createAlergeno(newAlergeno);
      onClose();
    } catch (error) {
      console.error("Error al crear la empresa:", error);
      setFailTry(true);
    }
  };

  return (
    <div className={styles.form__container}>
      <h3>Crear Alérgeno</h3>
      <Form
        className={styles.form}
        noValidate
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <Row className={styles.form__input}>
          <Form.Group className={styles.form__group} controlId="nameInput">
            <Form.Label>Nombre</Form.Label>
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
        <Row className={styles.form__input}>
          <Form.Group className={styles.form__groupImg} controlId="imageImput">
            <div className={styles.form__inputImgContainer}>
              <Form.Label className={styles.form__selectImg}>
                Seleccionar Imagen
              </Form.Label>
              <Form.Control
                style={{ display: "none" }}
                required
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className={styles.form__imgView}>
              {values.logo !== "" ? (
                <img
                  src={values.logo}
                  alt="Miniatura"
                  style={{
                    width: "100%",
                    height: "8rem",
                    objectFit: "cover",
                    borderRadius: "1rem",
                  }}
                />
              ) : (
                <FontAwesomeIcon icon={faImage} style={{ fontSize: "4rem" }} />
              )}
            </div>
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
export default FormAlergeno;
