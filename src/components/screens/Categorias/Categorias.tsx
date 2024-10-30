import styles from "./Categorias.module.css";
import { AsideAdministracion } from "../../ui/AsideAdministracion/AsideAdministracion";
import { Form } from "react-bootstrap";

export const Categorias = () => {
  return (
    <div className={"aside-main__container"}>
      <AsideAdministracion empresaTittle="Samsung Argentina" />

      <div className={styles.categoria__body}>
        <div className={styles.categoria__header}>
          <div className={styles.categoria__filterContainer}>
            <label htmlFor="filter__categoria">Filtrar por categoria: </label>
            <div>
              <select id="filter__categoria" className="gradiantStyle__button">
                <option defaultChecked disabled>
                  Open this select menu
                </option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
          <div>
            <button className="add__button">Agregar sucursal</button>
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
