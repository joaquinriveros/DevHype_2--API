import styles from "./Home.module.css";
import { EmpresaListItem } from "../../ui/EmpresaListItems/EmpresaListItem";
import { useState } from "react";
import { FormEmpresa } from "../../ui/FormEmpresa/FormEmpresa";
import { empresas } from "../../../data/empresas";

export const Home = () => {
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

        <aside className={styles.home__aside}>
          <h2>Empresa</h2>
          <button className="add__button" onClick={toggleFormEmpresa}>
            Agregar Empresa
          </button>
          <EmpresaListItem empresas={empresas} />
        </aside>

        <div className={styles.home__body}>
          <div className={styles.home__header}>
            <div className={styles.home__tittleContainer}>
              <h2 className={styles.home__tittle}>Sucursales</h2>
            </div>
          </div>
          <div className={styles.home__content}>
            <div className={styles.home__mesaje}>
              <p>Seleccione una Empresa</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
