import { NavLink } from "react-router-dom";
import styles from "./AsideAdministracion.module.css";
import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ISucursal } from "../../../types/ISucursal";
import { IEmpresa } from "../../../types/IEmpresa";

interface IAside {
  empresa: IEmpresa,
  sucursal: ISucursal
}

export const AsideAdministracion: FC<IAside> = ({empresa, sucursal}) => {
  
  return (
    <aside className={styles.asideCategories}>
      <NavLink to={`/empresa/${empresa.cuit}`} className={styles.asideCategories__backContainer}>
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
          {empresa.name}
        </h4>
      </NavLink>
      <div className={styles.asideCategories__Container}>
        <h2 style={{ textTransform: "capitalize", textAlign: "center"}}>Administración</h2>
        <nav className={styles.asideCategories__linkContainer}>
          <NavLink
            to={`/empresa/${empresa.cuit}/sucursal/${sucursal.idSucursal}/alergenos`}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.linkActive}` : styles.link
            }
          >
            Alergenos
          </NavLink>
          <NavLink
            to={`/empresa/${empresa.cuit}/sucursal/${sucursal.idSucursal}/categorias`}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.linkActive}` : styles.link
            }
          >
            Categorias
          </NavLink>
          <NavLink
            to={`/empresa/${empresa.cuit}/sucursal/${sucursal.idSucursal}/productos`}
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
