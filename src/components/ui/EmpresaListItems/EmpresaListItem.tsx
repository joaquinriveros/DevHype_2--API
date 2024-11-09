import { faPen, faEye } from "@fortawesome/free-solid-svg-icons";
import styles from "./EmpresaListItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IEmpresa } from "../../../types/IEmpresa";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface IListEmpresas {
  empresas: IEmpresa[];
  onViewEmpresClick: (empresaClicked: IEmpresa)=> void;
  onEditEmpresClick: (empresaClicked: IEmpresa)=> void;
}

export const EmpresaListItem: FC<IListEmpresas> = ({ empresas, onViewEmpresClick, onEditEmpresClick}) => {
  const navigate = useNavigate();
  const handleEmpresaNavigate = (cuit: string) => {
    navigate(`/empresa/${cuit}`);
  };
  return (
    <div className={styles.listItems__container}>
      {empresas.map((empresa) => (
        <div
          className={styles.item__container}
          onClick={() => {
            handleEmpresaNavigate(empresa.cuit);
          }}
        >
          <h4 className={styles.item__tittle}>{empresa.name}</h4>
          <div className={styles.item__buttonContainer}>
            <button
              className="boxStyle__icon"
              onClick={(event) => {
                event.stopPropagation();
                onEditEmpresClick(empresa)
              }}
            >
              <FontAwesomeIcon icon={faPen} size="lg"/>
            </button>
            <button
              className="boxStyle__icon"
              onClick={(event) => {
                event.stopPropagation();
                onViewEmpresClick(empresa)
              }}
            >
              <FontAwesomeIcon icon={faEye} size="lg"/> 
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
