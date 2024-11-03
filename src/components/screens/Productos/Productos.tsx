import { AsideAdministracion } from "../../ui/AsideAdministracion/AsideAdministracion";
import styles from "./Prosuctos.module.css";
import { AccionesProducto } from "../../ui/AccionesProducto/AccionesProducto";
import { useEffect, useState } from "react";
import { IProduct } from "../../../types/IProduct";

export const Productos = () => {

  const [selectedCategory, setSelectedCategory] = useState("All"); 
  const [productsFiltered, setProductsFiltered] = useState<IProduct[]>([])
  
  /* Productos ejemplo */
  const productsEj: IProduct[] = [
    
  ];

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value); 
    console.log(event.target.value)
  };

  useEffect(()=>{
    if (selectedCategory === 'All'){ 
      setProductsFiltered(productsEj)
    }else{
      const filtered = productsEj.filter(
        (item) => item.category === selectedCategory
      );
      setProductsFiltered(filtered);
    }
  })

  return (
    <div className={"aside-main__container"}>
      <AsideAdministracion empresaTittle="Samsung Argentina" />

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
                <option value="All" selected>Todos</option>
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
  );
};
