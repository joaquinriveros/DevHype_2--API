import { AsideAdministracion } from "../../ui/AsideAdministracion/AsideAdministracion";
import styles from "./Prosuctos.module.css";
import { AccionesProducto } from "../../ui/AccionesProducto/AccionesProducto";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ErrorPage } from "../../ui/ErrorPage/ErrorPage";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { IProductos } from "../../../types/dtos/productos/IProductos";

export const Productos = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [productsFiltered, setProductsFiltered] = useState<IProductos[]>([]);
  const [empresa, setEmpresa] = useState<null | IEmpresa>(null);
  const [sucursal, setSucursal] = useState<null | ISucursal>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { empresaCuit, sucursalId } = useParams();

  // esta const de empresas es para dar una idea, luego se tiene que pasar
  const [empresas, setEmpresas] = useState<IEmpresa[]>([]);

  const getParams = () => {
    const resultEmpresa = empresas.find(
      (emp) => emp.cuit.toString() === empresaCuit
    );
    resultEmpresa ? setEmpresa(resultEmpresa) : setEmpresa(null);

    const resultSucursal = empresa?.sucursales.find(
      (suc) => suc.id.toString() === sucursalId
    );
    resultSucursal ? setSucursal(resultSucursal) : setSucursal(null);
    setIsLoading(false);
  };

  const getAllProducts = () => {
    const result: IProductos[] = [];

    if (sucursal !== null) {
      sucursal.categorias.forEach((cat) => {
        result.push(...cat.articulos);
      });
    }
    setProductsFiltered(result);
  };

  /* Productos ejemplo */

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    getParams();
  });

  useEffect(() => {
    if (sucursal !== null) {
      if (selectedCategory === "All") {
        getAllProducts();
      } else {
        const filtered: IProductos[] = [];
        sucursal.categorias.forEach((cat) => {
          if (cat.denominacion === selectedCategory) {
            filtered.push(...cat.articulos);
          }
        });
        setProductsFiltered(filtered);
      }
    }
  });

  if (isLoading) {
    return null; // O puedes mostrar un spinner aquí si prefieres
  }
  return empresa !== null && sucursal !== null ? (
    <div className={"aside-main__container"}>
      <AsideAdministracion empresa={empresa} sucursal={sucursal} />

      <div className={styles.producto__body}>
        <div className={styles.producto__header}>
          <div className={styles.producto__filterContainer}>
            <label htmlFor="filter__categoria">Filtrar por categoria: </label>
            <div>
              <select
                id="filter__categoria"
                className="gradiantStyle__button"
                value={selectedCategory}
                onChange={handleSelectChange}
              >
                <option style={{ textAlign: "center" }} value="All" selected>
                  Seleccionar una categoría
                </option>
                <option value="Electrodomesticos">Electrodomesticos</option>
                <option value="Smart Phones">Smart Phones</option>
                <option value="Notebooks">Notebooks</option>
              </select>
            </div>
          </div>
          <div>
            <button className="add__button">Agregar Producto</button>
          </div>
        </div>

        <div className={styles.producto__content}>
          <div className={styles.producto__tableContainer}>
            {/* tabla de productos */}
            <table className={styles.producto__table}>
              <thead>
                <tr>
                  <th style={{ width: "8rem" }}>Nombre</th>
                  <th style={{ width: "4rem" }}>Precio</th>
                  <th style={{ width: "20rem" }}>Descripción</th>
                  <th>Categoría</th>
                  <th>Estado</th>
                  <th style={{ width: "8rem" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productsFiltered.map((prod, index) => (
                  <tr key={index}>
                    <td>{prod.denominacion}</td>
                    <td>${prod.precioVenta}</td>
                    <td>{prod.descripcion}</td>
                    <td>{prod.categoria.denominacion}</td>
                    <td>{prod.habilitado}</td>
                    <td>
                      <AccionesProducto />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <ErrorPage mesaje="Pagina no encontrada" />
  );
};
