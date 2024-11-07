import styles from "./Home.module.css";
import { EmpresaListItem } from "../../ui/EmpresaListItems/EmpresaListItem";
import { useState } from "react";
import { FormEmpresa } from "../../ui/FormEmpresa/FormEmpresa";
import { empresas } from "../../../data/empresas";
import { IEmpresa } from "../../../types/IEmpresa";
import { EmpresaView } from "../../ui/EmpresaView/EmpresaView";
import FormEditEmpresa from "../../ui/FormEditEmpresa/FormEditEmpresa";

export const Home = () => {
  const [selectedViewEmpresa, setSelectedViewEmpresa] =
    useState<IEmpresa | null>(null);
  const [selectedEditEmpresa, setSelectedEditEmpresa] =
    useState<IEmpresa | null>(null);
  const [isFormEmpresaVisible, setIsFormEmpresaVisible] =
    useState<boolean>(false);

  const handleEmpresClickView = (empresaClicked: IEmpresa) => {
    setSelectedViewEmpresa(empresaClicked);
  };
  const closeViewEmpresa = () => {
    setSelectedViewEmpresa(null);
  };
  const handleEmpresClickEdit = (empresaClicked: IEmpresa) => {
    setSelectedEditEmpresa(empresaClicked);
  };
  const closeEditEmpresa = () => {
    setSelectedEditEmpresa(null);
  };
  const toggleFormEmpresa = () =>
    setIsFormEmpresaVisible(!isFormEmpresaVisible); // Función para mostrar el formulario

  return (
    <>
      <div className={"aside-main__container"}>
        {isFormEmpresaVisible && (
          <div className="overlay">
            <FormEmpresa onClose={toggleFormEmpresa} />
          </div>
        )}
        {selectedViewEmpresa && (
          <div className="overlay">
            <EmpresaView
              empresa={selectedViewEmpresa}
              onClose={closeViewEmpresa}
            />
          </div>
        )}
        {selectedEditEmpresa && (
          <div className="overlay">
            <FormEditEmpresa
              empresa={selectedEditEmpresa}
              onClose={closeEditEmpresa}
            />
          </div>
        )}

        <aside className={styles.home__aside}>
          <h2>Empresa</h2>
          <button className="add__button" onClick={toggleFormEmpresa}>
            Agregar Empresa
          </button>
          <EmpresaListItem
            empresas={empresas}
            onViewEmpresClick={handleEmpresClickView}
            onEditEmpresClick={handleEmpresClickEdit}
          />
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
