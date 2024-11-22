import { AsideAdministracion } from "../../ui/AsideAdministracion/AsideAdministracion";
import styles from "./Prosuctos.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ErrorPage } from "../../ui/ErrorPage/ErrorPage";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { IProductos } from "../../../types/dtos/productos/IProductos";
import { EmpresaService } from "../../../services/EmpresaService";
import { SucursalService } from "../../../services/SucursalService";
import { ProductoService } from "../../../services/ProductoService";
import { ICategorias } from "../../../types/dtos/categorias/ICategorias";
import { CategoriaService } from "../../../services/CategoriaService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEye,
  faPen,
  faTrashCan,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { ChargePage } from "../../ui/ChargePage/ChargePage";
import { FormProducto } from "../../ui/FormProducto/FormProducto";
import { FormEditProducto } from "../../ui/FormEditProducto/FormEditProducto";
import { ProductoView } from "../../ui/ProductoView/ProductoView";
import { DeletePopUp } from "../../ui/DeletePopUp/DeletePopUp";

export const Productos = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [productsFiltered, setProductsFiltered] = useState<IProductos[]>([]);
  const [productos, setProductos] = useState<IProductos[]>([]);
  const [categorias, setCategorias] = useState<ICategorias[]>([]);
  const [empresa, setEmpresa] = useState<null | IEmpresa>(null);
  const [sucursal, setSucursal] = useState<null | ISucursal>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const empresaService = new EmpresaService();
  const sucursalService = new SucursalService();
  const productoService = new ProductoService();
  const categoriaService = new CategoriaService();
  const idEmpresa = Number(useParams().empresaId);
  const idSucursal = Number(useParams().sucursalId);

  const [selectedViewProducto, setSelectedViewProducto] =
    useState<IProductos | null>(null);
  const [selectedEditProducto, setSelectedEditProducto] =
    useState<IProductos | null>(null);
  const [selectedDeleteProducto, setSelectedDeleteProducto] =
    useState<IProductos | null>(null);
  const [isFormProductoVisible, setIsFormProductoVisible] =
    useState<boolean>(false);

  // Alergeno form
  const toggleFormProducto = async () => {
    if (isFormProductoVisible) {
      await fetchData();
    }
    setIsFormProductoVisible(!isFormProductoVisible); // Función para mostrar el formulario
  };

  

  // Producto delete
  const handleProductoClickDelete = (productoClicked: IProductos) => {
    setSelectedDeleteProducto(productoClicked);
  };
  const closeDeleteProducto = async() => {
    await fetchData();
    setSelectedDeleteProducto(null);
  };

  // Producto view
  const handleProductoClickView = (productoClicked: IProductos) => {
    setSelectedViewProducto(productoClicked);
  };
  const closeViewProducto = () => {
    setSelectedViewProducto(null);
  };

  // Producto edit
  const handleProductoClickEdit = (productoClicked: IProductos) => {
    setSelectedEditProducto(productoClicked);
  };
  const closeEditProducto = async () => {
    await fetchData();
    await setSelectedEditProducto(null);
  };

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

  // Obtener los productos
  const traerProductos = async (idSucursal: number): Promise<IProductos[]> => {
    try {
      const result = await productoService.getProductosPorSucursal(idSucursal);
      return result || []; // Devuelve los datos obtenidos
    } catch (error) {
      console.error("Error al buscar la empresa:", error);
      return []; // Devuelve un array vacío en caso de error
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

      const resultProductos = idSucursal
        ? await traerProductos(idSucursal)
        : [];

      const resultCategorias = idSucursal
        ? await traerCategorias(idSucursal)
        : [];

      setEmpresa(resultEmpresa);
      setSucursal(resultSucursal);
      setProductos(resultProductos);
      setProductsFiltered(resultProductos);
      setCategorias(resultCategorias);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      setEmpresa(null); // En caso de error, setea empresa como null
    } finally {
      setIsLoading(false); // Oculta el mensaje de carga al finalizar
    }
  };

  // Handles
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    console.log(event.target.value);
    const result =
      event.target.value === "All"
        ? productos
        : productos.filter((prod) => {
            return prod.categoria.denominacion === event.target.value;
          });
    setProductsFiltered(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <ChargePage />;
  }
  return empresa !== null && sucursal !== null ? (
    <div className={"aside-main__container"}>
      {isFormProductoVisible && (
        <div className="overlay">
          <FormProducto categorias={categorias} onClose={toggleFormProducto} />
        </div>
      )}
      {selectedDeleteProducto && (
        <div className="overlay">
          <DeletePopUp producto={selectedDeleteProducto} onClose={closeDeleteProducto} />
        </div>
      )}
      {selectedViewProducto && (
        <div className="overlay">
          {
            <ProductoView
              producto={selectedViewProducto}
              onClose={closeViewProducto}
            />
          }
        </div>
      )}
      {selectedEditProducto && (
        <div className="overlay">
          {
            <FormEditProducto
              categorias={categorias}
              producto={selectedEditProducto}
              onClose={closeEditProducto}
            />
          }
        </div>
      )}

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
                {categorias.length > 0
                  ? categorias.map((cat) => {
                      return (
                        <option key={cat.id} value={cat.denominacion}>
                          {cat.denominacion.length > 20
                            ? `${cat.denominacion.substring(0, 30)}...`
                            : cat.denominacion}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
          </div>
          <div>
            <button className="add__button" onClick={toggleFormProducto}>
              Agregar Producto
            </button>
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
                  <th style={{ width: "8rem", textAlign: "center" }}>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {productsFiltered
                  .filter((prod) => !prod.eliminado) // Filtra los productos no eliminados
                  .map((prod, index) => (
                    <tr key={index}>
                      <td>{prod.denominacion}</td>
                      <td>${prod.precioVenta}</td>
                      <td>{prod.descripcion}</td>
                      <td>{prod.categoria.denominacion}</td>
                      <td>
                        {prod.habilitado ? (
                          <div
                            className="boxStyle__iconGreen"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <FontAwesomeIcon icon={faCheck} size="xl" />
                          </div>
                        ) : (
                          <div
                            className="boxStyle__iconRed"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <FontAwesomeIcon icon={faX} size="xl" />
                          </div>
                        )}
                      </td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: ".5rem",
                          }}
                        >
                          <button
                            className="boxStyle__icon"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleProductoClickEdit(prod);
                            }}
                          >
                            <FontAwesomeIcon icon={faPen} />
                          </button>
                          <button
                            className="boxStyle__icon"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleProductoClickView(prod);
                            }}
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                          <button className="boxStyle__iconRed" onClick={(event) => {
                              event.stopPropagation();
                              handleProductoClickDelete(prod);
                            }}>
                            <FontAwesomeIcon icon={faTrashCan} />
                          </button>
                        </div>
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
