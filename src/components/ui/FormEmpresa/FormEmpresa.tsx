import { useState } from "react";
import { Form, Row } from "react-bootstrap";
import { useForm } from "../../../hooks/useForm";
import styles from "./FormEmprese.module.css";
import { IEmpresa } from "../../../types/IEmpresa";
import { empresas } from "../../../data/empresas";

interface FormEmpresaProps {
  onClose: () => void; // Prop para cerrar el formulario
}

export const FormEmpresa: React.FC<FormEmpresaProps> = ({ onClose }) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [failTry, setFailTry] = useState<boolean>(false);

  const { values, handleChanges } = useForm({
    name: "",
    description: "",
    cuit: "",
  });

  const { name, description, cuit } = values;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !cuit) {
      setFailTry(true);
      return;
    }

    const newEmpresa: IEmpresa = { name: name, description: description, cuit: cuit, sucursales: [] };
    empresas.push(newEmpresa);

    setValidated(true);
    onClose();
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
