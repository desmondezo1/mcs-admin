import styles from "../../../styles/Home.module.css";
import Head from "next/head";
import Header from "../../../components/molecules/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "../../../components/molecules/Nav";
import productCss from "../../../styles/prodotti/prodotti.module.css";
import { useFormik, Field, FormikProvider } from "formik";
import { useEffect, useState } from "react";
import { CategoriaData } from "../../../config/CategoriesData";
import Accordion, { AccordionList } from "../../../components/atoms/Accordion";
import { TagsInput } from "react-tag-input-component";
// import Cookies from 'js-cookie'
import Cok from "cookie";
import {
  brands as globalBrands,
  categories as globalCategories,
} from "../../../config/prodotti";
import axios from "axios";
import routeConfig from "../../../config/routeConfig";
// import { Formik, Form, useField } from 'formik';
// import TextArea from '../../components/atoms/form/formElements'

export default function Prodotti({ brands, categories }) {
  const [productOptions, setProductOptions] = useState([{ product: "" }]);
  const [allBrands, setBrands] = useState([]);
  const [selectedTag, setSelectedTag] = useState([]);

  const formik = useFormik({
    initialValues: {
      brand: "",
      description: "",
      title: "",
<<<<<<< HEAD
      pieces: [{ price: [0, 0], discount: [0, 0] , weight: '', packaging: ''}],
=======
      pieces: [{ price: [0, 0], discount: [0, 0], weight: "", packaging: "" }],
>>>>>>> 1acc2f91e9ce61187432f5782762ad6d5c80d1da
      pdf: "",
      image: [''],
      tag: "",
      volume: "",
      category: "",
      status: "",
      surface: "",
      uses: "",
      brand: "",
      description: "",
      title: "",
    },

    onSubmit: async (values, { resetForm }) => {
      let fTag = document.querySelector("form");
      const createProduct = routeConfig.createProduct;
      let formD = await values;
<<<<<<< HEAD
      console.log({formD})
=======
      console.log({formD});
>>>>>>> 1acc2f91e9ce61187432f5782762ad6d5c80d1da
      formD.tag = selectedTag;

      //grab all selected categories into an array
      let categories = [];
      let checkboxes = document.querySelectorAll(
        "input[type=checkbox]:checked"
      );
      for (var i = 0; i < checkboxes.length; i++) {
        categories.push(checkboxes[i].value);
      }

      let frmData = new FormData(fTag);
      frmData.append("pieces", JSON.stringify(formD.pieces));
      frmData.append("category", JSON.stringify(categories));
      frmData.append("tag", JSON.stringify(formD.tag));
      // console.log({ categories });
      const token = window.localStorage.getItem("token");
      // console.log({ formD });
      const axiosConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      };

      let ax = await axios
        .post(createProduct, frmData, axiosConfig)
        .then((result) => {
          if (result.status == 200) {
            toast.success("Added");
            console.log(result);
          } else {
            toast.error("Sorry, I guess something went wrong");
          }
          //   resetForm({values: ''})
          console.log(result);
        })
        .catch(function (error) {
          toast.error("Sorry, I guess something went wrong");
          console.log(error.response);
        });
    },
    enableReinitialize: true,
  });

  const handleProductAdd = () => {
    setProductOptions([...productOptions, { product: "" }]);
  };

  const {
    errors,
    touched,
    values,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    handleChange,
  } = formik;

  return (
    <>
      <style jsx>
        {`
          .productListWrapper {
            padding-bottom: 20px;
            margin-bottom: 10px;
            border-bottom: 1px solid #999999;
          }
        `}
      </style>
      <div className={styles.container}>
        <Head>
          <title>MCP- Application</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <Header>
            <p>Dashboard </p>
          </Header>
          <div className="dashboard_container">
            <Nav />
            <div className={styles.overview_body_container}>
              <h2>Aggiungi Prodotto</h2>
              <ToastContainer />
              <div className={productCss.formWrapper}>
                <FormikProvider value={formik}>
                  <form onSubmit={handleSubmit}>
                    <div className={productCss.formInputSection}>
                      <h3 className={productCss.formSectionH3}>
                        Info Generiche
                      </h3>
                      <div className={productCss.formInputWrapper}>
                        <div className={productCss.input}>
                          <label htmlFor="title">Titolo del Prodotto</label>
                          <input
                            id="title"
                            name="title"
                            type="text"
                            className="form-control"
                            onChange={handleChange}
                            value={values.title}
                          />
                        </div>

                        <div className={productCss.input}>
                          <label htmlFor="decription">Descrizione</label>
                          <textarea
                            row="6"
                            id="description"
                            name="description"
                            className="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                          ></textarea>
                        </div>

                        <div className={productCss.input}>
                          <label htmlFor="brand">Brand (Marca)</label>
                          <select
                            name="brand"
                            className="custom-select form-control"
                            onChange={formik.handleChange}
                            value={formik.values.brand}
                            id="brand"
                          >
                            <option selected>Brand..</option>
                            {brands.map((brand, index) => {
                              return (
                                <option key={index} value={brand.id}>
                                  {brand.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                    {/* --------------------------------------------------------------------------------------------- */}
                    {/* dynamic products  */}
                    <div className={productCss.formInputSection}>
                      <h3 className={productCss.formSectionH3}>
                        Pezzi e Prezzi
                      </h3>
                      <div className={productCss.dynamicListcontainer}>
                        {productOptions.map((singleProduct, index) => {
                          return (
                            <div
                              className={`${productCss.formInputWrapper} productListWrapper`}
                              key={index}
                            >
                              <label htmlFor="piece">Pezzo {index + 1}</label>
                              <div className={productCss.categoryTypeWrapper}>
                                <div className={productCss.input}>
                                  <label htmlFor="packaging">Confezione</label>
                                  <Field
                                    id="packaging"
                                    name={`pieces[${index}].packaging`}
                                    type="text"
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    // value={values?.pieces[index]?.packaging}
                                  />
                                </div>
                                <div className={productCss.input}>
                                  <label htmlFor="weight">Peso (kg)</label>
                                  <Field
                                    id="weight"
                                    name={`pieces[${index}].weight`}
                                    type="text"
                                    className="form-control"
                                    onChange={handleChange}
                                    // value={values?.pieces[index]?.weight}
                                  />
                                </div>
                                <div className={productCss.input}>
                                  <label htmlFor="quantity">Quantità</label>
                                  <Field
                                    id="quantity"
                                    name={`pieces[${index}].quantity`}
                                    type="text"
                                    className="form-control"
                                    onChange={handleChange}
                                    // value={values?.pieces[index]?.quantity}
                                  />
                                </div>
                              </div>

                              <div className={productCss.discountPriceWrapper}>
                                <div className={productCss.input}>
                                  <label htmlFor="price1">
                                    Prezzo (€) - Cat 1
                                  </label>
                                  <Field
                                    id="price1"
                                    name={`pieces[${index}].price[0]`}
                                    type="text"
                                    className="form-control"
                                    onChange={handleChange}
                                    // value={values?.pieces[index]?.price[0]}
                                  />
                                </div>
                                <div className={productCss.input}>
                                  <label htmlFor="price2">
                                    Prezzo (€) - Cat 2
                                  </label>
                                  <Field
                                    id="price2"
                                    name={`pieces[${index}].price[1]`}
                                    type="text"
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    // value={values?.pieces[index]?.price[1]
                                    // }
                                  />
                                </div>
                                <div className={productCss.input}>
                                  <label htmlFor="discount1">
                                    Sconto (%) - Cat 1
                                  </label>
                                  <Field
                                    id="discount1"
                                    name={`pieces[${index}].discount[0]`}
                                    type="text"
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    // value={values?.pieces[index]?.discount[0]}
                                  />
                                </div>
                                <div className={productCss.input}>
                                  <label htmlFor="discount2">
                                    Sconto (%) - Cat 2
                                  </label>
                                  <Field
                                    id="discount2"
                                    name={`pieces[${index}].discount[1]`}
                                    type="text"
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    // value={formik.values?.pieces[index]?.discount[1]}
                                  />
                                </div>
                              </div>

                              <div className={productCss.input}>
                                {productOptions.length - 1 == index && (
                                  <button onClick={handleProductAdd}>
                                    + AGGIUNGI PEZZO
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* add product uses  */}
                    <div className={productCss.formInputSection}>
                      <h3 className={productCss.formSectionH3}>
                        Informazione Aggiuntive
                      </h3>
                      <div className={`${productCss.formInputWrapper}`}>
                        <div className={productCss.input}>
                          <label htmlFor="uses">Usi</label>
                          <input
                            id="uses"
                            name="uses"
                            type="text"
                            className="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.uses}
                          />
                        </div>
                        <div className={productCss.input}>
                          <label htmlFor="surface_with">
                            Superficie da Trattare
                          </label>
                          <input
                            id="surface"
                            name="surface"
                            type="surface"
                            className="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.surface}
                          />
                        </div>
                        <div className={productCss.input}>
                          <label htmlFor="volume">Volume</label>
                          <input
                            id="volume"
                            name="volume"
                            type="text"
                            className="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.volume}
                          />
                        </div>
                      </div>
                    </div>

                    {/* upload pdf  */}
                    <div className={productCss.formInputSection}>
                      <h3 className={productCss.formSectionH3}>
                        Info Scheda Tecnica
                      </h3>
                      <div className={productCss.formInputWrapper}>
                        <div className={productCss.input}>
                          <label htmlFor="pdf">PDF</label>
                          <input
                            id="pdf"
                            name="pdf"
                            type="file"
                            className="form-control"
                            onChange={formik.handleChange}
                            value={values.pdf}
                          />
                        </div>
                      </div>
                    </div>

                    {/* upload product photo  */}
                    <div className={productCss.formInputSection}>
                      <h3 className={productCss.formSectionH3}>Media</h3>
                      <div className={productCss.formInputWrapper}>
                        <div className={productCss.input}>
                          <label htmlFor="image">Immagine</label>
                          <input
                            id="image"
                            name="image[]"
                            type="file"
                            className="form-control"
                            onChange={formik.handleChange}
                            value={values.image['']}
                            accept={"image/*"}
                            multiple
                          />
                        </div>
                      </div>
                    </div>

                    {/* add categories  */}
                    <div className={productCss.formInputSection}>
                      <h3 className={productCss.formSectionH3}>Categoria</h3>
                      <div className={productCss.formInputWrapper}>
                        <div className={productCss.input}>
                          <label htmlFor="categoria">Seleziona Categoria</label>
                          {/* <select  
                                    name='category' 
                                    className='custom-select form-control'
                                    onChange={formik.handleChange}
                                    value={formik.values.category}
                                    id="categoria"
                                > 
                                    <option selected>Choose...</option>
                                    {
                                    categories.map((categories, index) =>{
                                        return <option key={index} value={categories.id}>{categories.title}</option>
                                    })
                                    }
                                   
                                </select> */}

                          {categories.map(({ id, title, children }, i) =>
                            children?.length > 0 ? (
                              <Accordion
                                key={i}
                                name={title}
                                listData={children}
                              />
                            ) : (
                              <AccordionList
                                key={i}
                                id={`${title}_${i}`}
                                value={id}
                                label={title}
                              />
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    {/* add tags */}
                    <div className={productCss.formInputSection}>
                      <h3 className={productCss.formSectionH3}>Tag</h3>
                      <div className={productCss.formInputWrapper}>
                        <div className={productCss.input}>
                          <label htmlFor="tag">Aggiungi Tag (#)</label>
                          {/* <input
                                id="tag"
                                name="tag"
                                type="text"
                                className='form-control'
                                onChange={formik.handleChange}
                                value={values.tag}
                            /> */}
                          <TagsInput
                            className="form-control"
                            value={selectedTag}
                            onChange={setSelectedTag}
                            name="tags"
                            placeHolder="tags"
                          />
                        </div>
                      </div>
                    </div>

                    {/* add product status  */}
                    <div className={productCss.formInputSection}>
                      <h3 className={productCss.formSectionH3}>Status</h3>
                      <div className={productCss.formInputWrapper}>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            onChange={formik.handleChange}
                            type="radio"
                            name="status"
                            id="inlineRadio1"
                            value="published"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio1"
                          >
                            Attiva
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            onChange={formik.handleChange}
                            type="radio"
                            name="status"
                            id="inlineRadio2"
                            value="unpublished"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio2"
                          >
                            Bozza
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className={productCss.btnWrapper}>
                      <button className={productCss.submitBtn} type="submit">
                        Add Product
                      </button>
                    </div>
                  </form>
                </FormikProvider>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  // let token = req.headers.Cookies || '';

  try {
    let cook = Cok.parse(req.headers.cookie) || "";
    let token = cook.token;
    const brandUrl = routeConfig.getBrandsAdmin;
    const getCategories = routeConfig.getCategories;

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    let ax = await axios.get(brandUrl, axiosConfig);

    let axCat = await axios.get(getCategories, axiosConfig);

    let result = await ax;
    let catResult = await axCat;

    //   console.log(result.data.data);
    console.log({ cat: catResult.data });
    let brands = [];
    let categories = [];

    if (result.data.data) {
      brands = result.data.data;
    }
    if (catResult.data.data) {
      categories = catResult.data.data;
    }

    // Pass data to the page via props
    return { props: { brands, categories } };
  } catch (error) {
    return {
      props: {
        brands: globalBrands,
        categories: globalCategories,
      },
    };
  }
}
