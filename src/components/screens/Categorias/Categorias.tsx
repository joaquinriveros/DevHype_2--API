import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Categorias.module.css";
import { AsideAdministracion } from "../../ui/AsideAdministracion/AsideAdministracion";
import { ErrorPage } from "../../ui/ErrorPage/ErrorPage";
import { CategoriaService } from "../../../services/CategoriaService";
import { EmpresaService } from "../../../services/EmpresaService";
import { SucursalService } from "../../../services/SucursalService";
import { ICategorias } from "../../../types/dtos/categorias/ICategorias";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { ChargePage } from "../../ui/ChargePage/ChargePage";

export const Categorias = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [empresa, setEmpresa] = useState<IEmpresa | null>(null);
  const [sucursal, setSucursal] = useState<ISucursal | null>(null);
  const [categorias, setCategorias] = useState<ICategorias[]>([]);

  const idEmpresa = Number(useParams().empresaId);
  const idSucursal = Number(useParams().sucursalId);

  const categoriaService = new CategoriaService();
  const empresaService = new EmpresaService();
  const sucursalService = new SucursalService();

  const fetchCategorias = async (idEmpresa: number) => {
    try {
      const result = await categoriaService.getAllCategoriaPorEmpresa(
        idEmpresa
      );
      return result || [];
    } catch (error) {
      console.error("Error al traer las categorías:", error);
      return [];
    }
  };

  const fetchEmpresa = async (idEmpresa: number) => {
    try {
      return await empresaService.getEmpresaById(idEmpresa);
    } catch (error) {
      console.error("Error al traer la empresa:", error);
      return null;
    }
  };

  const fetchSucursal = async (idSucursal: number) => {
    try {
      return await sucursalService.getSucursalById(idSucursal);
    } catch (error) {
      console.error("Error al traer la sucursal:", error);
      return null;
    }
  };

  const fetchData = async () => {
    try {
      if (!idEmpresa || !idSucursal) {
        throw new Error("IDs de empresa o sucursal no válidos");
      }

      const [resultCategorias, resultEmpresa, resultSucursal] =
        await Promise.all([
          fetchCategorias(idEmpresa),
          fetchEmpresa(idEmpresa),
          fetchSucursal(idSucursal),
        ]);

      setCategorias(resultCategorias);
      setEmpresa(resultEmpresa);
      setSucursal(resultSucursal);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <ChargePage />;
  }

  if (!empresa || !sucursal) {
    return <ErrorPage mesaje="Pagina no encontrada" />;
  }

  return (
    <div className={"aside-main__container"}>
      <AsideAdministracion empresa={empresa} sucursal={sucursal} />

      <div className={styles.categoria__body}>
        <div className={styles.categoria__header}>
          <h4>{`Cstegorias de ${empresa.nombre}`}</h4>
          <button className="add__button">AGREGAR CATEGORÍA</button>
        </div>

        <div className={styles.categoria__content}>
          <div className={styles.categoria__tableContainer}>
            {/* tabla de productos */}
            <table className={styles.categoria__table}>
              <thead>
                <tr>
                  <th style={{ width: "1fr" }}>Nombre</th>
                  <th style={{ width: "1fr", textAlign: "right" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categorias &&
                  categorias
                    .filter((cat) => {
                      !cat.categoriaPadre;
                    }) // Filtra las categorías principales
                    .map((cat) => (
                      <tr key={cat.id}>
                        <td>{cat.denominacion}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
