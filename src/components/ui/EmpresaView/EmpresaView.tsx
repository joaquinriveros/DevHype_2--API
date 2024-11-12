import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IEmpresa } from "../../../types/IEmpresa";
import styles from "./EmpresaView.module.css";
import { faImage } from "@fortawesome/free-solid-svg-icons";

interface EmpresaViewProps {
  empresa: IEmpresa;
  onClose: () => void; // Prop para cerrar el formulario
}
export const EmpresaView: React.FC<EmpresaViewProps> = ({
  empresa,
  onClose,
}) => {
  return (
    <div className={styles.Empresaview__container}>
      <h3> {empresa.name}</h3>
      <div className={styles.Empresaview__infoContainer}>
        <p className={styles.Empresaview__txtCategory}>
          <b>Descripcion:</b>
        </p>
        <p className={styles.Empresaview__txtInfo}>{empresa.description}</p>
        <p className={styles.Empresaview__txtCategory}>
          <b>CUIT:</b>
        </p>
        <p className={styles.Empresaview__txtInfo}>{empresa.cuit}</p>
        <p className={styles.Empresaview__txtCategory}>
          <b>Sucursales:</b>
        </p>
        <p className={styles.Empresaview__txtInfo}>
          {empresa.sucursales.length}
        </p>
        <div className={styles.Empresaview__img}>
        {empresa.urlImg !== "" ? (
                <img
                  src={empresa.urlImg}
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
      </div>
      <button className="add__button" onClick={onClose}>
        Cerrar
      </button>
    </div>
  );
};
