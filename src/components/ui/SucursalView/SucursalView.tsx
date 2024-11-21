import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./SucursalView.module.css";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";

interface SucuersalViewProps {
  sucursal: ISucursal;
  onClose: () => void; // Prop para cerrar el formulario
}
export const SucuersalView: React.FC<SucuersalViewProps> = ({
  sucursal,
  onClose,
}) => {
  const [isImageError, setIsImageError] = useState(false);

  return (
    <div className={styles.Sucursalview__container}>
      <h3> {sucursal.nombre}</h3>
      <div className={styles.Sucursalview__infoContainer}>
        <p className={styles.Sucursalview__txtCategory}>
          <b>Empresa:</b>
        </p>
        <p className={styles.Sucursalview__txtInfo}>{sucursal.empresa.nombre}</p>
        <p className={styles.Sucursalview__txtCategory}>
          <b>Direccion:</b>
        </p>
        <p className={styles.Sucursalview__txtInfo}>{`${sucursal.domicilio.calle} ${sucursal.domicilio.numero}, ${sucursal.domicilio.localidad.nombre}, ${sucursal.domicilio.localidad.provincia.nombre}, ${sucursal.domicilio.localidad.provincia.pais.nombre}, ${sucursal.domicilio.cp} `}</p>
        <p className={styles.Sucursalview__txtCategory}>
          <b>Casa Matríz</b>
        </p>
        <p className={styles.Sucursalview__txtInfo}>
          {sucursal.esCasaMatriz ? "Es casa Matríz": "No es casa Matríz"}
        </p>
        <p className={styles.Sucursalview__txtCategory}>
          <b>hs Apertura</b>
        </p>
        <p className={styles.Sucursalview__txtInfo}>
          {sucursal.horarioApertura}
        </p>
        <p className={styles.Sucursalview__txtCategory}>
          <b>hs cierre</b>
        </p>
        <p className={styles.Sucursalview__txtInfo}>
          {sucursal.horarioCierre}
        </p>
        <div className={styles.Sucursalview__img}>
        {isImageError || !sucursal.logo ? (
        <FontAwesomeIcon icon={faImage} style={{ fontSize: "4rem" }} />
      ) : (
        <img
          src={sucursal.logo}
          style={{
            width: "100%",
            height: "8rem",
            objectFit: "cover",
            borderRadius: "1rem",
          }}
          alt="Empresa img"
          onError={() => setIsImageError(true)} // Si hay un error, activa el estado
        />
      )}
        </div>
      </div>
      <button className="add__button" onClick={onClose}>
        Cerrar
      </button>
    </div>
  );
};
