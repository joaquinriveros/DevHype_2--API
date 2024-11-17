import styles from "./Empresa.module.css";
import { EmpresaListItem } from "../../ui/EmpresaListItems/EmpresaListItem";
import { useEffect, useState } from "react";
import { FormEmpresa } from "../../ui/FormEmpresa/FormEmpresa";
import { ErrorPage } from "../../ui/ErrorPage/ErrorPage";
import { useParams } from "react-router-dom";
import { SucursalCard } from "../../ui/SucursalCard/SucursalCard";
import { EmpresaView } from "../../ui/EmpresaView/EmpresaView";
import FormEditEmpresa from "../../ui/FormEditEmpresa/FormEditEmpresa";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { EmpresaService } from "../../../services/EmpresaService";

export const Empresa = () => {
  // Aca seria un listado de las empresas, pero todavia no esta asignado
  const [empresas, setEmpresas] = useState<IEmpresa[]>([]);
  const [empresa, setEmpresa] = useState<IEmpresa | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Estado para el indicador de carga
  const [selectedViewEmpresa, setSelectedViewEmpresa] =
    useState<IEmpresa | null>(null);
  const [selectedEditEmpresa, setSelectedEditEmpresa] =
    useState<IEmpresa | null>(null);
  const [isFormEmpresaVisible, setIsFormEmpresaVisible] =
    useState<boolean>(false);
  const cuit = useParams().empresaCuit;
  const empresaService = new EmpresaService();

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

  //traemos las empresas
  const traerEmpresas = async () => {
    try {
      const result = await empresaService.getAllEmpresas();
      setEmpresas(result);
    } catch (error) {
      console.error("Error al obtener las empresas:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Muestra el mensaje de carga al inicio
      try {
        await traerEmpresas(); // Trae todas las empresas y actualiza el estado
        
        // Ahora busca la empresa específica por su cuit directamente en el resultado obtenido
        const resultEmpresa = empresas.find(
          (emp) => emp.cuit.toString() === cuit
        );
        setEmpresa(resultEmpresa || null); // Si no se encuentra, setea null
      } catch (error) {
        console.error("Error al obtener las empresas:", error);
        setEmpresa(null); // En caso de error, setea empresa como null
      } finally {
        setIsLoading(false); // Oculta el mensaje de carga al finalizar
      }
    };
  
    fetchData();
  }, [cuit]); // Se ejecuta cada vez que cambia el cuit

  return (
    <>
      {isLoading ? ( // Mostrar un mensaje de carga mientras isLoading es true
        <p>Cargando...</p>
      ) : empresa ? (
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
                  Sucursales de {"Empresa"}
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
