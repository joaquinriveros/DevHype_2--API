import styles from "./Empresa.module.css";
import { EmpresaListItem } from "../../ui/EmpresaListItems/EmpresaListItem";
import { useState } from "react";
import { FormEmpresa } from "../../ui/FormEmpresa/FormEmpresa";
import { EmpresaCard } from "../../ui/SucursalCard/SucursalCard";
import { empresas } from "../../../data/empresas";

export const Empresa = () => {
  const [isFormEmpresaVisible, setIsFormEmpresaVisible] =
    useState<boolean>(false);

  const toggleFormEmpresa = () =>
    setIsFormEmpresaVisible(!isFormEmpresaVisible); // Función para mostrar el formulario

  return (
    <>
      <div className={"aside-main__container"}>
        {isFormEmpresaVisible && (
          <div className={styles.overlay}>
            <FormEmpresa onClose={toggleFormEmpresa} />
          </div>
        )}

        <aside className={styles.empresa__aside}>
          <h2>Empresa</h2>
          <button className="add__button" onClick={toggleFormEmpresa}>
            Agregar Empresa
          </button>
          <EmpresaListItem empresas={empresas} />
        </aside>

        <div className={styles.empresa__body}>
          <div className={styles.empresa__header}>
            <div className={styles.empresa__tittleContainer}>
              <h2 className={styles.empresa__tittle}>Sucursales en: Nombre</h2>
            </div>
            <div className={styles.empresa__bottonContainer}>
              <button className="add__button">Agregar sucursal</button>
            </div>
          </div>
          <div className={styles.empresa__content}>
            <div className={styles.empresa__cardsContainer}>
              <EmpresaCard />
              <EmpresaCard />
              <EmpresaCard />
              <EmpresaCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
