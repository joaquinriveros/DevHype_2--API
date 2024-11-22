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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faFolderPlus,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import FormCategoria from "../../ui/FormCategoria/FormCategoria";
import FormEditCategoria from "../../ui/FormEditCategoria/FormEditCategoria";
import FormSubCategoria from "../../ui/FormSubCategoria/FormSubCategoria";

export const Categorias = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [empresa, setEmpresa] = useState<IEmpresa | null>(null);
  const [sucursal, setSucursal] = useState<ISucursal | null>(null);
  const [categorias, setCategorias] = useState<ICategorias[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<
    Record<number, boolean>
  >({});
  const [isFormCategoriaVisible, setIsFormCategoriaVisible] =
    useState<boolean>(false);
  const [selectedEditCategoria, setSelectedEditCategoria] =
    useState<ICategorias | null>(null);
  const [selectedSubCategoria, setSelectedSubCategoria] =
    useState<ICategorias | null>(null);

  const idEmpresa = Number(useParams().empresaId);
  const idSucursal = Number(useParams().sucursalId);

  const categoriaService = new CategoriaService();
  const empresaService = new EmpresaService();
  const sucursalService = new SucursalService();

  // Categoria form
  const toggleFormCategoria = async () => {
    if (isFormCategoriaVisible) {
      await fetchData();
    }
    setIsFormCategoriaVisible(!isFormCategoriaVisible); // Función para mostrar el formulario
  };

  // Categoria edit
  const handleCategoriaClickEdit = (categoriaClicked: ICategorias) => {
    setSelectedEditCategoria(categoriaClicked);
    console.log(categoriaClicked);
  };
  const closeEditCategoria = async () => {
    setSelectedEditCategoria(null); // Cierra el formulario
    await fetchData(); // Actualiza los datos después
  };

  // subCategoria
  const handleSubCategoriaClick = (categoriaClicked: ICategorias) => {
    setSelectedSubCategoria(categoriaClicked);
    console.log(categoriaClicked);
  };
  const closeSubCategoria = async () => {
    setSelectedSubCategoria(null); // Cierra el formulario
    await fetchData(); // Actualiza los datos después
  };

  // fetchs
  const fetchCategorias = async (idEmpresa: number) => {
    try {
      const result = await categoriaService.getAllCategoriaPorEmpresa(
        idEmpresa
      );
      console.log("Categorías obtenidas:", result);
      return result || [];
    } catch (error) {
      console.error("Error al traer las categorías:", error);
      return [];
    }
  };

  const fetchEmpresa = async (idEmpresa: number) => {
    try {
      const result = await empresaService.getEmpresaById(idEmpresa);
      return result;
    } catch (error) {
      console.error("Error al traer la empresa:", error);
      return null;
    }
  };

  const fetchSucursal = async (idSucursal: number) => {
    try {
      const result = await sucursalService.getSucursalById(idSucursal);
      return result;
    } catch (error) {
      console.error("Error al traer la sucursal:", error);
      return null;
    }
  };

  const fetchData = async () => {
    try {
      const resultadoCategorias = await fetchCategorias(idEmpresa);
      const resulEmpresa = await fetchEmpresa(idEmpresa);
      const resultadoSucursal = await fetchSucursal(idSucursal);

      setCategorias(resultadoCategorias);
      setEmpresa(resulEmpresa);
      setSucursal(resultadoSucursal);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  if (isLoading) {
    return <ChargePage />;
  }

  if (!empresa || !sucursal) {
    return <ErrorPage mesaje="Página no encontrada" />;
  }

  return (
    <div className={"aside-main__container"}>
      {isFormCategoriaVisible && (
        <div className="overlay">
          <FormCategoria onClose={toggleFormCategoria} />
        </div>
      )}
      {selectedEditCategoria && (
        <div className="overlay">
          {
            <FormEditCategoria
              categoria={selectedEditCategoria}
              onClose={closeEditCategoria}
            />
          }
        </div>
      )}
      {selectedSubCategoria && (
        <div className="overlay">
          {
            <FormSubCategoria
              categoriaPadre={selectedSubCategoria}
              onClose={closeSubCategoria}
            />
          }
        </div>
      )}

      <AsideAdministracion empresa={empresa} sucursal={sucursal} />

      <div className={styles.categoria__body}>
        <div className={styles.categoria__header}>
          <h4>{`Categorías de ${empresa.nombre}`}</h4>
          <button className="add__button" onClick={toggleFormCategoria}>
            Agregar categoria
          </button>
        </div>

        <div className={styles.categoria__content}>
          <div className={styles.categoria__tableContainer}>
            {/* tabla de productos */}
            <div className={styles.categoria__table}>
              <div className={styles.categoria__labelTittle}>
                <div>
                  <h3>Nombre</h3>
                </div>
                <div>
                  <h3>Acciones</h3>
                </div>
              </div>

              <div className={styles.categoria__categoriesContainer}>
                {categorias.map((cat) => (
                  <div
                    className={`gradiantStyle__button ${styles.categoria__categories}`}
                  >
                    <span>{cat.denominacion}</span>

                    <div className={styles.categoria__actionContainer}>
                      {cat.subCategorias.length > 0 ? (
                        <button
                          className="boxStyle__icon"
                          onClick={() => handleToggleCategory(cat.id)}
                        >
                          <FontAwesomeIcon
                            icon={faCaretDown}
                            size="2xl"
                            style={{
                              transform: expandedCategories[cat.id]
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                              transition: "transform 0.3s ease",
                            }}
                          />
                        </button>
                      ) : (
                        <button
                          className="boxStyle__icon"
                          onClick={() => handleToggleCategory(cat.id)}
                          disabled
                          type="button"
                          style={{ transform: "none", opacity: "30%" }}
                        >
                          <FontAwesomeIcon
                            icon={faCaretDown}
                            size="2xl"
                            style={{
                              transform: expandedCategories[cat.id]
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                              transition: "transform 0.3s ease",
                            }}
                          />
                        </button>
                      )}

                      <button
                        className={`boxStyle__icon ${
                          !expandedCategories[cat.id] ? styles.disabled : ""
                        }`}
                        onClick={(event) => {
                          event.stopPropagation();
                          console.log("envio: ", cat);
                          handleCategoriaClickEdit(cat);
                        }}
                      >
                        <FontAwesomeIcon icon={faPen} size="lg" />
                      </button>

                      <button
                        className={`boxStyle__icon ${
                          !expandedCategories[cat.id] ? styles.disabled : ""
                        }`}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleSubCategoriaClick(cat);
                        }}
                      >
                        <FontAwesomeIcon icon={faFolderPlus} size="lg" />
                      </button>
                    </div>

                    {/* Subcategorías desplegables */}
                    {expandedCategories[cat.id] &&
                      cat.subCategorias.length > 0 && (
                        <div className={styles.subcategoriaContainer}>
                          {cat.subCategorias.map((subCat) => (
                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                margin: ".5rem 0px",
                              }}
                            >
                              <div className={styles.subcategoriaItem}>
                                {subCat.denominacion}
                              </div>
                              <div>
                                <button
                                  className={`boxStyle__icon ${
                                    !expandedCategories[cat.id]
                                      ? styles.disabled
                                      : ""
                                  }`}
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    handleCategoriaClickEdit(subCat);
                                  }}
                                >
                                  <FontAwesomeIcon icon={faPen} size="lg" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
