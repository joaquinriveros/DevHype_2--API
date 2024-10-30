import { AsideAdministracion } from "../../ui/AsideAdministracion/AsideAdministracion";
import styles from "./Prosuctos.module.css";
import { AccionesProducto } from "../../ui/AccionesProducto/AccionesProducto";

export const Productos = () => {
  /* Productos ejemplo */
  const productsEj = [
    {
      name: "Lavadora WW80J5555FX",
      price: 499,
      description:
        "Lavadora de carga frontal de 8 kg con tecnología EcoBubble para un lavado eficiente.",
      category: "Electrodomésticos",
      status: "Disponible",
    },
    {
      name: "Refrigerador RT38K5930S8",
      price: 799,
      description:
        "Refrigerador con sistema Twin Cooling para mayor frescura y conservación de alimentos.",
      category: "Electrodomésticos",
      status: "Disponible",
    },
    {
      name: "Microondas ME21M706BAS",
      price: 250,
      description:
        "Microondas de 2.1 pies cúbicos con función de convección y diseño de acero inoxidable.",
      category: "Electrodomésticos",
      status: "Agotado",
    },
    {
      name: "Aspiradora Jet 70",
      price: 329,
      description:
        "Aspiradora inalámbrica con succión de 150W y sistema de filtrado HEPA.",
      category: "Electrodomésticos",
      status: "Disponible",
    },
    {
      name: "Galaxy S23",
      price: 999,
      description:
        "Smartphone de última generación con cámara de 50MP y pantalla Dynamic AMOLED 2X.",
      category: "Smart Phones",
      status: "Disponible",
    },
    {
      name: "Galaxy A53",
      price: 349,
      description:
        "Teléfono con pantalla Super AMOLED de 6.5 pulgadas y batería de larga duración.",
      category: "Smart Phones",
      status: "Agotado",
    },
    {
      name: "Galaxy Z Flip4",
      price: 1099,
      description:
        "Smartphone plegable con pantalla flexible y diseño compacto.",
      category: "Smart Phones",
      status: "Disponible",
    },
    {
      name: "Galaxy Book Flex",
      price: 1299,
      description:
        "Notebook ultradelgada con pantalla QLED y procesador Intel i7 de 10ª generación.",
      category: "Notebooks",
      status: "Disponible",
    },
    {
      name: "Galaxy Book Go",
      price: 499,
      description:
        "Notebook ligera y económica con procesador Snapdragon, ideal para uso diario.",
      category: "Notebooks",
      status: "Disponible",
    },
    {
      name: "Galaxy Chromebook 2",
      price: 549,
      description:
        "Chromebook con pantalla QLED de 13.3 pulgadas y diseño ultradelgado.",
      category: "Notebooks",
      status: "Disponible",
    },
  ];

  return (
    <div className={"aside-main__container"}>
      <AsideAdministracion empresaTittle="Samsung Argentina" />

      <div className={styles.producto__body}>
        <div className={styles.producto__header}>
          <div className={styles.producto__filterContainer}>
            <label htmlFor="filter__categoria">Filtrar por categoria: </label>
            <div>
              <select id="filter__categoria" className="gradiantStyle__button">
                <option selected disabled>
                  Selec. Categoria
                </option>
                <option value="1">Electrodomesticos</option>
                <option value="2">Smart Phones</option>
                <option value="3">Notebooks</option>
              </select>
            </div>
          </div>
          <div>
            <button className="add__button">Agregar sucursal</button>
          </div>
        </div>
        <div className={styles.producto__content}>
          <div className={styles.producto__tableContainer}>

            
            <table className={styles.producto__table}>
              <thead>
                <tr>
                  <th style={{width: '8rem'}}>Nombre</th>
                  <th style={{width: '4rem'}}>Precio</th>
                  <th style={{width: '20rem'}}>Descripción</th>
                  <th>Categoría</th>
                  <th>Estado</th>
                  <th style={{width: '8rem'}}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productsEj.map((category, index) => (
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
