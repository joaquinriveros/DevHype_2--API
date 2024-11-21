import styles from "./Categorias.module.css";
import { AsideAdministracion } from "../../ui/AsideAdministracion/AsideAdministracion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ErrorPage } from "../../ui/ErrorPage/ErrorPage";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { EmpresaService } from "../../../services/EmpresaService";
import { ICategorias } from "../../../types/dtos/categorias/ICategorias";
import { SucursalService } from "../../../services/SucursalService";
import { ProductoService } from "../../../services/ProductoService";
import { CategoriaService } from "../../../services/CategoriaService";

export const Categorias = () => {
  const [empresa, setEmpresa] = useState<null | IEmpresa>(null);
  const [sucursal, setSucursal] = useState<null | ISucursal>(null);
  const [categorias, setCategorias] = useState<null | ICategorias[]>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const empresaService = new EmpresaService();
  const sucursalService = new SucursalService();
  const productoService = new ProductoService();
  const categoriaService = new CategoriaService();
  const idEmpresa = Number(useParams().empresaId);
  const idSucursal = Number(useParams().sucursalId);

  // Buscamos la empresa
  const buscarEmpresa = async (idEmpresa: number): Promise<IEmpresa | null> => {
    try {
      const result = await empresaService.getEmpresaById(idEmpresa);
      return result; // Devuelve los datos obtenidos
    } catch (error) {
      console.error("Error al buscar la empresa:", error);
      return null; // Devuelve un array vacío en caso de error
    }
  };

  //traemos las sucursales
  const buscarSucursal = async (
    idSucursal: number
  ): Promise<ISucursal | null> => {
    try {
      const result = await sucursalService.getSucursalById(idSucursal);
      return result || null; // Devuelve los datos obtenidos
    } catch (error) {
      console.error("Error al buscar sucursales:", error);
      return null; // Devuelve un array vacío en caso de error
    }
  };

  // Obtener las categorias
  const traerCategorias = async (
    idSucursal: number
  ): Promise<ICategorias[]> => {
    try {
      const result = await categoriaService.getAllCategoriaPorSucursal(
        idSucursal
      );
      return result || []; // Devuelve los datos obtenidos
    } catch (error) {
      console.error("Error al buscar la empresa:", error);
      return []; // Devuelve un array vacío en caso de error
    }
  };

  // Traemos los datos de manera correcta
  const fetchData = async () => {
    try {
      const resultEmpresa = idEmpresa ? await buscarEmpresa(idEmpresa) : null;

      const resultSucursal = idSucursal
        ? await buscarSucursal(idSucursal)
        : null;

      const resultCategorias = idSucursal
        ? await traerCategorias(idSucursal)
        : [];

      setEmpresa(resultEmpresa);
      setSucursal(resultSucursal);
      setCategorias(resultCategorias);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      setEmpresa(null); // En caso de error, setea empresa como null
    } finally {
      setIsLoading(false); // Oculta el mensaje de carga al finalizar
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return null; // O puedes mostrar un spinner aquí si prefieres
  }
  return empresa !== null && sucursal !== null ? (
    <div className={"aside-main__container"}>
      <AsideAdministracion empresa={empresa} sucursal={sucursal} />

      <div className={styles.categoria__body}>
        <div className={styles.categoria__header}>
          <div className={styles.categoria__filterContainer}>Categorías:</div>
          <div>
            <button className="add__button">AGREGAR UN PRODUCTO</button>
          </div>
        </div>
        <div className={styles.categoria__content}>
          <div className={styles.categoria__itemsContainer}>
            <h1>funciona</h1>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <ErrorPage mesaje="Pagina no encontrada" />
  );
};
