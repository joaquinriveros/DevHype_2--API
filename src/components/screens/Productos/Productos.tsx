import { AsideAdministracion } from "../../ui/AsideAdministracion/AsideAdministracion";
import styles from "./Prosuctos.module.css";
import { AccionesProducto } from "../../ui/AccionesProducto/AccionesProducto";
import { useEffect, useState } from "react";
import { IProduct } from "../../../types/IProduct";
import { useParams } from "react-router-dom";
import { empresas } from "../../../data/empresas";
import { IEmpresa } from "../../../types/IEmpresa";
import { ISucursal } from "../../../types/ISucursal";
import { ErrorPage } from "../../ui/ErrorPage/ErrorPage";

export const Productos = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [productsFiltered, setProductsFiltered] = useState<IProduct[]>([]);
  const [empresa, setEmpresa] = useState<null | IEmpresa>(null);
  const [sucursal, setSucursal] = useState<null | ISucursal>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { empresaCuit, sucursalId } = useParams();

  const getParams = () => {
    const resultEmpresa = empresas.find((emp) => emp.cuit === empresaCuit);
    resultEmpresa ? setEmpresa(resultEmpresa) : setEmpresa(null);

    const resultSucursal = empresa?.sucursales.find(
      (suc) => suc.idSucursal === sucursalId
    );
    resultSucursal ? setSucursal(resultSucursal) : setSucursal(null);
    setIsLoading(false);
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
        setProductsFiltered(sucursal.productos);
      } else {
        const filtered = sucursal?.productos.filter(
          (item) => item.category === selectedCategory
        );
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
                {productsFiltered.map((category, index) => (
                  <tr key={index}>
                    <td>{category.name}</td>
                    <td>${category.price}</td>
                    <td>{category.description}</td>
                    <td>{category.category}</td>
                    <td>{category.status}</td>
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
