import { AsideAdministracion } from "../../ui/AsideAdministracion/AsideAdministracion";
import styles from "./Alergenos.module.css";
import { useEffect, useState } from "react";
import { AlergenoService } from "../../../services/AlergenosService";
import { EmpresaService } from "../../../services/EmpresaService"; // Servicio de empresa
import { SucursalService } from "../../../services/SucursalService"; // Servicio de sucursal
import { IAlergenos } from "../../../types/dtos/alergenos/IAlergenos";
import { AccionesAlergeno } from "../../ui/AccionesAlergeno/AccionesAlergeno";
import { ErrorPage } from "../../ui/ErrorPage/ErrorPage";
import { FormAlergeno } from "../../ui/FormAlergenos/FormAlergenos";
import { AlergenoView} from "../../ui/AlergenoView/AlergenoView"
import { AlergenosListItem } from "../../ui/AlergenosListItems/AlergenosListItems"
import { FormEditAlergeno } from "../../ui/FormEditAlergeno/FormEditAlergeno"
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { useParams } from "react-router-dom"; // Para obtener parámetros de la URL


export const Alergenos = () => {
  const [alergenos, setAlergenos] = useState<IAlergenos[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [empresa, setEmpresa] = useState<null | IEmpresa>(null);
  const [sucursal, setSucursal] = useState<null | ISucursal>(null);
  const [error, setError] = useState<string | null>(null);
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

  const toggleFormAlergeno = () => {
    if (isFormAlergenoVisible) {
    }
    setIsFormAlergenoVisible(!isFormAlergenoVisible); // Función para mostrar el formulario
  };
  const handleAlergenoClickView = (alergenoClicked: IAlergenos) => {
    setSelectedViewAlergeno(alergenoClicked);
  };
  const closeViewAlergeno = () => {
    setSelectedViewAlergeno(null);
  };

  const handleAlergenoClickEdit = (alergenoClicked: IAlergenos) => {
    setSelectedEditAlergeno(alergenoClicked);
  };
  const closeEditAlergeno = () => {
    setSelectedEditAlergeno(null);
  };
  // Fetch Alergenos
  const fetchAlergenos = async () => {
    try {
      setError(null);
      const data = await alergenoService.getAllAlergenos();
      setAlergenos(data || []);
    } catch (error) {
      setError("Error al cargar los alérgenos.");
    }
  };

  // Fetch Empresa y Sucursal
  const fetchEmpresaSucursal = async () => {
    try {
      if (!empresaId || !sucursalId) {
        setError("Faltan datos de empresa o sucursal.");
        return;
      }

      const [empresaData, sucursalData] = await Promise.all([
        empresaService.getEmpresaById(Number(empresaId)),
        sucursalService.getSucursalById(Number(sucursalId)),
      ]);

      setEmpresa(empresaData);
      setSucursal(sucursalData);
    } catch (error) {
      setError("Error al cargar los datos de la empresa o sucursal.");
    }
  };

  // Efectos
  useEffect(() => {
    fetchAlergenos();
    fetchEmpresaSucursal();
  }, []);

  // Renderizado condicional
  if (error) {
    return <ErrorPage mesaje={error} />;
  }

  if (!empresa || !sucursal) {
    return <ErrorPage mesaje="Datos de empresa o sucursal no encontrados." />;
  }

  return (
    <div className={"aside-main__container"}>
      {isFormAlergenoVisible && (
            <div className="overlay">
              <FormAlergeno onClose={toggleFormAlergeno} onSuccess={function (): void {
            throw new Error("Function not implemented.");
          } } />
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
          <button className="add__button" style={{marginLeft:"83%"}} onClick={() => setShowForm(true)}>
            AGREGAR ALÉRGENO
          </button>
          <AlergenosListItem
              alergenos={alergenos}
              onViewAlergenoClick={handleAlergenoClickView}
              onEditAlergenoClick={handleAlergenoClickEdit}
            />
        </div>
        <div className={styles.alergeno__content}>
          <div className={styles.alergeno__tableContainer}>
            <table className={styles.alergeno__table}>
              <thead>
                <tr>
                  <th style={{ width: "86.5%", textAlign: "center" }}>Nombre</th>
                  <th style={{ width: "13.5%", textAlign: "center" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {alergenos.map((alergeno) => (
                  <tr key={alergeno.id}>
                    <td style={{ textAlign: "center" }}>{alergeno.denominacion}</td>
                    <td style={{ textAlign: "center" }}>
                      <AccionesAlergeno
                        onEdit={() => console.log("Editar:", alergeno.id)}
                        onView={() => console.log("Ver:", alergeno.id)}
                        onDelete={() => console.log("Eliminar:", alergeno.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
