import { useNavigate, useParams } from "react-router-dom";
import styles from "./SucursalCard.module.css";
import { ISucursal } from "../../../types/ISucursal";
import { FC } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faPen, faEye } from "@fortawesome/free-solid-svg-icons";

interface ISucursalCard{
  sucursal: ISucursal;
}
export const SucursalCard: FC<ISucursalCard> = ({ sucursal }) => {
  const { empresaCuit } = useParams();

  const navigate = useNavigate();
  const handleCategoriesNavigate = () => {
    navigate(`/empresa/${empresaCuit}/sucursal/${sucursal.idSucursal}/productos`)
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
        <button className='boxStyle__icon'>
        <FontAwesomeIcon icon={faBuilding} size="lg" />
        </button>
        <button className='boxStyle__icon'>
        <FontAwesomeIcon icon={faPen} size="lg" />
        </button>
        <button className='boxStyle__icon'>
        <FontAwesomeIcon icon={faEye} size="lg" />
        </button>
      </div>
    </div>
  );
};
