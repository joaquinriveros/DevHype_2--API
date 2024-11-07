import { NavLink } from "react-router-dom";
import styles from "./AsideAdministracion.module.css";
import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface ITittleAside {
  empresaTittle: string;
}

export const AsideAdministracion: FC<ITittleAside> = ({
  empresaTittle,
}) => {
  return (
    <aside className={styles.asideCategories}>
      <NavLink to="/" className={styles.asideCategories__backContainer}>
        <div className={styles.asideCategories__backIcon}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <h4
          style={{
            textTransform: "uppercase",
            fontSize: "1.2rem",
            margin: "0px",
          }}
        >
          {empresaTittle}
        </h4>
      </NavLink>
      <div className={styles.asideCategories__Container}>
        <h2 style={{ textTransform: "capitalize" }}>Administración</h2>
        <nav className={styles.asideCategories__linkContainer}>
          <NavLink
            to="/alergenos/idEjemplo"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.linkActive}` : styles.link
            }
          >
            Alergenos
          </NavLink>
          <NavLink
            to="/categorias/idEjemplo"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.linkActive}` : styles.link
            }
          >
            Categorias
          </NavLink>
          <NavLink
            to="/productos/idEjemplo"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.linkActive}` : styles.link
            }
          >
            Productos
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};
