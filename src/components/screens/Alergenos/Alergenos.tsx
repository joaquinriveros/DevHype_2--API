import styles from "./Alergenos.module.css"
import { AsideAdministracion } from "../../ui/AsideAdministracion/AsideAdministracion";
export const Alergenos = () => {
  return(
    <div className={"aside-main__container"}>
      <AsideAdministracion empresaTittle="Empresa" />

      <div className={styles.alergeno__body}>
        <div className={styles.alergeno__header}>
          <div>
            <button className="add__button">ALÉRGENOS</button>
          </div>
        </div>
        <div className={styles.alergeno__content}>
          <div className={styles.alergeno__itemsContainer}>
            <div className={styles.alergeno__tableContainer}>
              <table className={styles.alergeno__table}>
                <thead>
                  <tr>
                      <th style={{ width: "86.5%", textAlign: "center" }}>Nombre</th>
                      <th style={{ width: "13.5%", textAlign: "center" }}>Acciones</th>
                  </tr>
                </thead>
              </table>
             </div>  
          </div>
        </div>
      </div>
    </div>
  )
}