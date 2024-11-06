import styles from "./Empresa.module.css";
import { EmpresaListItem } from "../../ui/EmpresaListItems/EmpresaListItem";
import { useEffect, useState } from "react";
import { FormEmpresa } from "../../ui/FormEmpresa/FormEmpresa";
import { empresas } from "../../../data/empresas";
import { IEmpresa } from "../../../types/IEmpresa";
import { ErrorPage } from "../../ui/ErrorPage/ErrorPage";
import { useParams } from "react-router-dom";
import { SucursalCard } from "../../ui/SucursalCard/SucursalCard";

export const Empresa = () => {
  const [empresa, setEmpresa] = useState<IEmpresa | null>(null);
  const cuit = useParams().cuit;
  const [isFormEmpresaVisible, setIsFormEmpresaVisible] =
    useState<boolean>(false);

  const toggleFormEmpresa = () =>
    setIsFormEmpresaVisible(!isFormEmpresaVisible); // Función para mostrar el formulario
  useEffect(() => {
    const result = empresas.find((e) => e.cuit === cuit);
    result ? setEmpresa(result) : setEmpresa(null);
  });
  return (
    //Si estás leyendo esto es por que no borré el repo - Enzo
    <>
      {empresa ? (
        <div className={"aside-main__container"}>
          {isFormEmpresaVisible && (
            <div className={styles.overlay}>
              <FormEmpresa onClose={toggleFormEmpresa} />
            </div>
          )}

          <aside className={styles.empresa__aside}>
            <h2>Empresas</h2>
            <button className="add__button" onClick={toggleFormEmpresa}>
              Agregar Empresa
            </button>
            <EmpresaListItem empresas={empresas} />
          </aside>

          <div className={styles.empresa__body}>
            <div className={styles.empresa__header}>
              <div className={styles.empresa__tittleContainer}>
                <h2 className={styles.empresa__tittle}>
                  Sucursales de {empresa.name}
                </h2>
              </div>
              <div className={styles.empresa__bottonContainer}>
                <button className="add__button">Agregar sucursal</button>
              </div>
            </div>
            <div className={styles.empresa__content}>
              <div className={styles.empresa__cardsContainer}>
                {empresa.sucursales.map((sucursal) => (
                  <SucursalCard sucursal={sucursal} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ErrorPage mesaje="Empresa no encontrasa!" />
      )}
    </>
  );
};
