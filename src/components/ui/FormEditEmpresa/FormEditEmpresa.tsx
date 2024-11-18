import { useState } from "react";
import { Form, Row } from "react-bootstrap";
import { useForm } from "../../../hooks/useForm";
import styles from "./FormEditEmprese.module.css";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { IUpdateEmpresaDto } from "../../../types/dtos/empresa/IUpdateEmpresaDto";
import { EmpresaService } from "../../../services/EmpresaService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

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
  const [image, setImage] = useState<File | null>(null);

  const empresaService = new EmpresaService();

  const { values, handleChanges } = useForm({
    nombre: empresa.nombre,
    razonSocial: empresa.razonSocial,
    cuit: empresa.cuit.toString(),
    logo: empresa.logo === null ? "" : empresa.logo,
  });

  const { nombre, razonSocial, cuit, logo } = values;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Formulario enviado con:", { nombre, razonSocial, cuit, logo }); // visualizacion del estado

    if (!nombre.trim() || !razonSocial.trim() || !cuit) {
      setFailTry(true);
      return;
    }

    const newUpdateEmpresa: IUpdateEmpresaDto = {
      id: empresa.id,
      nombre: nombre,
      razonSocial: razonSocial,
      cuit: Number(cuit),
      logo: logo === "" ? null : logo,
    };

    empresa.nombre = nombre;
    empresa.razonSocial = razonSocial;
    empresa.cuit = Number(cuit);
    empresa.logo = logo === "" ? null : logo;

    try {
      empresaService.updateEmpresa(empresa.id, newUpdateEmpresa);
      setValidated(true);
      onClose();
    } catch (error) {
      console.error("Error al crear la empresa:", error);
      setFailTry(true);
    }
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Obtiene el primer archivo
    if (file) {
      setImage(file); // Actualiza el estado con el archivo seleccionado
      const url = URL.createObjectURL(file);
      values.logo = url;
    }
    console.log(image);
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
            controlId="razonSocialImput"
          >
            <Form.Label>Razón Social</Form.Label>
            <Form.Control
              className={`${
                failTry && razonSocial === ""
                  ? "form__inputText-fail"
                  : "form__inputText"
              }`}
              required
              type="text"
              placeholder="Razón Social"
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
                failTry && cuit === ""
                  ? "form__inputText-fail"
                  : "form__inputText"
              }`}
              required
              type="number"
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
              {values.logo !== "" ? (
                <img
                  src={logo}
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

export default FormEditEmpresa;
