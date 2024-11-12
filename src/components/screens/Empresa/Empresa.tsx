import styles from "./Empresa.module.css";
import { EmpresaListItem } from "../../ui/EmpresaListItems/EmpresaListItem";
import { useEffect, useState } from "react";
import { FormEmpresa } from "../../ui/FormEmpresa/FormEmpresa";
import { empresas } from "../../../data/empresas";
import { IEmpresa } from "../../../types/IEmpresa";
import { ErrorPage } from "../../ui/ErrorPage/ErrorPage";
import { useParams } from "react-router-dom";
import { SucursalCard } from "../../ui/SucursalCard/SucursalCard";
import { EmpresaView } from "../../ui/EmpresaView/EmpresaView";
import FormEditEmpresa from "../../ui/FormEditEmpresa/FormEditEmpresa";

export const Empresa = () => {
  const [empresa, setEmpresa] = useState<IEmpresa | null>(null);
  const [selectedViewEmpresa, setSelectedViewEmpresa] =
    useState<IEmpresa | null>(null);
  const [selectedEditEmpresa, setSelectedEditEmpresa] =
    useState<IEmpresa | null>(null);
  const [isFormEmpresaVisible, setIsFormEmpresaVisible] =
    useState<boolean>(false);

  const cuit = useParams().cuit;

  const toggleFormEmpresa = () => {
    setIsFormEmpresaVisible(!isFormEmpresaVisible); // Función para mostrar el formulario
  };

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

  useEffect(() => {
    const result = empresas.find((e) => e.cuit === cuit);
    result ? setEmpresa(result) : setEmpresa(null);
  });

  return (
    <>
      {empresa ? (
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

          <aside className={styles.empresa__aside}>
            <h2>Empresas</h2>
            <button className="add__button" onClick={toggleFormEmpresa}>
              Agregar Empresa
            </button>
            <EmpresaListItem
              empresas={empresas}
              onViewEmpresClick={handleEmpresClickView}
              onEditEmpresClick={handleEmpresClickEdit}
            />
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
        <ErrorPage mesaje="Empresa no encontrada!" />
      )}
    </>
  );
};
