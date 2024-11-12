import styles from "./Alergenos.module.css"
import { AsideAdministracion } from "../../ui/AsideAdministracion/AsideAdministracion";
import { IEmpresa } from "../../../types/IEmpresa";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { empresas } from "../../../data/empresas";
import { ErrorPage } from "../../ui/ErrorPage/ErrorPage";
import { ISucursal } from "../../../types/ISucursal";


export const Alergenos = () => {
  const [empresa, setEmpresa] = useState<null | IEmpresa>(null);
  const [sucursal, setSucursal] = useState<null | ISucursal>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { empresaCuit, sucursalId } = useParams();

  const getParams = () => {
    const resultEmpresa = empresas.find((emp) => emp.cuit === empresaCuit);
    resultEmpresa ? setEmpresa(resultEmpresa) : setEmpresa(null);

    const resultSucursal = empresa?.sucursales.find(
      (suc) => suc.idSucursal === sucursalId
    );
    resultSucursal ? setSucursal(resultSucursal) : setSucursal(null);
    setIsLoading(false)
  };

  useEffect(()=>{
    getParams()
  })

  if (isLoading) {
    return null; // O puedes mostrar un spinner aquí si prefieres
  }
  return empresa !== null && sucursal !== null ?(
    <div className={"aside-main__container"}>
      <AsideAdministracion empresa={empresa} sucursal={sucursal}/>

      <div className={styles.alergeno__body}>
        <div className={styles.alergeno__header}>
          <div>
            <button className="add__button">ALÉRGENOS</button>
          </div>
        </div>
        <div className={styles.alergeno__content}>
          <div className={styles.alergeno__itemsContainer}>
            <div className={styles.alergeno__tableContainer}>
              <table className={styles.alergeno__table}>
                <thead>
                  <tr>
                      <th style={{ width: "86.5%", textAlign: "center" }}>Nombre</th>
                      <th style={{ width: "13.5%", textAlign: "center" }}>Acciones</th>
                  </tr>
                </thead>
              </table>
             </div>  
          </div>
        </div>
      </div>
    </div>
  ): (
    <ErrorPage mesaje="Pagina no encontrada" />
  );
};