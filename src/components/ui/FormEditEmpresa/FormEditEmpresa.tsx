import { useState } from "react";
import { Form, Row } from "react-bootstrap";
import { useFormOwn } from "../../../hooks/useFormOwn";
import styles from "./FormEditEmprese.module.css";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { IUpdateEmpresaDto } from "../../../types/dtos/empresa/IUpdateEmpresaDto";
import { EmpresaService } from "../../../services/EmpresaService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { ImageService } from "../../../services/ImageService";

interface FormEditEmpresaProps {
  empresa: IEmpresa;
  onClose: () => void; // Prop para cerrar el formulario
}

export const FormEditEmpresa: React.FC<FormEditEmpresaProps> = ({
  empresa,
  onClose,
}) => {
  const [failTry, setFailTry] = useState<boolean>(false);
  const [urlResponce, setUrlResponce] = useState<string | null>(empresa.logo)

  const empresaService = new EmpresaService();
  const imageService = new ImageService("images");

  const { values, handleChanges } = useFormOwn({
    nombre: empresa.nombre,
    razonSocial: empresa.razonSocial,
    cuit: empresa.cuit.toString(),
  });

  const { nombre, razonSocial, cuit } = values;

  //handle imagen
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !razonSocial.trim() || !cuit) {
      setFailTry(true);
      return;
    }

    const newUpdateEmpresa: IUpdateEmpresaDto = {
      id: empresa.id,
      nombre: nombre,
      razonSocial: razonSocial,
      cuit: Number(cuit),
      logo: urlResponce,
    };

    try {
      await empresaService.updateEmpresa(empresa.id, newUpdateEmpresa);
      onClose();
    } catch (error) {
      console.error("Error al editar la empresa:", error);
      setFailTry(true);
    }
  };

  return (
    <div className={styles.form__container}>
      <h3>Editar Empresa</h3>
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
                failTry && nombre === ""
                  ? "form__inputText-fail"
                  : "form__inputText"
              }`}
              required
              type="text"
              placeholder="Nombre"
              onChange={handleChanges}
              name="nombre"
              value={nombre}
            />
          </Form.Group>
        </Row>
        <Row className={styles.form__input}>
          <Form.Group className={styles.form__group} controlId="razonSocialInput">
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
          <Form.Group className={styles.form__group} controlId="cuitInput">
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
          <Form.Group className={styles.form__groupImg} controlId="imageInput">
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
              {urlResponce ? (
                <img
                  src={urlResponce}
                  alt="Logo Actual"
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
        {failTry && (
          <p className={styles.login__errorMessage}>Error al guardar cambios!</p>
        )}
      </Form>
    </div>
  );
};

export default FormEditEmpresa;
