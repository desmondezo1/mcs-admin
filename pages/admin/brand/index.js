import React, { useState, useEffect } from "react";
import styles from "../../../styles/Home.module.css";
import Head from "next/head";
import Header from "../../../components/molecules/Header";
import Nav from "../../../components/molecules/Nav";
import productCss from "../../../styles/prodotti/prodotti.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik, Field, FormikProvider } from "formik";
import brandLogo from "../../../images/brandLogo.png";
import axios from "axios";
import routeConfig from "../../../config/routeConfig";
import BrandCard from "../../../components/atoms/brandCard";
import Cok from "cookie";

export default function Brand({ brands }) {
  const [brandList, setBrandList] = useState([]);

  // created to make sure there is props before using it
  // to prevent error due to failed requests
  useEffect(() => {
    if (brands.length > 0) {
      setBrandList(brands);
    }
  }, [brands]);

  const removeItemFromList = async (id) => {
    setBrandList((prev) => prev.filter((brand) => brand.id !== id));
    let deleteBrand = `${routeConfig.deleteBrand}/${id}`;
    const token = window.localStorage.getItem("token");

    const axiosConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    };

    let ax = await axios
      .delete(deleteBrand, axiosConfig)
      .then((result) => {
        if (result.status == 200) {
          toast.success("deleted");
        } else {
          toast.error("Sorry, I guess something went wrong");
        }
        // resetForm({ values: "" });
        console.log(result);
      })
      .catch(function (error) {
        toast.error("Sorry, I guess something went wrong");
        console.log(error.response.data);
      });
  };


  const formik = useFormik({
    initialValues: {
      name: "",
      photo: "",
    },

    onSubmit: async (values, { resetForm }) => {
      let brandUrl = routeConfig.addBrand;
      // let brandUrl = "";
      let fTag = document.querySelector("form");
      let frmData = new FormData(fTag);
      let Val = await values;
      const token = window.localStorage.getItem("token");

      const axiosConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      };

      let ax = await axios
        .post(brandUrl, frmData, axiosConfig)
        .then((result) => {
          if (result.status == 200) {
            toast.success("Added");
          } else {
            toast.error("Sorry, I guess something went wrong");
          }
          resetForm({ values: "" });
          console.log(result);
        })
        .catch(function (error) {
          toast.error("Sorry, I guess something went wrong");
          console.log(error.response.data);
        });
    },
    enableReinitialize: true,
  });
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

          .brandListWrapper {
            border-radius: 12.82px;
            width: 100%;
            border: 1px solid #000;
            display: grid;
            grid-gap: 1px;
            padding: 1rem;
            grid-template-columns: auto;
          }

          @media (min-width: 600px) {
            .brandListWrapper {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (min-width: 900px) {
            .brandListWrapper {
              grid-template-columns: repeat(4, auto);
            }
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
            <p>Dashboard</p>
          </Header>
          <div className="dashboard_container">
            <Nav />
            <div className={styles.overview_body_container}>
              <h2>Brand</h2>
              <ToastContainer />
              <div className={productCss.formWrapper}>
                <FormikProvider value={formik}>
                  <form onSubmit={handleSubmit}>
                    <div className={productCss.formInputSection}>
                      <h3 className={productCss.formSectionH3}>Lista Brand</h3>
                      <div className={`${productCss.formInputWrapper}`}>
                        <div className="brandListWrapper">
                          {brandList.map((brand, index) => {
                            return (
                              <BrandCard
                                key={index}
                                image={brand.photo || brandLogo}
                                totalProducts={brand.count}
                                name={brand.name}
                                deletefunction={() => {
                                  removeItemFromList(brand.id);
                                }}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className={productCss.formInputSection}>
                      <h3 className={productCss.formSectionH3}>
                        Aggiungi Brand
                      </h3>
                      <div className={productCss.formInputWrapper}>
                        <div className={productCss.input}>
                          <label htmlFor="name">Nome del Brand</label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            className="form-control"
                            onChange={handleChange}
                            value={values.name}
                          />
                        </div>

                        <div className={productCss.input}>
                          <label htmlFor="photo">Logo del Brand</label>
                          <input
                            id="photo"
                            name="photo"
                            type="file"
                            className="form-control"
                            onChange={handleChange}
                            value={values.photo}
                          />
                        </div>

                        <div className={productCss.input}>
                          <div className={productCss.btnWrapper}>
                            <button
                              className={productCss.submitBtn}
                              type="submit"
                            >
                              Add Brand
                            </button>
                          </div>
                        </div>
                      </div>
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

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    let ax = await axios.get(brandUrl, axiosConfig);

    let result = await ax;
    console.log(result.data.data);
    let brands = [];

    if (result.data.data) {
      brands = result.data.data;
    }

    // Pass data to the page via props
    return { props: { brands } };
  } catch (error) {
    return {
      props: {
        brands: [
          { count: 100, name: "Phil", id: 1 },
          { count: 100, name: "Phil", id: 2 },
          { count: 100, name: "Phil", id: 3 },
          { count: 100, name: "Phil", id: 4 },
        ],
      },
    };
  }
}
