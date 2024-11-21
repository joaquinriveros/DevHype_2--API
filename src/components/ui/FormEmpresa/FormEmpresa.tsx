import { useState } from "react";
import { Form, Row } from "react-bootstrap";
import { useFormOwn } from "../../../hooks/useFormOwn";
import styles from "./FormEmprese.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { ICreateEmpresaDto } from "../../../types/dtos/empresa/ICreateEmpresaDto";
import { EmpresaService } from "../../../services/EmpresaService";
import { ImageService } from "../../../services/ImageService";

interface FormEmpresaProps {
  onClose: () => void; // Prop para cerrar el formulario
}

export const FormEmpresa: React.FC<FormEmpresaProps> = ({ onClose }) => {
  const [failTry, setFailTry] = useState<boolean>(false);
  const [urlResponce, setUrlResponce] = useState<string | null>(null)


  const empresaService = new EmpresaService();
  const imageService = new ImageService("images");

  const { values, handleChanges } = useFormOwn({
    name: "",
    razonSocial: "",
    cuit: "",
  });

  const { name, razonSocial, cuit } = values;

  // handle imagen
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Obtiene el primer archivo
    if(file ){
      const formData = new FormData();
      formData.append("uploads", file); // Agregamos el archivo al FormData para enviarlo

      const data = await imageService.uploadImage(formData);
      console.log(data)
      setUrlResponce(data)
    }
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !razonSocial.trim() || !cuit) {
      setFailTry(true);
      return;
    }

    const newEmpresa: ICreateEmpresaDto = {
      nombre: name,
      razonSocial: razonSocial,
      cuit: Number(cuit),
      logo: urlResponce || null, // Aseguramos que el logo sea nulo si no hay imagen cargada
    };

    try {
      await empresaService.createEmpresa(newEmpresa);
      onClose();
    } catch (error) {
      console.error("Error al crear la empresa:", error);
      setFailTry(true);
    }
  };

  return (
    <div className={styles.form__container}>
      <h3>Crear una Empresa</h3>
      <Form
        className={styles.form}
        noValidate
        onSubmit={handleSubmitForm}
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
              placeholder="Nombre"
              onChange={handleChanges}
              name="name"
              value={name}
            />
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
                onChange={handleImageChange} // Llama al hook useImage
              />
            </div>
            <div className={styles.form__imgView}>
              {urlResponce ? (
                <img
                  src={urlResponce}
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
          <button
            className="add__button"
            onClick={(event) => {
              onClose();
              event.preventDefault();
            }}
          >
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
