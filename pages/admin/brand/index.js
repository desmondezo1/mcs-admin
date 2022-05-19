import styles  from '../../../styles/Home.module.css'
import Head from 'next/head'
import Header from '../../../components/molecules/Header'
import Nav from '../../../components/molecules/Nav'
import productCss from '../../../styles/prodotti/prodotti.module.css'
import { useFormik, Field,FormikProvider } from 'formik';
import axios from 'axios'
import routeConfig from '../../../config/routeConfig'
import BrandCard from '../../../components/atoms/brandCard'
import Cok from 'cookie'

export default function Brand({brands}){
    const formik = useFormik({
    initialValues: {
        name: '',
        photo: '',
        
    },

    onSubmit: async values => { 
        let brandUrl = routeConfig.addBrand; 
        let Val = await values;
        const token = window.localStorage.getItem('token');
        
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
          }
  
          let ax = await axios.post(
              brandUrl,
              Val,
              axiosConfig
          ).then(result =>{
              console.log(result);
          });
  
    },
        enableReinitialize: true
    });
    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps,handleChange } = formik;
    return(
        <>

<style jsx>{
            `
            .productListWrapper{
                padding-bottom: 20px;
                margin-bottom: 10px;
                border-bottom: 1px solid #999999;
            }

            .brandListWrapper{
                border-radius: 12.82px;
                width:100%;
                border: 1px solid #000;
                max-width: 510px;
                display: grid;
                grid-gap: 1rem;
            }

            @media (min-width: 600px) {
                .brandListWrapper { grid-template-columns: repeat(2, 1fr); }
            }

            @media (min-width: 900px) {
                .brandListWrapper { grid-template-columns: repeat(3, 1fr); }
              }
            `
        }

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
            <div className={productCss.formWrapper}>
                
            <FormikProvider value={formik}>
            <form onSubmit={handleSubmit}>
                <div className={productCss.formInputSection}>
                    <h3 className={productCss.formSectionH3}>Lista Brand</h3>
                    <div className={`${productCss.formInputWrapper}`}>
                        
                        <div className="brandListWrapper">
                            {
                                brands.map((brand , index) => {
                                    return  <BrandCard key={index} totalProducts={brand.count}  name={brand.name} />
                                })
                            }
                        </div>

                    </div>

                </div>

                <div className={productCss.formInputSection}>
                    <h3 className={productCss.formSectionH3}>Aggiungi Brand</h3>
                    <div className={productCss.formInputWrapper}>
                        <div className={productCss.input}>
                            <label htmlFor="name">Nome del Brand</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className='form-control'
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
                                className='form-control'
                                onChange={handleChange}
                                value={values.photo}
                            />
                        </div>

                        <div className={productCss.input}>
                            <div className={productCss.btnWrapper}>
                                <button  className={productCss.submitBtn} type="submit">Add Brand</button>
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
    )
}

export async function getServerSideProps({req, res}) {

    // let token = req.headers.Cookies || '';
   let cook = Cok.parse( req.headers.cookie )|| '';

   let token = cook.token;
  
    const brandUrl = routeConfig.getBrandsAdmin;
    
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
      }

      let ax = await axios.get(
            brandUrl,
          axiosConfig
      );

      let result = await ax;
      console.log(result.data.data);
      let brands = [];

      if(result.data.data){
           brands = result.data.data;
      }
     

  
    // Pass data to the page via props
    return { props: { brands } }
  }