import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import styles from "./FormEmprese.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

interface FormEmpresaProps {
  onClose: () => void; // Prop para cerrar el formulario
}

export const FormEmpresa: React.FC<FormEmpresaProps> = ({ onClose }) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null); // Estado para almacenar la imagen seleccionada
  const [imageUrl, setImageUrl] = useState<string | null>(null); // Estado para almacenar la URL de la imagen

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Obtiene el primer archivo
    if (file) {
      setImage(file); // Actualiza el estado con el archivo seleccionado
      const url = URL.createObjectURL(file); // Crea una URL de objeto para la miniatura
      setImageUrl(url); // Actualiza el estado con la URL de la imagen
    }
  };

  return (
    <div className={styles.form__container}>
      <h3>Crear una Empresa</h3>
      <Form
        className={styles.form}
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Row className={styles.form__input}>
          <Form.Group
            className={styles.form__group}
            controlId="validationCustom01"
          >
            <Form.Label>Nombre</Form.Label>
            <input
              className={styles.form__inputText}
              required
              type="text"
              placeholder="nombre"
              defaultValue=""
            />
            <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className={styles.form__input}>
          <Form.Group
            className={styles.form__group}
            controlId="validationCustom01"
          >
            <Form.Label>Razón social</Form.Label>
            <input
              className={styles.form__inputText}
              required
              type="text"
              placeholder="Razon social"
              defaultValue=""
            />
            <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className={styles.form__input}>
          <Form.Group
            className={styles.form__group}
            controlId="validationCustom01"
          >
            <Form.Label>CUIT</Form.Label>
            <input
              className={styles.form__inputText}
              required
              type="text"
              placeholder="CUIT"
              defaultValue=""
            />
            <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className={styles.form__input}>
          <Form.Group className={styles.form__groupImg} controlId="imageUpload">
            <div className={styles.form__inputImgContainer}>
              <Form.Label className="form__selectImg">
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
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Miniatura"
                  style={{ width: "100%", height: "8rem", objectFit: 'cover', borderRadius: '1rem' }}
                />
              ) : <FontAwesomeIcon icon={faImage} style={{fontSize: '4rem'}} />}
            </div>
          </Form.Group>
        </Row>

        <div className={styles.form__buttonContainer}>
          <Button variant="outline-success" type="submit">
            Crear
          </Button>
          <Button variant="outline-danger" onClick={onClose} className="ms-2">
            Cerrar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FormEmpresa;
