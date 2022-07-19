import styles from "../../../../styles/Home.module.css";
import Head from "next/head";
import Header from "../../../../components/molecules/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "../../../../components/molecules/Nav";
import productCss from "../../../../styles/prodotti/prodotti.module.css";
import { useFormik, Field, FormikProvider } from "formik";
import { useEffect, useState } from "react";
import { CategoriaData } from "../../../../config/CategoriesData";
import Accordion, {
  AccordionList,
} from "../../../../components/atoms/Accordion";
import { TagsInput } from "react-tag-input-component";
// import Cookies from 'js-cookie'
import Cok from "cookie";
import {
  brands as globalBrands,
  categories as globalCategories,
} from "../../../../config/prodotti";
import axios from "axios";
import axiosHttp from "../../../../utility/httpCalls";
import routeConfig from "../../../../config/routeConfig";
import Image from "next/image";
import { useRouter } from "next/router";
// import { Formik, Form, useField } from 'formik';
// import TextArea from '../../components/atoms/form/formElements'

export default function Prodotti({ brands, categories, product }) {
  const router = useRouter();
  const [productOptions, setProductOptions] = useState(
    product?.variation || []
  );
  const [allBrands, setBrands] = useState([]);
  const [selectedTag, setSelectedTag] = useState([]);

  const [title, setTitle] = useState(product?.title);
  const [description, setDescription] = useState(product?.description);
  const [uses, setUses] = useState(product?.uses);
  const [category, setCategory] = useState(product?.title);

  const [surface, setSurface] = useState(product?.surface);
  const [published, setPublished] = useState(product.status === "published");

  // instock_quantity;
  const [tag, setTag] = useState("");
  const [images, setImages] = useState(product?.images);
  const [tags, setTags] = useState(JSON.parse(product?.tag || []));

  const [brand, setBrand] = useState(product?.brand);
  const [volume, setVolume] = useState(product?.volume);
  console.log(product);

  // addBrand
  useEffect(() => {});
  const handleVariation = (e, field, index) => {
    let pk = e.target.value;
    let newOption = {
      ...productOptions[index],
    };

    let newOptions = [...productOptions];
    newOption[field] = pk;
    newOptions.splice(index, 1, newOption);
    setProductOptions(newOptions);
  };

  const updateProduct = async () => {
    const updateProduct = `${routeConfig.updateProduct}/update/${product?.id}`;

    //grab all selected categories into an array
    let categories = [];
    let checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
    for (var i = 0; i < checkboxes.length; i++) {
      categories.push(checkboxes[i].value);
    }

    let frmData = new FormData();
    frmData.append("pieces", JSON.stringify(productOptions));
    frmData.append("category", JSON.stringify(categories));
    frmData.append("tag", JSON.stringify(formD.tag));
    frmData.append("brand", JSON.stringify(brand));
    frmData.append("description", JSON.stringify(description));
    frmData.append("title", JSON.stringify(title));

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
      .post(updateProduct, frmData, axiosConfig)
      .then((result) => {
        if (result.status == 200) {
          toast.success("Updated");
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
  };

  const deleteImageFunc = async ( imageId, imageIndex ) => {
    const deleteImage = `${routeConfig.deleteImage}/${imageId}`;
    const token = window.localStorage.getItem("token");

   let filtrate =  images.filter((val, index) => {
      if (imageIndex !== index) {
        return val;
      }
    });

    setImages(filtrate);

    let resp = await axiosHttp(deleteImage,'','delete', token).then((res) => {
      if (res.status == 200) {
        toast.success("Deleted")
      }
      console.log(res);
    }).catch((error)=>{
      console.error(error.response);
    });
  };

  

  const formik = useFormik({
    initialValues: {
      brand: "",
      description: "",
      title: "",
      pieces: "",
      // pieces: [{ price: [0, 0], discount: [0, 0], weight: "", packaging: "" }],
      pdf: "",
      image: [""],
      tag: "",
      volume: "",
      category: "",
      status: "",
      surface: "",
      uses: "",
    },

    onSubmit: async (values, { resetForm }) => {
      let fTag = document.querySelector("form");
      const updateProduct = `${routeConfig.updateProduct}/update/${product?.id}`;
      let formD = await values;
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
     
      frmData.append("pieces", JSON.stringify(productOptions));
      frmData.append("category", JSON.stringify(categories));
      // frmData.append("tag", JSON.stringify(formD.tag));
      // frmData.append("brand", JSON.stringify(brand));
      // frmData.append("description", JSON.stringify(description));
      // frmData.append("title", JSON.stringify(title));
      // frmData.append("pieces", JSON.stringify(formD.pieces));
      // frmData.append("category", JSON.stringify(categories));
      frmData.append("tag", JSON.stringify(tags));
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
        .post(updateProduct, frmData, axiosConfig)
        .then((result) => {
          if (result.status == 200) {
            toast.success("Updated");
            console.log(result);
            window.location.reload();
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
              <h2>Aggiorna Prodotto</h2>
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
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                          />
                        </div>

                        <div className={productCss.input}>
                          <label htmlFor="decription">Descrizione</label>
                          <textarea
                            row="6"
                            id="description"
                            name="description"
                            className="form-control"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                          ></textarea>
                        </div>

                        <div className={productCss.input}>
                          <label htmlFor="brand">Brand (Marca)</label>
                          <select
                            name="brand"
                            className="custom-select form-control"
                            onChange={(e) => setBrand(e.target.value)}
                            value={brand}
                            id="brand"
                          >
                            {/* <option id="brand" defaultValue={""}>
                              {brand}
                            </option> */}
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
                              <label
                                htmlFor="piece"
                                onClick={() => console.log(index)}
                              >
                                Pezzo {index + 1}
                              </label>
                              <div className={productCss.categoryTypeWrapper}>
                                <div className={productCss.input}>
                                  <label htmlFor="packaging">Confezione</label>
                                  <Field
                                    id="packaging"
                                    // name={`pieces[${index}].packaging`}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) =>
                                      handleVariation(e, "packaging", index)
                                    }
                                    value={singleProduct?.packaging}
                                    placeHolder="Confezione"
                                    // value={values?.pieces[index]?.packaging}
                                  />
                                </div>
                                <div className={productCss.input}>
                                  <label htmlFor="weight">Peso (kg)</label>
                                  <Field
                                    id="weight"
                                    // name={`pieces[${index}].weight`}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) =>
                                      handleVariation(e, "weight", index)
                                    }
                                    value={singleProduct?.weight}
                                    placeHolder="Peso"
                                    // value={values?.pieces[index]?.weight}
                                  />
                                </div>
                                <div className={productCss.input}>
                                  <label htmlFor="quantity">Quantità</label>
                                  <Field
                                    id="quantity"
                                    // name={`pieces[${index}].quantity`}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) =>
                                      handleVariation(
                                        e,
                                        "instock_quantity",
                                        index
                                      )
                                    }
                                    value={singleProduct?.instock_quantity}
                                    placeHolder="0"
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
                                    // name={`pieces[${index}].price[0]`}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) =>
                                      handleVariation(e, "price", index)
                                    }
                                    value={singleProduct?.price}
                                    // value={values?.pieces[index]?.price[0]}
                                  />
                                </div>
                                <div className={productCss.input}>
                                  <label htmlFor="price2">
                                    Prezzo (€) - Cat 2
                                  </label>
                                  <Field
                                    id="price2"
                                    // name={`pieces[${index}].price[1]`}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) =>
                                      handleVariation(e, "offer_price", index)
                                    }
                                    value={singleProduct?.offer_price}
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
                                    // name={`pieces[${index}].discount[0]`}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) =>
                                      handleVariation(e, "discount", index)
                                    }
                                    value={singleProduct?.discount}
                                    // value={values?.pieces[index]?.discount[0]}
                                  />
                                </div>
                                <div className={productCss.input}>
                                  <label htmlFor="discount2">
                                    Sconto (%) - Cat 2
                                  </label>
                                  <Field
                                    id="discount2"
                                    // name={`pieces[${index}].discount[1]`}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) =>
                                      handleVariation(e, "discount2", index)
                                    }
                                    value={singleProduct?.discount2}
                                    // value={values?.pieces[index]?.discount[1]}
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
                            onChange={(e) => setUses(e.target.value)}
                            value={uses}
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
                            onChange={(e) => setSurface(e.target.value)}
                            value={surface}
                          />
                        </div>
                        <div className={productCss.input}>
                          <label htmlFor="volume">Volume</label>
                          <input
                            id="volume"
                            name="volume"
                            type="text"
                            className="form-control"
                            onChange={(e) => setVolume(e.target.value)}
                            value={volume}
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
                            value={formik.values.pdf}
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
                            value={formik.values.image[""]}
                            accept={"image/*"}
                            multiple
                          />
                        </div>
                      
                        <div className="Image-gallery-wrapper d-flex">
                          {images.map( (img, index) => {
                            return(
                              <div key={index} className="Images-image " style={{height: "100px", maxWidth: "100px", borderRadius: "100px", position: "relative"}} >
                                <span className="" style={{
                                  position: "absolute", 
                                  top: "0", 
                                  right: "0",
                                  background: "red",
                                  borderRadius: "18px",
                                  color: "#fff",
                                  fontSize: "0.7rem",
                                  zIndex: "9",
                                  padding: "3px 9px",
                                  cursor: "pointer"                              
                              }} onClick={(e) => { deleteImageFunc(img?.id, index ) }}> X </span>
                                <Image src={!img?.image ? "https://picsum.photos/200/300.jpg" : img.image} height="100%" style={{maxHeight: "100px", borderRadius: "5px"}} width={'100%'} alt=""/>
                              </div>
                            )
                          })}
                        </div>

                      </div>
 
                    </div>

                    {/* add categories  */}
                    <div className={productCss.formInputSection}>
                      <h3 className={productCss.formSectionH3}>Categoria</h3>
                      <div className={productCss.formInputWrapper}>
                        <div className={productCss.input}>
                          <label htmlFor="categoria">Seleziona Categoria</label>

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
                          <div
                            className="flex align-center"
                            style={{
                              marginTop: 10,
                              alignItems: "center",
                            }}
                          >
                            <ul
                              className="flex"
                              style={{
                                gap: 10,
                                marginTop: 20,
                                marginRight: 10,
                              }}
                            >
                              {tags.map((tag, idx) => (
                                <li
                                  key={idx}
                                  style={{
                                    backgroundColor: "#000",
                                    color: "#fff",
                                    padding: "4px 9px",
                                    borderRadius: 20,
                                    fontSize: 12,
                                    display: "flex",
                                    columnGap: 5,
                                    height: "33px",
                                  }}
                                  className="align-center"
                                >
                                  <span style={{ whiteSpace: "nowrap" }}>
                                    {tag}
                                  </span>
                                  <span
                                    onClick={() => {
                                      let tt = [...tags];
                                      tt.splice(idx, 1);
                                      setTags(tt);
                                    }}
                                    style={{ color: "#fff", fontSize: 15 }}
                                    className="pointer"
                                  >
                                    x
                                  </span>
                                </li>
                              ))}
                            </ul>
                            <input
                              onKeyPress={(ev) => {
                                if (ev.key === "Enter") {
                                  ev.preventDefault();
                                  setTags([...tags, tag]);
                                  setTag("");
                                }
                              }}
                              className="form-control"
                              value={tag}
                              onChange={(e) => setTag(e.target.value)}
                              // name="tags"
                              placeholder="tags"
                            />
                          </div>
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
                            onChange={() => setPublished(true)}
                            type="radio"
                            name="status"
                            id="inlineRadio1"
                            value="published"
                            checked={published}
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
                            onChange={() => setPublished(false)}
                            type="radio"
                            name="status"
                            id="inlineRadio2"
                            value="unpublished"
                            checked={!published}
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
                        Update Product
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

export async function getServerSideProps({ req, res, params }) {
  // let token = req.headers.Cookies || '';

  try {
    let cook = Cok.parse(req.headers.cookie) || "";
    let token = cook.token;
    console.log(req.query);
    const brandUrl = routeConfig.getBrandsAdmin;
    const getProduct = `${routeConfig.getSingleProduct}/${params.id}`;
    const getCategories = routeConfig.getCategories;
    console.log(getProduct);
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    let ax = await axios.get(brandUrl, axiosConfig);
    let prod = await axios.get(getProduct, axiosConfig);

    let axCat = await axios.get(getCategories, axiosConfig);

    let result = await ax;
    let catResult = await axCat;
    let product = await prod;

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

    console.log({ product: product.data.data });

    if (product.data.data) {
      product = product.data.data;
    }

    // Pass data to the page via props
    return { props: { brands, categories, product } };
  } catch (error) {
    return {
      props: {
        brands: globalBrands,
        categories: globalCategories,
      },
    };
  }
}
