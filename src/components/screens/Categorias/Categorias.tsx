import styles from "./Categorias.module.css";
import { AsideAdministracion } from "../../ui/AsideAdministracion/AsideAdministracion";

export const Categorias = () => {
  return (
    <div className={"aside-main__container"}>
      <AsideAdministracion empresaTittle="Empresa" />

      <div className={styles.categoria__body}>
        <div className={styles.categoria__header}>
          <div className={styles.categoria__filterContainer}>
            Categorías:
          </div>
          <div>
            <button className="add__button">AGREGAR UN PRODUCTO</button>
          </div>
        </div>
        <div className={styles.categoria__content}>
          <div className={styles.categoria__itemsContainer}>
            <h1>funciona</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
