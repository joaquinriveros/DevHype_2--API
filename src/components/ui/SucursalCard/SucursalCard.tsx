import { useNavigate } from "react-router-dom";
import styles from "./SucursalCard.module.css";
import { ISucursal } from "../../../types/ISucursal";
import { FC } from "react";

interface ISucursalCard{
  sucursal: ISucursal;
}
export const SucursalCard: FC<ISucursalCard> = ({ sucursal }) => {


  const navigate = useNavigate();
  const handleCategoriesNavigate = () => {
    navigate(`/productos/${sucursal.name}`)
  };

  return (
    <div className={styles.card} onClick={handleCategoriesNavigate}>
      <h3 className={styles.card__tittle}>{sucursal.name}</h3>
      <img
        src={sucursal.url}
        className={styles.card__imagen}
        alt="Sucursal img"
      />
      <div className={styles.card__buttonContainer}>
        <button className={styles.card__btOption}>
          <span className="material-symbols-outlined">domain</span>
        </button>
        <button className={styles.card__btOption}>
          <span className="material-symbols-outlined">edit</span>
        </button>
        <button className={styles.card__btOption}>
          <span className="material-symbols-outlined">visibility</span>
        </button>
      </div>
    </div>
  );
};
