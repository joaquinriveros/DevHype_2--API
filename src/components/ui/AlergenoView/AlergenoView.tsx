import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./AlergenoView.module.css";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { IImagen } from "../../../types/IImagen";
import { useState } from "react";

interface AlergenoViewProps {
  alergeno: { denominacion: string; imagen?: IImagen | null };
  onClose: () => void; // Prop para cerrar el componente
}

export const AlergenoView: React.FC<AlergenoViewProps> = ({
  alergeno,
  onClose,
}) => {
  const [isImageError, setIsImageError] = useState(false);

  return (
    <div className={styles.Alergenoview__container}>
      <h3>{alergeno.denominacion}</h3>
      <div className={styles.Alergenoview__infoContainer}>
        <p className={styles.Alergenoview__txtCategory}>
          <b>Denominación:</b>
        </p>
        <p className={styles.Alergenoview__txtInfo}>{alergeno.denominacion}</p>
        <div className={styles.Alergenoview__img}>
          {isImageError || !alergeno.imagen ? (
            <FontAwesomeIcon icon={faImage} style={{ fontSize: "4rem" }} />
          ) : (
            <img
              src={alergeno.imagen.url}
              style={{
                width: "100%",
                height: "8rem",
                objectFit: "cover",
                borderRadius: "1rem",
              }}
              alt="Imagen del alérgeno"
              onError={() => setIsImageError(true)} // Si hay un error, activa el estado
            />
          )}
        </div>
      </div>
      <button className="add__button" onClick={onClose}>
        Cerrar
      </button>
    </div>
  );
};

export default AlergenoView;
