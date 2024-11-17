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
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { SucursalService } from "../../../services/SucursalService";

export const Empresa = () => {
  // Aca seria un listado de las empresas, pero todavia no esta asignado
  const [empresas, setEmpresas] = useState<IEmpresa[]>([]);
  const [empresa, setEmpresa] = useState<IEmpresa | null>(null);
  const [sucursales, setSeucursales] = useState<ISucursal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Estado para el indicador de carga
  const [selectedViewEmpresa, setSelectedViewEmpresa] =
    useState<IEmpresa | null>(null);
  const [selectedEditEmpresa, setSelectedEditEmpresa] =
    useState<IEmpresa | null>(null);
  const [isFormEmpresaVisible, setIsFormEmpresaVisible] =
    useState<boolean>(false);

  const cuit = useParams().empresaCuit;
  const empresaService = new EmpresaService();
  const sucursalService = new SucursalService();

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
  const traerEmpresas = async (): Promise<IEmpresa[]> => {
    try {
      const result = await empresaService.getAllEmpresas();
      return result; // Devuelve los datos obtenidos
    } catch (error) {
      console.error("Error al buscar la empresa:", error);
      return []; // Devuelve un array vacío en caso de error
    }
  };

  //traemos las empresas
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
        const result = await traerEmpresas(); // Trae todas las empresas y actualiza el estado
        console.log(result);
        const resultEmpresa = result.find(
          (emp) => emp.cuit.toString() === cuit
        );

        const resultSucursales = resultEmpresa?.id
          ? await traerSucursales(resultEmpresa.id)
          : [];

        setEmpresa(resultEmpresa || null); // Si no se encuentra, setea null
        setEmpresas(result); // Actualiza el estado con todas las empresas
        setSeucursales(resultSucursales)
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setEmpresa(null); // En caso de error, setea empresa como null
      } finally {
        setIsLoading(false); // Oculta el mensaje de carga al finalizar
      }
    };

    fetchData();
  }, [cuit]); // Se ejecuta cada vez que cambia el cuit

  return (
    <>
      {isLoading ? null : empresa ? ( // Mostrar un mensaje de carga mientras isLoading es true
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
                  Sucursales de {empresa.nombre}
                </h2>
              </div>
              <div className={styles.empresa__bottonContainer}>
                <button className="add__button">Agregar sucursal</button>
              </div>
            </div>
            <div className={styles.empresa__content}>
              <div className={styles.empresa__cardsContainer}>
                {sucursales.map((suc) => (
                  <SucursalCard sucursal={suc} />
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
