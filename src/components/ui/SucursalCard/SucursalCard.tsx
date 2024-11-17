import { useNavigate, useParams } from "react-router-dom";
import styles from "./SucursalCard.module.css";
import { FC, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faPen, faEye, faImage } from "@fortawesome/free-solid-svg-icons";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";

interface ISucursalCard{
  sucursal: ISucursal;
}
export const SucursalCard: FC<ISucursalCard> = ({ sucursal }) => {
  const [isImageError, setIsImageError] = useState(false);
  const { empresaCuit } = useParams();

  const navigate = useNavigate();
  const handleCategoriesNavigate = () => {
    navigate(`/empresa/${empresaCuit}/sucursal/${sucursal.id}/productos`)
  };

  return (
    <div className={styles.card} onClick={handleCategoriesNavigate}>
      <h3 className={styles.card__tittle}>{sucursal.nombre}</h3>
      {isImageError || !sucursal.logo ? (
        <FontAwesomeIcon icon={faImage} style={{ fontSize: "4rem" }} />
      ) : (
        <img
          src={sucursal.logo}
          className={styles.card__imagen}
          alt="Sucursal img"
          onError={() => setIsImageError(true)} // Si hay un error, activa el estado
        />
      )}
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
