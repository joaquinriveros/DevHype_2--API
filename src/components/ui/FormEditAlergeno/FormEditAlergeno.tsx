import { useState } from "react";
import { Form, Row } from "react-bootstrap";
import { useForm } from "../../../hooks/useForm";
import styles from "./FormEditAlergeno.module.css";
import { IAlergenos } from "../../../types/dtos/alergenos/IAlergenos";
import { IUpdateAlergeno } from "../../../types/dtos/alergenos/IUpdateAlergeno";
import { AlergenoService } from "../../../services/AlergenosService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

interface FormEditAlergenoProps {
  alergeno: IAlergenos;
  onClose: () => void; // Prop para cerrar el formulario
}

export const FormEditAlergeno: React.FC<FormEditAlergenoProps> = ({
  alergeno,
  onClose,
}) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [failTry, setFailTry] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const alergenoService = new AlergenoService();

  const { values, handleChanges } = useForm({
    denominacion: alergeno.denominacion,
    imagen: alergeno.imagen?.url || "", // Inicializamos con la URL de la imagen si existe.
  });

  const { denominacion, imagen } = values;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!denominacion.trim()) {
      setFailTry(true);
      return;
    }

    const newUpdateAlergeno: IUpdateAlergeno = {
      id: alergeno.id,
      denominacion: denominacion,
      imagen: imagen
        ? {
            name: imageFile?.name || "default-name",
            url: imagen,
          }
        : null, // Construimos el objeto IImagen o enviamos null.
    };

    try {
      await alergenoService.updateAlergeno(alergeno.id, newUpdateAlergeno);
      setValidated(true);
      onClose();
    } catch (error) {
      console.error("Error al actualizar el alergeno:", error);
      setFailTry(true);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      values.imagen = url; // Actualizamos la URL en el estado del formulario.
    }
  };

  return (
    <div className={styles.form__container}>
      <h3>Editar Alergeno</h3>
      <Form
        className={styles.form}
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <Row className={styles.form__input}>
          <Form.Group className={styles.form__group} controlId="nameInput">
            <Form.Label>Denominación</Form.Label>
            <Form.Control
              className={`${
                failTry && denominacion === "" ? "form__inputText-fail" : "form__inputText"
              }`}
              required
              type="text"
              placeholder="Denominación"
              onChange={handleChanges}
              name="denominacion"
              value={denominacion}
            />
            <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className={styles.form__input}>
          <Form.Group className={styles.form__groupImg} controlId="imageInput">
            <div className={styles.form__inputImgContainer}>
              <Form.Label className={styles.form__selectImg}>Seleccionar Imagen</Form.Label>
              <Form.Control
                style={{ display: "none" }}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className={styles.form__imgView}>
              {imagen ? (
                <img
                  src={imagen}
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
            Guardar
          </button>
          <button className="add__button" onClick={onClose}>
            Cerrar
          </button>
        </div>
        <p
          className={`${
            failTry ? styles.login__errorMesajeVisivility : styles.login__errorMesaje
          } `}
        >
          Error al guardar!
        </p>
      </Form>
    </div>
  );
};

export default FormEditAlergeno;
