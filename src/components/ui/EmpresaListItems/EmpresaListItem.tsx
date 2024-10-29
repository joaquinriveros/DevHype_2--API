import { faEye, faPen } from "@fortawesome/free-solid-svg-icons";
import styles from "./EmpresaListItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const EmpresaListItem = () => {
  return (
    <div className={styles.item__container}>
      <h4 className={styles.item__tittle}>Nombre Empresa</h4>
      <div className={styles.item__buttonContainer}>
        <button className={styles.item__btOption}>
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button className={styles.item__btOption}>
          <FontAwesomeIcon icon={faEye} />
        </button>
      </div>
    </div>
  );
};
