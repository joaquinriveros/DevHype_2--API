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
import { SucuersalView } from "../../ui/SucursalView/SucursalView";
import { FormSucursal } from "../../ui/FormSucursal/FormSucursal";
import { FormEditSucursal } from "../../ui/FormEditSucursal/FormEditSucursal";

export const Empresa = () => {
  // Aca seria un listado de las empresas, pero todavia no esta asignado
  const [empresas, setEmpresas] = useState<IEmpresa[]>([]);
  const [empresa, setEmpresa] = useState<IEmpresa | null>(null);
  const [sucursales, setSucursales] = useState<ISucursal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Estado para el indicador de carga

  const [selectedViewEmpresa, setSelectedViewEmpresa] =
    useState<IEmpresa | null>(null);
  const [selectedEditEmpresa, setSelectedEditEmpresa] =
    useState<IEmpresa | null>(null);

  const [selectedViewSucursal, setSelectedViewSucursal] =
    useState<ISucursal | null>(null);

  const [selectedEditSucursal, setSelectedEditSucursal] =
    useState<ISucursal | null>(null);

  const [isFormEmpresaVisible, setIsFormEmpresaVisible] =
    useState<boolean>(false);
  const [isFormSucursalVisible, setIsFormSucursalVisible] =
    useState<boolean>(false);

  const idEmpresa = Number(useParams().empresaId);
  const empresaService = new EmpresaService();
  const sucursalService = new SucursalService();

  const toggleFormEmpresa = () => {
    setIsFormEmpresaVisible(!isFormEmpresaVisible); // Función para mostrar el formulario
  };
  const toggleFormSucursal = () => {
    setIsFormSucursalVisible(!isFormSucursalVisible); // Función para mostrar el formulario
  };

  // Empresa view
  const handleEmpresClickView = (empresaClicked: IEmpresa) => {
    setSelectedViewEmpresa(empresaClicked);
  };
  const closeViewEmpresa = () => {
    setSelectedViewEmpresa(null);
  };

  // Empresa edit
  const handleEmpresClickEdit = (empresaClicked: IEmpresa) => {
    setSelectedEditEmpresa(empresaClicked);
  };
  const closeEditEmpresa = () => {
    setSelectedEditEmpresa(null);
  };

  // Sucursal view
  const handleSucursalClickView = (sucursalClicked: ISucursal) => {
    setSelectedViewSucursal(sucursalClicked);
  };
  const closeViewSucursal = () => {
    setSelectedViewSucursal(null);
  };

  // Sucursal edit falrtasdfsldkfjkld
  const handleSucursalClickEdit = (sucursalClicked: ISucursal) => {
    setSelectedEditSucursal(sucursalClicked);
  };
  const closeEditSucursal = () => {
    setSelectedEditSucursal(null);
  };

  // Traemos las empresas
  const traerEmpresas = async (): Promise<IEmpresa[]> => {
    try {
      const result = await empresaService.getAllEmpresas();
      return result; // Devuelve los datos obtenidos
    } catch (error) {
      console.error("Error al buscar la empresa:", error);
      return []; // Devuelve un array vacío en caso de error
    }
  };

  // Buscamos la empresa
  const buscarEmpresa = async (idEmpresa: number): Promise<IEmpresa | null> => {
    try {
      const result = await empresaService.getEmpresaById(idEmpresa);
      return result; // Devuelve los datos obtenidos
    } catch (error) {
      console.error("Error al buscar la empresa:", error);
      return null; // Devuelve un array vacío en caso de error
    }
  };

  //traemos las sucursales
  const traerSucursales = async (idEmpresa: number): Promise<ISucursal[]> => {
    try {
      const result = await sucursalService.getSucursalesPorEmpresa(idEmpresa);
      return result || []; // Devuelve los datos obtenidos
    } catch (error) {
      console.error("Error al buscar sucursales:", error);
      return []; // Devuelve un array vacío en caso de error
    }
  };

  const fetchData = async () => {
    try {
      const result = await traerEmpresas(); // Trae todas las empresas y actualiza el estado
      const resultEmpresa = idEmpresa ? await buscarEmpresa(idEmpresa) : null;

      const resultSucursales = resultEmpresa?.id
        ? await traerSucursales(resultEmpresa.id)
        : [];

      setEmpresa(resultEmpresa || null); // Si no se encuentra, setea null
      setEmpresas(result); // Actualiza el estado con todas las empresas
      setSucursales(resultSucursales);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      setEmpresa(null); // En caso de error, setea empresa como null
    } finally {
      setIsLoading(false); // Oculta el mensaje de carga al finalizar
    }
  };
  useEffect(() => {
    fetchData();
  }, [idEmpresa]); // Se ejecuta cada vez que cambia el cuit

  return (
    <>
      {isLoading ? null : empresa ? ( // Mostrar un mensaje de carga mientras isLoading es true
        <div className={"aside-main__container"}>
          {isFormEmpresaVisible && (
            <div className="overlay">
              <FormEmpresa onClose={toggleFormEmpresa} />
            </div>
          )}
          {isFormSucursalVisible && (
            <div className="overlay">
              <FormSucursal onClose={toggleFormSucursal} empresa={empresa} />
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
          {selectedViewSucursal && (
            <div className="overlay">
              <SucuersalView
                sucursal={selectedViewSucursal}
                onClose={closeViewSucursal}
              />
            </div>
          )}
          {selectedEditSucursal && (
            <div className="overlay">
              <FormEditSucursal
                empresa={empresa}
                sucursal={selectedEditSucursal}
                onClose={closeEditSucursal}
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
                <button className="add__button" onClick={toggleFormSucursal}>
                  Agregar sucursal
                </button>
              </div>
            </div>
            <div className={styles.empresa__content}>
              {sucursales && sucursales.length > 0 ? (
                <div className={styles.empresa__cardsContainer}>
                  {sucursales.map((suc) => (
                    <div style={{ width: "100%" }}>
                      <SucursalCard
                        sucursal={suc}
                        onViewSucursalClick={handleSucursalClickView}
                        onEditSucursalClick={handleSucursalClickEdit}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <h3 className={styles.empresa__noSucursales}>
                  No hay sucursales
                </h3>
              )}
            </div>
          </div>
        </div>
      ) : (
        <ErrorPage mesaje="Empresa no encontrada!" />
      )}
    </>
  );
};
