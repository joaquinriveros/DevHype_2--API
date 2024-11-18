import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./EmpresaView.module.css";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { useEffect, useState } from "react";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { SucursalService } from '../../../services/SucursalService';

interface EmpresaViewProps {
  empresa: IEmpresa;
  onClose: () => void; // Prop para cerrar el formulario
}
export const EmpresaView: React.FC<EmpresaViewProps> = ({
  empresa,
  onClose,
}) => {
  const [isImageError, setIsImageError] = useState(false);
  const [sucursales, setSucursales] = useState<ISucursal[]>([])
  const sucursalService = new SucursalService()

  //traemos las sucursales
  const traerSucursales = async (idEmpresa: number): Promise<ISucursal[]> => {
    try {
      const result = await sucursalService.getSucursalesPorEmpresa(idEmpresa);
      return result || []; // Devuelve los datos obtenidos
    } catch (error) {
      console.error("Error al buscar sucursales:", error);
      return []; // Devuelve un array vacío en caso de error
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultSucursales =  await traerSucursales(empresa.id)
        
        setSucursales(resultSucursales);
      } catch (error) {
        console.error("Error al obtener las sucursales:", error);
      } 
    };

    fetchData();
  },[]); 


  return (
    <div className={styles.Empresaview__container}>
      <h3> {empresa.nombre}</h3>
      <div className={styles.Empresaview__infoContainer}>
        <p className={styles.Empresaview__txtCategory}>
          <b>Razon Social:</b>
        </p>
        <p className={styles.Empresaview__txtInfo}>{empresa.razonSocial}</p>
        <p className={styles.Empresaview__txtCategory}>
          <b>CUIT:</b>
        </p>
        <p className={styles.Empresaview__txtInfo}>{empresa.cuit}</p>
        <p className={styles.Empresaview__txtCategory}>
          <b>Sucursales:</b>
        </p>
        <p className={styles.Empresaview__txtInfo}>
          {sucursales.length}
        </p>
        <div className={styles.Empresaview__img}>
        {isImageError || !empresa.logo ? (
        <FontAwesomeIcon icon={faImage} style={{ fontSize: "4rem" }} />
      ) : (
        <img
          src={empresa.logo}
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
