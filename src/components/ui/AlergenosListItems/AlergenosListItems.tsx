import { faPen, faEye } from "@fortawesome/free-solid-svg-icons";
import styles from "./AlergenosListItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { IAlergenos } from "../../../types/dtos/alergenos/IAlergenos";

interface IListAlergenos {
    alergenos: IAlergenos[];
    onViewAlergenoClick: (alergenoClicked: IAlergenos) => void;
    onEditAlergenoClick: (alergenoClicked: IAlergenos) => void;
}

export const AlergenosListItem: FC<IListAlergenos> = ({
    alergenos,
    onViewAlergenoClick,
    onEditAlergenoClick,
}) => {
    const navigate = useNavigate();
    const handleAlergenoNavigate = (idAlergeno: number) => {
        navigate(`/alergeno/${idAlergeno}`);
    };

    return (
        <div className={styles.listItems__container}>
            {alergenos.map((alergeno) => (
                <div
                    key={alergeno.id}
                    className={styles.item__container}
                    onClick={() => {
                        handleAlergenoNavigate(alergeno.id);
                    }}
                >
                    <h4 className={styles.item__tittle}>{alergeno.denominacion}</h4>
                    <div className={styles.item__buttonContainer}>
                        <button
                            className="boxStyle__icon"
                            onClick={(event) => {
                                event.stopPropagation();
                                onEditAlergenoClick(alergeno);
                            }}
                        >
                            <FontAwesomeIcon icon={faPen} size="lg" />
                        </button>
                        <button
                            className="boxStyle__icon"
                            onClick={(event) => {
                                event.stopPropagation();
                                onViewAlergenoClick(alergeno);
                            }}
                        >
                            <FontAwesomeIcon icon={faEye} size="lg" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AlergenosListItem;
