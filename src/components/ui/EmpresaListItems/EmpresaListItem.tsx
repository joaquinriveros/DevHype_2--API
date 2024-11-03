import { faEye, faPen } from "@fortawesome/free-solid-svg-icons";
import styles from "./EmpresaListItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IEmpresa } from "../../../types/IEmpresa";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface IListEmpresas {
  empresas: IEmpresa[];
}

export const EmpresaListItem: FC<IListEmpresas> = ({ empresas }) => {
  const navigate = useNavigate();
  const handleEmpresaNavigate = (cuit:string)=>{
    navigate(`/empresa/${cuit}`)
  }
  return (
    <div className={styles.listItems__container}>
      {empresas.map((empresa) => (
        <div className={styles.item__container} onClick={() => {handleEmpresaNavigate(empresa.cuit)
          
        }}>
          <h4 className={styles.item__tittle}>{empresa.name}</h4>
          <div className={styles.item__buttonContainer}>
            <button className="boxStyle__icon">
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button className="boxStyle__icon">
              <FontAwesomeIcon icon={faEye} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
