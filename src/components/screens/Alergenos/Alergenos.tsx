import { useEffect, useState } from "react";
import { AlergenoService } from "../../../services/AlergenosService";
import { IAlergenos } from "../../../types/dtos/alergenos/IAlergenos";
import { AccionesAlergeno } from "../../ui/AccionesAlergeno/AccionesAlergeno";
import { ErrorPage } from "../../ui/ErrorPage/ErrorPage"; // Importación de ErrorPage
import { FormAlergeno } from "../../ui/FormAlergenos/FormAlergenos";
import styles from "./Alergenos.module.css";

export const Alergenos = () => {
  const [alergenos, setAlergenos] = useState<IAlergenos[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const alergenoService = new AlergenoService();

  const fetchAlergenos = async () => {
    try {
      setError(null); // Limpiar errores antes de cada solicitud
      const data = await alergenoService.getAllAlergenos();
      if (data) setAlergenos(data);
    } catch (error) {
      setError("Error al cargar los alérgenos.");
    }
  };

  const handleAddAlergeno = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleEdit = (id: number) => {
    console.log("Editar alergeno con ID:", id);
  };

  const handleView = (id: number) => {
    console.log("Ver alergeno con ID:", id);
  };

  const handleDelete = async (id: number) => {
    try {
      await alergenoService.delete(id);
      fetchAlergenos();
    } catch (error) {
      console.error("Error al eliminar el alergeno:", error);
      setError("Error al eliminar el alérgeno.");
    }
  };

  useEffect(() => {
    fetchAlergenos();
  }, []);

  if (error) {
    return <ErrorPage mesaje={error} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Alergenos</h2>
        <button className="add__button-red" onClick={handleAddAlergeno}>
          Agregar Alergeno
        </button>
      </div>
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
                  onEdit={() => handleEdit(alergeno.id)}
                  onView={() => handleView(alergeno.id)}
                  onDelete={() => handleDelete(alergeno.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <FormAlergeno onClose={handleCloseForm} onSuccess={fetchAlergenos} />
      )}
    </div>
  );
};
