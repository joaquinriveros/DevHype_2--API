import { useNavigate, useParams } from "react-router-dom";
import styles from "./SucursalCard.module.css";
import { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faPen,
  faEye,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";

interface ISucursalCard {
  sucursal: ISucursal;
  onViewSucursalClick: (sucursalClicked: ISucursal) => void;
  onEditSucursalClick: (sucursalClicked: ISucursal) => void;
}
export const SucursalCard: FC<ISucursalCard> = ({
  sucursal,
  onViewSucursalClick,
  onEditSucursalClick,
}) => {
  const [isImageError, setIsImageError] = useState(false);
  const idEmpresa = Number(useParams().empresaId);

  const navigate = useNavigate();
  const handleCategoriesNavigate = () => {
    navigate(`/empresa/${idEmpresa}/sucursal/${sucursal.id}/productos`);
  };

  return (
    <div className={styles.card} onClick={handleCategoriesNavigate}>
      {isImageError || !sucursal.logo ? (
        <div className={styles.card__iconContainer}>
          <FontAwesomeIcon icon={faImage} style={{ fontSize: "4rem" }} />
        </div>
      ) : (
        <img
          src={sucursal.logo}
          className={styles.card__imagen}
          alt="Sucursal img"
          onError={() => setIsImageError(true)} // Si hay un error, activa el estado
        />
      )}
      <h3 className={styles.card__tittle}>{sucursal.nombre}</h3>
      <div className={styles.card__buttonContainer}>
        <button className="boxStyle__icon">
          <FontAwesomeIcon icon={faBuilding} size="lg" />
        </button>
        <button className="boxStyle__icon" onClick={(event) => {
            event.stopPropagation();
            onEditSucursalClick(sucursal);
          }}>
          <FontAwesomeIcon icon={faPen} size="lg" />
        </button>
        <button
          className="boxStyle__icon"
          onClick={(event) => {
            event.stopPropagation();
            onViewSucursalClick(sucursal);
          }}
        >
          <FontAwesomeIcon icon={faEye} size="lg" />
        </button>
      </div>
    </div>
  );
};
