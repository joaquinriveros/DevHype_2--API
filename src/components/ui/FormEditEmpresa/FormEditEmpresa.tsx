import { useState } from "react";
import { Form, Row } from "react-bootstrap";
import { useForm } from "../../../hooks/useForm";
import styles from "./FormEditEmprese.module.css";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";

interface FormEditEmpresaProps {
  empresa: IEmpresa;
  onClose: () => void; // Prop para cerrar el formulario
}

export const FormEditEmpresa: React.FC<FormEditEmpresaProps> = ({
  empresa,
  onClose,
}) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [failTry, setFailTry] = useState<boolean>(false);

  const { values, handleChanges } = useForm({
    nombre: empresa.nombre,
    razonSocial: empresa.razonSocial,
    cuit: empresa.cuit,
  });

  const { nombre, razonSocial, cuit } = values;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !razonSocial || !cuit) {
      setFailTry(true);
      return;
    }

    empresa.nombre = nombre;
    empresa.razonSocial = razonSocial;
    empresa.cuit = cuit;

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
                failTry && nombre === ""
                  ? "form__inputText-fail"
                  : "form__inputText"
              }`}
              required
              type="text"
              placeholder="nombre"
              onChange={handleChanges}
              name="nombre"
              value={nombre}
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
                failTry && razonSocial === ""
                  ? "form__inputText-fail"
                  : "form__inputText"
              }`}
              required
              type="text"
              placeholder="Razon Social"
              onChange={handleChanges}
              name="razonSocial"
              value={razonSocial}
            />
            <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className={styles.form__input}>
          <Form.Group className={styles.form__group} controlId="cuitImput">
            <Form.Label>CUIT</Form.Label>
            <Form.Control
              className={`${
                failTry && cuit === 0
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
            Aplicar
          </button>
          <button className="add__button" onClick={onClose}>
            Cancelar
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

export default FormEditEmpresa;
