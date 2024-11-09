import { IEmpresa } from "../../../types/IEmpresa";
import styles from "./EmpresaView.module.css";

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
        <p className={styles.Empresaview__txtInfo}>{empresa.sucursales.length}</p>
      </div>
      <button className="add__button" onClick={onClose}>
        Cerrar
      </button>
    </div>
  );
};
