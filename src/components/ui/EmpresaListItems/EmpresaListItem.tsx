import { faPen, faEye } from "@fortawesome/free-solid-svg-icons";
import styles from "./EmpresaListItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";

interface IListEmpresas {
  empresas: IEmpresa[];
  onViewEmpresClick: (empresaClicked: IEmpresa)=> void;
  onEditEmpresClick: (empresaClicked: IEmpresa)=> void;
}

export const EmpresaListItem: FC<IListEmpresas> = ({ empresas, onViewEmpresClick, onEditEmpresClick}) => {
  const navigate = useNavigate();
  const handleEmpresaNavigate = (idEmpresa: number) => {
    navigate(`/empresa/${idEmpresa}`);
  };
  return (
    <div className={styles.listItems__container}>
      {empresas.map((empresa) => (
        <div
          className={styles.item__container}
          onClick={() => {
            handleEmpresaNavigate(empresa.id);
          }}
        >
          <h4 className={styles.item__tittle}>{empresa.nombre}</h4>
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
