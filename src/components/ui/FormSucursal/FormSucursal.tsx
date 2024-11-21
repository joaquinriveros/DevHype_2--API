import { useEffect, useState } from "react";
import styles from "./FormSucursal.module.css";
import { useFormOwn } from "../../../hooks/useFormOwn";
import { Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faImage } from "@fortawesome/free-solid-svg-icons";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { IPais } from "../../../types/IPais";
import { IProvincia } from "../../../types/IProvincia";
import { ILocalidad } from "../../../types/ILocalidad";
import { PaisService } from "../../../services/PaisService";
import { ProvinciaService } from "../../../services/ProvinciaService";
import { LocalidadService } from "../../../services/LocalidadService";
import { ICreateSucursal } from "../../../types/dtos/sucursal/ICreateSucursal";
import { SucursalService } from "../../../services/SucursalService";

interface FormSucursalProps {
  onClose: () => void; // Prop para cerrar el formulario
  empresa: IEmpresa;
}

export const FormSucursal: React.FC<FormSucursalProps> = ({
  onClose,
  empresa,
}) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [failTry, setFailTry] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [isCasaMatriz, setIsCasaMatriz] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [paises, setPaises] = useState<IPais[]>([]);
  const [provincias, setProvincias] = useState<IProvincia[]>([]);
  const [localidades, setLocalidades] = useState<ILocalidad[]>([]);

  const [pais, setPais] = useState<IPais | null>(null);
  const [provincia, setProvincia] = useState<IProvincia | null>(null);
  const [localidad, setLocalidad] = useState<ILocalidad | null>(null);

  const sucursalService = new SucursalService();

  const paiseService = new PaisService();
  const provinciaService = new ProvinciaService();
  const localidadService = new LocalidadService();

  const { values, handleChanges } = useFormOwn({
    nombre: "",

    hsApertura: "00:00",
    hsCierre: "00:00",

    latitud: "",
    longitud: "",

    nombreCalle: "",
    numeroCalle: "",
    cp: "",
    numeroPiso: "",
    numeroDpto: "",

    urlImg: "",
  });

  const {
    nombre,
    hsApertura,
    hsCierre,

    latitud,
    longitud,

    nombreCalle,
    numeroCalle,
    cp,
    numeroPiso,
    numeroDpto,

    urlImg,
  } = values;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !nombre ||
      !hsApertura ||
      !hsCierre ||
      !pais ||
      !provincia ||
      !localidad ||
      !latitud ||
      !longitud ||
      !nombreCalle ||
      !numeroCalle ||
      !cp ||
      !numeroPiso ||
      !numeroDpto
    ) {
      setFailTry(true);
      return;
    }

    const newSucursal: ICreateSucursal = {
      nombre: nombre,
      horarioApertura: hsApertura,
      horarioCierre: hsCierre,
      esCasaMatriz: isCasaMatriz,
      latitud: Number(latitud),
      longitud: Number(longitud),
      domicilio: {
        calle: nombreCalle,
        numero: Number(numeroCalle),
        cp: Number(cp),
        piso: Number(numeroPiso),
        nroDpto: Number(numeroDpto),
        idLocalidad: localidad.id,
      },
      idEmpresa: empresa.id,
      logo: urlImg,
    };

    await sucursalService.createSucursal(newSucursal);
    setValidated(true);
    onClose();
    console.log(image);
  };

  // handles
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Obtiene el primer archivo
    if (file) {
      setImage(file); // Actualiza el estado con el archivo seleccionado
      const url = URL.createObjectURL(file);
      values.urlImg = url;
    }
  };

  const handleSelectPais = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const result =
      event.target.value === ""
        ? null
        : paises.find((pai) => {
            return pai.id.toString() === event.target.value;
          });
    console.log(result);
    setPais(result || null);
    setProvincia(null);
    setLocalidad(null);
    setLocalidades([]);
  };

  const handleSelectProvincia = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const result =
      event.target.value === ""
        ? null
        : provincias.find((prov) => {
            return prov.id.toString() === event.target.value;
          });
    console.log(result);
    setProvincia(result || null);
  };

  const handleSelectLocalidad = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const result =
      event.target.value === ""
        ? null
        : localidades.find((loc) => {
            return loc.id.toString() === event.target.value;
          });
    console.log(result);
    setLocalidad(result || null);
  };

  // Traemos todos los paises
  const traerPaises = async (): Promise<IPais[]> => {
    try {
      const result = await paiseService.getAllPaises();
      return result || []; // Devuelve los datos obtenidos
    } catch (error) {
      console.error("Error al buscar paises:", error);
      return []; // Devuelve un array vacío en caso de error
    }
  };
  // Traemos todos las provincias
  const traerProvincias = async (idPais: number): Promise<IProvincia[]> => {
    try {
      const result = await provinciaService.getAllProvinciaByPais(idPais);
      return result || []; // Devuelve los datos obtenidos
    } catch (error) {
      console.error("Error al buscar provincias:", error);
      return []; // Devuelve un array vacío en caso de error
    }
  };
  // Traemos todos las localidades
  const traerLocalidades = async (
    idPorvincia: number
  ): Promise<ILocalidad[]> => {
    try {
      const result = await localidadService.getLocalidadesByProvincia(
        idPorvincia
      );
      return result || []; // Devuelve los datos obtenidos
    } catch (error) {
      console.error("Error al buscar provincias:", error);
      return []; // Devuelve un array vacío en caso de error
    }
  };

  const fetchData = async () => {
    try {
      if (paises.length <= 1) {
        const resultPaises = await traerPaises(); // Trae todas las empresas y actualiza el estado
        console.log(resultPaises);
        setPaises(resultPaises);
      }
      if (pais !== null) {
        const resultProvincias = await traerProvincias(pais.id);
        console.log(resultProvincias);
        setProvincias(resultProvincias);
      }
      if (pais !== null && provincia !== null) {
        const resultLocalidades = await traerLocalidades(provincia.id);
        console.log(resultLocalidades);
        setLocalidades(resultLocalidades);
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      setPaises([]); // En caso de error, setea empresa como null
    } finally {
      setIsLoading(false); // Oculta el mensaje de carga al finalizar
    }
  };
  useEffect(() => {
    fetchData();
  }, [pais, provincia]); // Se ejecuta cada vez que cambia el cuit

  return !isLoading ? (
    <div className={styles.form__container}>
      <h3 className={styles.form__tittle}>
        Crear sucursal de {empresa.nombre}
      </h3>
      <Form
        className={styles.form}
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className={styles.form__divisionInput}>
          <div className={styles.form__gridItem}>
            {/* Input para el nombre */}
            <Row className={styles.form__input}>
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
            </Row>

            {/* Input para el horario de apertura */}
            <Row className={styles.form__input}>
              <p className={styles.form__labelHora}>--horario de apertura--</p>
              <Form.Control
                required
                type="time"
                placeholder="Horario de apertura"
                onChange={handleChanges}
                name="hsApertura"
                value={hsApertura}
                className={
                  failTry && !hsApertura
                    ? "form__inputText-fail"
                    : "form__inputText"
                }
              />
            </Row>

            {/* Input para el horario de cierre */}
            <Row className={styles.form__input}>
              <p className={styles.form__labelHora}>--horario de cierre--</p>
              <Form.Control
                required
                type="time"
                placeholder="Horario de cierre"
                onChange={handleChanges}
                name="hsCierre"
                value={hsCierre}
                className={
                  failTry && !hsCierre
                    ? "form__inputText-fail"
                    : "form__inputText"
                }
              />
            </Row>

            {/* Input para casa matriz */}
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
                  onClick={() => setIsCasaMatriz(!isCasaMatriz)}
                >
                  <FontAwesomeIcon
                    icon={faCheck}
                    color="var(--gray-color)"
                    size="sm"
                    style={
                      isCasaMatriz
                        ? { transition: "all .3s ease", opacity: "100%" }
                        : { transition: "all .3s ease", opacity: "0%" }
                    }
                  />
                </div>
                <p className={styles.form__cazaMatrizTxt}>Casa matriz</p>
              </Form.Group>
            </Row>
          </div>
          <div className={styles.form__gridItem}>
            {/* Input para el país */}
            <Row className={styles.form__input}>
              <select
                className="gradiantStyle__button"
                style={
                  pais === null && failTry
                    ? {
                        borderColor: "var(--red-color)",
                        color: "var(--redLite-color)",
                      }
                    : {}
                }
                onChange={handleSelectPais}
              >
                <option style={{ textAlign: "center" }} value="" selected>
                  Seleccionar un pais
                </option>
                {paises.map((pa) => {
                  return (
                    <option
                      key={pa.id}
                      value={pa.id}
                      className={styles.form__inputOption}
                    >
                      {pa.nombre}
                    </option>
                  );
                })}
              </select>
            </Row>

            {/* Input para la provincia */}
            <Row className={styles.form__input}>
              <select
                disabled={pais === null} // Deshabilitar mientras la condición no se cumpla
                className={`gradiantStyle__button ${
                  pais === null ? styles.form__inputDisable : ""
                }`}
                style={
                  provincia === null && failTry
                    ? {
                        borderColor: "var(--red-color)",
                        color: "var(--redLite-color)",
                      }
                    : {}
                }
                onChange={handleSelectProvincia}
              >
                <option style={{ textAlign: "center" }} value="" selected>
                  Seleccionar una provincia
                </option>
                {provincias.map((prov) => {
                  return (
                    <option
                      key={prov.id}
                      value={prov.id}
                      className={styles.form__inputOption}
                    >
                      {prov.nombre.length > 20
                        ? `${prov.nombre.substring(0, 30)}...`
                        : prov.nombre}
                    </option>
                  );
                })}
              </select>
            </Row>

            {/* Input para la localidad */}
            <Row className={styles.form__input}>
              <select
                disabled={provincia === null} // Deshabilitar mientras la condición no se cumpla
                className={`gradiantStyle__button ${
                  provincia === null ? styles.form__inputDisable : ""
                }`}
                style={
                  localidad === null && failTry
                    ? {
                        borderColor: "var(--red-color)",
                        color: "var(--redLite-color)",
                      }
                    : {}
                }
                onChange={handleSelectLocalidad}
              >
                <option style={{ textAlign: "center" }} value="All" selected>
                  Seleccionar una localidad
                </option>
                {localidades.map((loc) => {
                  return (
                    <option
                      key={loc.id}
                      value={loc.id}
                      className={styles.form__inputOption}
                    >
                      {loc.nombre.length > 20
                        ? `${loc.nombre.substring(0, 30)}...`
                        : loc.nombre}
                    </option>
                  );
                })}
              </select>
            </Row>

            {/* Input para la latitud */}
            <Row className={styles.form__input}>
              <Form.Control
                required
                type="number"
                placeholder="Latitud"
                onChange={handleChanges}
                name="latitud"
                value={latitud}
                className={
                  failTry && !latitud
                    ? "form__inputText-fail"
                    : "form__inputText"
                }
              />
            </Row>

            {/* Input para la longitud */}
            <Row className={styles.form__input}>
              <Form.Control
                required
                type="number"
                placeholder="Longitud"
                onChange={handleChanges}
                name="longitud"
                value={longitud}
                className={
                  failTry && !longitud
                    ? "form__inputText-fail"
                    : "form__inputText"
                }
              />
            </Row>
          </div>
          <div className={styles.form__gridItem}>
            {/* Input para el nombre de la calle */}
            <Row className={styles.form__input}>
              <Form.Control
                required
                type="text"
                placeholder="Nombre de la calle"
                onChange={handleChanges}
                name="nombreCalle"
                value={nombreCalle}
                className={
                  failTry && !nombreCalle
                    ? "form__inputText-fail"
                    : "form__inputText"
                }
              />
            </Row>

            {/* Input para el número de la calle */}
            <Row className={styles.form__input}>
              <Form.Control
                required
                type="number"
                placeholder="Número de calle"
                onChange={handleChanges}
                name="numeroCalle"
                value={numeroCalle}
                className={
                  failTry && !numeroCalle
                    ? "form__inputText-fail"
                    : "form__inputText"
                }
              />
            </Row>

            {/* Input para el código postal */}
            <Row className={styles.form__input}>
              <Form.Control
                required
                type="number"
                placeholder="Código postal"
                onChange={handleChanges}
                name="cp"
                value={cp}
                className={
                  failTry && !cp ? "form__inputText-fail" : "form__inputText"
                }
              />
            </Row>

            {/* Input para el número de piso */}
            <Row className={styles.form__input}>
              <Form.Control
                required
                type="number"
                placeholder="Número de piso"
                onChange={handleChanges}
                name="numeroPiso"
                value={numeroPiso}
                className={
                  failTry && !numeroPiso
                    ? "form__inputText-fail"
                    : "form__inputText"
                }
              />
            </Row>

            {/* Input para el número de departamento */}
            <Row className={styles.form__input}>
              <Form.Control
                required
                type="number"
                placeholder="Número de departamento"
                onChange={handleChanges}
                name="numeroDpto"
                value={numeroDpto}
                className={
                  failTry && !numeroDpto
                    ? "form__inputText-fail"
                    : "form__inputText"
                }
              />
            </Row>
          </div>
        </div>
        <Row className={styles.form__inputImg}>
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
          Error de carga
        </p>
      </Form>
    </div>
  ) : null;
};
