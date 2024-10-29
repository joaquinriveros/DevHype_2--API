import styles from "./Empresa.module.css";
import { EmpresaListItem } from "../../ui/EmpresaListItems/EmpresaListItem";
import { useState } from "react";
import { FormEmpresa } from "../../ui/FormEmpresa/FormEmpresa";
import { EmpresaCard } from "../../ui/EmpresaCard/EmpresaCard";

export const Empresa = () => {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const openForm = () => setIsFormVisible(true); // Función para mostrar el formulario
  const closeForm = () => setIsFormVisible(false); // Función para ocultar el formulario

  return (
    <>
      <div className={styles.empresa__container}>
        {isFormVisible && (
          <div className={styles.overlay}>
            <div className={styles.popup}>
              <FormEmpresa onClose={closeForm} />
            </div>
          </div>
        )}

        <aside className={styles.empresa__aside}>
          <h2>Empresa</h2>
          <button className={styles.empresa__button} onClick={openForm}>
            Agregar Empresa
          </button>
          <div className={styles.empresa__listContainer}>
            <EmpresaListItem />
            <EmpresaListItem /> {/* Ejemplos de empresas */}
            <EmpresaListItem />
            <EmpresaListItem />
            <EmpresaListItem />
          </div>
        </aside>

        <div className={styles.empresa__body}>
          <div className={styles.empresa__header}>
            <div className={styles.empresa__tittleContainer}>
              <h2 className={styles.empresa__tittle}>Sucursales en: Nombre</h2>
            </div>
            <div className={styles.empresa__bottonContainer}>
              <button className={styles.empresa__button}>
                Agregar sucursal
              </button>
            </div>
          </div>
          <div className={styles.empresa__content}>
            <div className={styles.empresa__cardsContainer}>
              <EmpresaCard />
              <EmpresaCard />
              <EmpresaCard />
              <EmpresaCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
