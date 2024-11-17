import styles from "./Categorias.module.css";
import { AsideAdministracion } from "../../ui/AsideAdministracion/AsideAdministracion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ErrorPage } from "../../ui/ErrorPage/ErrorPage";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { EmpresaService } from "../../../services/EmpresaService";

export const Categorias = () => {
  const [empresas, setEmpresas] = useState<IEmpresa[]>([]);
  const [empresa, setEmpresa] = useState<null | IEmpresa>(null);
  const [sucursal, setSucursal] = useState<null | ISucursal>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { empresaCuit, sucursalId } = useParams();
  

  const getParams = () => {
    const resultEmpresa = empresas.find((emp) => emp.cuit.toString() === empresaCuit);
    resultEmpresa ? setEmpresa(resultEmpresa) : setEmpresa(null);

    const resultSucursal = empresa?.sucursales.find(
      (suc) => suc.id.toString() === sucursalId
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
  return empresa !== null && sucursal !== null ? (
    <div className={"aside-main__container"}>
      <AsideAdministracion empresa={empresa} sucursal={sucursal}/>

      <div className={styles.categoria__body}>
        <div className={styles.categoria__header}>
          <div className={styles.categoria__filterContainer}>
            Categorías:
          </div>
          <div>
            <button className="add__button">AGREGAR UN PRODUCTO</button>
          </div>
        </div>
        <div className={styles.categoria__content}>
          <div className={styles.categoria__itemsContainer}>
            <h1>funciona</h1>
          </div>
        </div>
      </div>
    </div>
  ): (
    <ErrorPage mesaje="Pagina no encontrada" />
  );
};
