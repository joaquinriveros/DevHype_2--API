import { AsideAdministracion } from "../../ui/AsideAdministracion/AsideAdministracion";
import styles from "./Alergenos.module.css";
import { useEffect, useState } from "react";
import { AlergenoService } from "../../../services/AlergenosService";
import { EmpresaService } from "../../../services/EmpresaService"; // Servicio de empresa
import { SucursalService } from "../../../services/SucursalService"; // Servicio de sucursal
import { IAlergenos } from "../../../types/dtos/alergenos/IAlergenos";
import { ErrorPage } from "../../ui/ErrorPage/ErrorPage";
import { FormAlergeno } from "../../ui/FormAlergenos/FormAlergeno";
import { AlergenoView } from "../../ui/AlergenoView/AlergenoView";
import { FormEditAlergeno } from "../../ui/FormEditAlergeno/FormEditAlergeno";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { useParams } from "react-router-dom"; // Para obtener parámetros de la URL
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ChargePage } from "../../ui/ChargePage/ChargePage";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";

export const Alergenos = () => {
  const [alergenos, setAlergenos] = useState<IAlergenos[]>([]);
  const [empresa, setEmpresa] = useState<null | IEmpresa>(null);
  const [sucursal, setSucursal] = useState<null | ISucursal>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [selectedViewAlergeno, setSelectedViewAlergeno] =
    useState<IAlergenos | null>(null);
  const [selectedEditAlergeno, setSelectedEditAlergeno] =
    useState<IAlergenos | null>(null);
  const [isFormAlergenoVisible, setIsFormAlergenoVisible] =
    useState<boolean>(false);

  const alergenoService = new AlergenoService();
  const empresaService = new EmpresaService();
  const sucursalService = new SucursalService();

  const { empresaId, sucursalId } = useParams(); // Obtener IDs desde la URL

  // Alergeno form
  const toggleFormAlergeno = async () => {
    if (isFormAlergenoVisible) {
      await fetchData();
    }
    setIsFormAlergenoVisible(!isFormAlergenoVisible); // Función para mostrar el formulario
  };

  // Alergeno view
  const handleAlergenoClickView = (alergenoClicked: IAlergenos) => {
    setSelectedViewAlergeno(alergenoClicked);
  };
  const closeViewAlergeno = () => {
    setSelectedViewAlergeno(null);
  };

  // Alergeno edit
  const handleAlergenoClickEdit = (alergenoClicked: IAlergenos) => {
    setSelectedEditAlergeno(alergenoClicked);
  };
  const closeEditAlergeno = async () => {
    await fetchData();
    await setSelectedEditAlergeno(null);
  };

  // Traer Alergenos
  const traeeAlergenos = async (): Promise<IAlergenos[]> => {
    try {
      const result = await alergenoService.getAllAlergenos();
      return result || [];
    } catch (error) {
      return [];
    }
  };
  // Traer Empresa
  const traeeEmpresa = async (): Promise<IEmpresa | null> => {
    try {
      const result = await empresaService.getEmpresaById(Number(empresaId));
      return result || null;
    } catch (error) {
      return null;
    }
  };
  // Traer Empresa
  const traerSucursal = async (): Promise<ISucursal | null> => {
    try {
      const result = await sucursalService.getSucursalById(Number(sucursalId));
      return result || null;
    } catch (error) {
      return null;
    }
  };

  // Fetch Empresa y Sucursal
  const fetchData = async () => {
    try {
      const resultAlergenos = await traeeAlergenos();
      const resultEmpresa = await traeeEmpresa();
      const resultSucursal = await traerSucursal();

      setEmpresa(resultEmpresa);
      setSucursal(resultSucursal);
      setAlergenos(resultAlergenos);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      setAlergenos([]);
    } finally {
      setIsLoading(false);
    }
    return;
  };

  // Efectos
  useEffect(() => {
    fetchData();
  }, []);

  // Renderizado condicional
  if (isLoading) {
    return <ChargePage />;
  }
  return empresa && sucursal ? (
    <div className={"aside-main__container"}>
      {isFormAlergenoVisible && (
        <div className="overlay">
          <FormAlergeno onClose={toggleFormAlergeno} />
        </div>
      )}
      {selectedViewAlergeno && (
        <div className="overlay">
          <AlergenoView
            alergeno={selectedViewAlergeno}
            onClose={closeViewAlergeno}
          />
        </div>
      )}
      {selectedEditAlergeno && (
        <div className="overlay">
          <FormEditAlergeno
            alergeno={selectedEditAlergeno}
            onClose={closeEditAlergeno}
          />
        </div>
      )}
      <AsideAdministracion empresa={empresa} sucursal={sucursal} />
      {/* Contenido principal */}
      <div className={styles.alergeno__container}>
        <div className={styles.alergeno__header}>
          <h4>{`Alergenos de ${empresa.nombre}`}</h4>
          <button className="add__button" onClick={toggleFormAlergeno}>
            AGREGAR ALÉRGENO
          </button>
          {/* <AlergenosListItem
              alergenos={alergenos}
              onViewAlergenoClick={handleAlergenoClickView}
              onEditAlergenoClick={handleAlergenoClickEdit}
            /> */}
        </div>
        <div className={styles.alergeno__content}>
          <div className={styles.alergeno__tableContainer}>
            <table className={styles.alergeno__table}>
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>Nombre</th>
                  <th style={{ width: "8rem", textAlign: "center" }}>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {alergenos.map((aler) => (
                  <tr key={aler.id}>
                    <td style={{ textAlign: "center" }}>{aler.denominacion}</td>
                    <td style={{ textAlign: "center" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: ".5rem",
                        }}
                      >
                        <button
                          className="boxStyle__icon"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleAlergenoClickEdit(aler);
                          }}
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </button>
                        <button className="boxStyle__icon" onClick={(event) => {
                            event.stopPropagation();
                            handleAlergenoClickView(aler);
                          }}>
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <ErrorPage mesaje="Error de Carga" />
  );
};
