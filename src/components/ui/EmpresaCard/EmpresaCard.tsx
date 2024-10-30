import { useNavigate } from "react-router-dom";
import styles from "./EmpresaCard.module.css";

export const EmpresaCard = () => {

  const navigate = useNavigate();
  const handleCategoriesNavigate = () => {
    navigate(`/productos/idEjemplo`)
  };

  return (
    <div className={styles.card} onClick={handleCategoriesNavigate}>
      <h3 className={styles.card__tittle}>Empresa</h3>
      <img
        src="https://www.unicenter.com.ar/files/get/2850"
        className={styles.card__imagen}
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
