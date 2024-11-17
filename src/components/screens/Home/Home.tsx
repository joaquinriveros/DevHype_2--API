import styles from "./Home.module.css";
import { EmpresaListItem } from "../../ui/EmpresaListItems/EmpresaListItem";
import { useEffect, useState } from "react";
import { FormEmpresa } from "../../ui/FormEmpresa/FormEmpresa";
import { EmpresaView } from "../../ui/EmpresaView/EmpresaView";
import FormEditEmpresa from "../../ui/FormEditEmpresa/FormEditEmpresa";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { EmpresaService } from "../../../services/EmpresaService";

export const Home = () => {
  const [empresas, setEmpresas] = useState<IEmpresa[]>([]);
  const [selectedViewEmpresa, setSelectedViewEmpresa] =
    useState<IEmpresa | null>(null);
  const [selectedEditEmpresa, setSelectedEditEmpresa] =
    useState<IEmpresa | null>(null);
  const [isFormEmpresaVisible, setIsFormEmpresaVisible] =
    useState<boolean>(false);

  const empresaService = new EmpresaService();

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
  const toggleFormEmpresa = () => {
    setIsFormEmpresaVisible(!isFormEmpresaVisible); // Función para mostrar el formulario
  };

  // pruba de getAllEmpresas
  const traerEmpresas = async () => {
    try {
      const result = await empresaService.getAllEmpresas();
      console.log(result)
      setEmpresas(result);
    } catch (error) {
      console.error("Error al obtener las empresas:", error);
    }
  };

  useEffect(() => {
    traerEmpresas();
  }, []); // Array vacío para que se ejecute solo al montar

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
