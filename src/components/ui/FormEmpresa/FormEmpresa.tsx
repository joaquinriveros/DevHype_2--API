import { useState } from "react";
import { Form, Row } from "react-bootstrap";
import { useForm } from "../../../hooks/useForm";
import styles from "./FormEmprese.module.css";
import { IEmpresa } from "../../../types/IEmpresa";
import { empresas } from "../../../data/empresas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

interface FormEmpresaProps {
  onClose: () => void; // Prop para cerrar el formulario
}

export const FormEmpresa: React.FC<FormEmpresaProps> = ({ onClose }) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [failTry, setFailTry] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);


  const { values, handleChanges } = useForm({
    name: "",
    description: "",
    cuit: "",
    urlImg: "",
  });

  const { name, description, cuit, urlImg } = values;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !cuit || !urlImg) {
      setFailTry(true);
      return;
    }

    const newEmpresa: IEmpresa = { name: name, description: description, cuit: cuit, urlImg: urlImg, sucursales: [] };
    empresas.push(newEmpresa);

    setValidated(true);
    onClose();
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Obtiene el primer archivo
    if (file) {
      setImage(file); // Actualiza el estado con el archivo seleccionado
      const url = URL.createObjectURL(file);
      values.urlImg = url;
    }
    console.log(image)
  };

  return (
    <div className={styles.form__container}>
      <h3>Crear una Empresa</h3>
      <Form
        className={styles.form}
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <Row className={styles.form__input}>
          <Form.Group className={styles.form__group} controlId="nameImput">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              className={`${
                failTry && name === ""
                  ? "form__inputText-fail"
                  : "form__inputText"
              }`}
              required
              type="text"
              placeholder="nombre"
              onChange={handleChanges}
              name="name"
              value={name}
            />
            <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className={styles.form__input}>
          <Form.Group
            className={styles.form__group}
            controlId="descriptionImput"
          >
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              className={`${
                failTry && description === ""
                  ? "form__inputText-fail"
                  : "form__inputText"
              }`}
              required
              type="text"
              placeholder="Descripción"
              onChange={handleChanges}
              name="description"
              value={description}
            />
            <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className={styles.form__input}>
          <Form.Group className={styles.form__group} controlId="cuitImput">
            <Form.Label>CUIT</Form.Label>
            <Form.Control
              className={`${
                failTry && cuit === ""
                  ? "form__inputText-fail"
                  : "form__inputText"
              }`}
              required
              type="text"
              placeholder="CUIT"
              onChange={handleChanges}
              name="cuit"
              value={cuit}
            />
            <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
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
                accept="image/*" // Acepta solo imágenes
                onChange={handleImageChange} // Maneja el cambio en el input
              />
            </div>
            <div className={styles.form__imgView}>
              {values.urlImg !== "" ? (
                <img
                  src={urlImg}
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
          <button className="add__button" onClick={onClose}>
            Cerrar
          </button>
        </div>
        <p
          className={`${
            failTry
              ? styles.login__errorMesajeVisivility
              : styles.login__errorMesaje
          } `}
        >
          Error de Carga!
        </p>
      </Form>
    </div>
  );
};

export default FormEmpresa;
