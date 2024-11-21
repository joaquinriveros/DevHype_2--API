import { FC, useEffect, useState } from "react";
import styles from "./FormProducto.module.css";
import { ProductoService } from "../../../services/ProductoService";
import { useFormOwn } from "../../../hooks/useFormOwn";
import { ICreateProducto } from "../../../types/dtos/productos/ICreateProducto";
import { ICategorias } from "../../../types/dtos/categorias/ICategorias";
import { Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faImage } from "@fortawesome/free-solid-svg-icons";
import { IAlergenos } from "../../../types/dtos/alergenos/IAlergenos";
import { AlergenoService } from "../../../services/AlergenosService";
import { ImageService } from "../../../services/ImageService";

interface FormProductoProps {
  onClose: () => void; // Prop para cerrar el formulario
  categorias: ICategorias[];
}

export const FormProducto: FC<FormProductoProps> = ({
  onClose,
  categorias,
}) => {
  const [failTry, setFailTry] = useState<boolean>(false);
  const [urlResponce, setUrlResponce] = useState<string | null>(null);

  const [isHabilitado, setIsHabilitado] = useState<boolean>(false);
  const [categoria, setCategoria] = useState<ICategorias | null>(null);
  const [alergenosId, setAlergenosId] = useState<number[]>([]);
  const [alergenos, setAlergenos] = useState<IAlergenos[]>([]);

  const [selectAlergenosPopUp, setSelectAlergenosPopUp] =
    useState<boolean>(false);

  const productoService = new ProductoService();
  const alergenosService = new AlergenoService();
  const imageService = new ImageService("images");

  const { values, handleChanges } = useFormOwn({
    denominacion: "",
    precioVenta: "",
    descripcion: "",
    codigo: "",
  });

  const { denominacion, precioVenta, descripcion, codigo } = values;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(denominacion);

    if (
      !denominacion ||
      !precioVenta ||
      !descripcion ||
      !codigo ||
      !categoria
    ) {
      setFailTry(true);
      return;
    }

    const newProducto: ICreateProducto = {
      denominacion: denominacion,
      precioVenta: Number(precioVenta),
      descripcion: descripcion,
      codigo: codigo,
      habilitado: isHabilitado,
      idCategoria: categoria.id,
      idAlergenos: alergenosId,
      imagenes: [{ name: denominacion, url: urlResponce ? urlResponce : "" }],
    };

    console.log(newProducto);

    try {
      await productoService.createProducto(newProducto);
      onClose();
    } catch (error) {
      console.error("Error al crear el producto:", error);
      setFailTry(true);
    }
  };

  // handles
  const handleSelecCategoria = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const result =
      event.target.value === ""
        ? null
        : categorias.find((cat) => {
            return cat.id.toString() === event.target.value;
          });
    setCategoria(result || null);
  };

  // handle imagen
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]; // Obtiene el primer archivo
    if (file) {
      const formData = new FormData();
      formData.append("uploads", file); // Agregamos el archivo al FormData para enviarlo

      const data = await imageService.uploadImage(formData);
      console.log(data);
      setUrlResponce(data);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    setAlergenosId(
      (prevSelected) =>
        e.target.checked
          ? [...prevSelected, value] // Si está marcado, agregar el valor
          : prevSelected.filter((id) => id !== value) // Si está desmarcado, eliminar el valor
    );
  };

  // Traer alergenos
  const traerAlergenos = async (): Promise<IAlergenos[]> => {
    try {
      const result = await alergenosService.getAllAlergenos();
      return result || [];
    } catch (error) {
      return [];
    }
  };

  // Fetch Empresa y Sucursal
  const fetchData = async () => {
    try {
      const resultAlergenos = await traerAlergenos();

      setAlergenos(resultAlergenos);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      setAlergenos([]);
    }
    return;
  };

  // Efectos
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.form__container}>
      {selectAlergenosPopUp && (
        <div className="overlay">
          <div className={styles.form__popUpSelect}>
            <h2>Seleccione los alergenos</h2>
            <div className={styles.form__popUpAlergenosContainer}>
              {alergenos.length > 0 ? (
                alergenos.map((ale) => (
                  <div className={styles.form__containerCheck} key={ale.id}>
                    <input
                      className={styles.form__popUpAlergenosCheck}
                      type="checkbox"
                      value={ale.id}
                      onChange={(e) => handleCheckboxChange(e)}
                    />
                    <p style={{ margin: "0px" }}>
                      {ale.denominacion} {/* Muestra el nombre del alérgeno */}
                    </p>
                  </div>
                ))
              ) : (
                <h3>No hay alergenos</h3>
              )}
            </div>
            <button
              className="add__button-green"
              type="button"
              onClick={() => {
                setSelectAlergenosPopUp(!selectAlergenosPopUp);
              }}
            >
              Guardar
            </button>
          </div>
        </div>
      )}
      <h3>Crear un Producto</h3>
      <Form
        className={styles.form}
        noValidate
        onSubmit={handleSubmit} // Asegura que el evento esté en el formulario
        autoComplete="off"
      >
        <div className={styles.form__grid}>
          <div className={styles.form__gridItem}>
            {/* Input para denominacion */}
            <Row className={styles.form__input}>
              <Form.Group className={styles.form__group} controlId="nameImput">
                <Form.Label>Denominación</Form.Label>
                <Form.Control
                  className={`${
                    failTry && denominacion === ""
                      ? "form__inputText-fail"
                      : "form__inputText"
                  }`}
                  required
                  type="text"
                  placeholder="Denominación"
                  onChange={handleChanges}
                  name="denominacion"
                  value={denominacion}
                />
              </Form.Group>
            </Row>
            {/* Input para el categoria */}
            <Row className={styles.form__input} style={{ marginTop: "1rem" }}>
              <div className={styles.form__group}>
                <select
                  className="gradiantStyle__button"
                  style={
                    categoria === null && failTry
                      ? {
                          borderColor: "var(--red-color)",
                          color: "var(--redLite-color)",
                        }
                      : {}
                  }
                  onChange={handleSelecCategoria}
                >
                  <option style={{ textAlign: "center" }} value="" selected>
                    Seleccionar una categoria
                  </option>
                  {categorias.map((cat) => {
                    return (
                      <option
                        key={cat.id}
                        value={cat.id}
                        className={styles.form__inputOption}
                      >
                        {cat.denominacion.length > 20
                          ? `${cat.denominacion.substring(0, 30)}...`
                          : cat.denominacion}
                      </option>
                    );
                  })}
                </select>
              </div>
            </Row>
            {/* Input para el precio */}
            <Row className={styles.form__input}>
              <Form.Group
                className={styles.form__group}
                controlId="precioInput"
              >
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  className={`${
                    failTry && precioVenta === ""
                      ? "form__inputText-fail"
                      : "form__inputText"
                  }`}
                  required
                  type="number"
                  placeholder="Precio"
                  onChange={handleChanges}
                  name="precioVenta"
                  value={precioVenta}
                />
              </Form.Group>
            </Row>
            {/* Input para el codigo */}
            <Row className={styles.form__input}>
              <Form.Group className={styles.form__group} controlId="codigoIput">
                <Form.Label>Cidigo</Form.Label>
                <Form.Control
                  className={`${
                    failTry && codigo === ""
                      ? "form__inputText-fail"
                      : "form__inputText"
                  }`}
                  required
                  type="number"
                  placeholder="Codigo"
                  onChange={handleChanges}
                  name="codigo"
                  value={codigo}
                />
              </Form.Group>
            </Row>
            <Row className={styles.form__input}>
              <Form.Group
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: ".5rem",
                }}
              >
                <div
                  className={styles.form__checkBox}
                  onClick={() => setIsHabilitado(!isHabilitado)}
                >
                  <FontAwesomeIcon
                    icon={faCheck}
                    color="var(--gray-color)"
                    size="sm"
                    style={
                      isHabilitado
                        ? { transition: "all .3s ease", opacity: "100%" }
                        : { transition: "all .3s ease", opacity: "0%" }
                    }
                  />
                </div>
                <p className={styles.form__checkBoxTxt}>Habilitado</p>
              </Form.Group>
            </Row>
          </div>
          <div className={styles.form__gridItem}>
            {/* Input para la decripcion */}
            <Row className={styles.form__input}>
              <Form.Group
                className={styles.form__group}
                controlId="precioInput"
              >
                <Form.Label>Descripción</Form.Label>
                <textarea
                  className="gradiantStyle__button"
                  style={
                    descripcion === null && failTry
                      ? {
                          borderColor: "var(--red-color)",
                          color: "var(--redLite-color)",
                          textAlign: "left",
                        }
                      : { textAlign: "left" }
                  }
                  rows={4}
                  cols={50}
                  name="descripcion"
                  value={descripcion}
                  onChange={handleChanges}
                  placeholder="Escribe aquí..."
                />
              </Form.Group>
            </Row>
            <Row className={styles.form__input}>
              <Form.Group
                className={styles.form__group}
                controlId="precioInput"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button
                  className="gradiantStyle__button"
                  type="button"
                  style={{ width: "16rem" }}
                  onClick={() => setSelectAlergenosPopUp(!selectAlergenosPopUp)}
                >
                  Seleccinar alergenos
                </button>
              </Form.Group>
            </Row>
            <Row className={styles.form__input}>
              <Form.Group
                className={styles.form__groupImg}
                controlId="imageImput"
              >
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
                    <FontAwesomeIcon
                      icon={faImage}
                      style={{ fontSize: "4rem" }}
                    />
                  )}
                </div>
              </Form.Group>
            </Row>
          </div>
        </div>
      </Form>
      <div>
        <div className={styles.form__buttonContainer}>
          <button
            className="add__button-green"
            type="submit"
            onClick={handleSubmit}
          >
            Crear
          </button>
          <button className="add__button" type="button" onClick={onClose}>
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
      </div>
    </div>
  );
};
