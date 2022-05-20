import React from "react";
import PageHeader from "../../../components/molecules/NavHeader";
// import CategoriaStyle from "../../../styles/prodotti/categoria.css";
import { RoundedInput } from "../../../components/atoms/Input";
import { CategoriaData } from "../../../config/CategoriesData";
import Accordion, { AccordionList } from "../../../components/atoms/Accordion";
import Cok from 'cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import productCss from '../../../styles/prodotti/prodotti.module.css'
import { useFormik, Field,FormikProvider } from 'formik';
import routeConfig from '../../../config/routeConfig'

function Categoria({categories}) {

    const formik = useFormik({
      initialValues: {
        title: '',
        parent_id: '',
    },
      
      onSubmit: async (values, {resetForm}) => { 

        const addCategory = routeConfig.addCategory;
        let formD = await values;
       
        //grab all selected categories into an array
        let categories = []
        let radioBtns = document.querySelectorAll('input[type=radio]:checked')
        for (var i = 0; i < radioBtns.length; i++) {
            categories.push(radioBtns[i].value)
        }
        console.log({categories});


     
        formD.status = 'published';
        formD.is_parent = 0;
        if (categories[0]) {
           formD.parent_id = categories[0];
        }
       
      

        const token = window.localStorage.getItem('token');
        console.log({formD});

        const axiosConfig = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token,
            }
          }

          let ax = await axios.post(
              addCategory,
              formD,
              axiosConfig
          ).then(result => {
              if(result.status == 200){
                toast.success("Added")
              }else{
                  toast.error("Sorry, I guess something went wrong")
              }
              resetForm({values: ''})
            console.log(result)
        
        }).catch(function (error) {
            toast.error("Sorry, I guess something went wrong")
            console.log(error.response)
          });
        
    },
      enableReinitialize: true
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps,handleChange } = formik;

  return (
    <PageHeader title={"Categoria"}>
      <div className={""} style={{ width: "78%" }}>
        <h4 className="my-3 "> Categoria </h4>
        <ToastContainer />

        <div className="border_primary border-radius-15 p-4 primary_background">
          <div className="d-flex flex-row align-item-start">
            <div className="w-50">
              <p>Lista Categoria</p>
            </div>
            <div className="border_black p-2 border-radius-15 w-100">
            {categories.map(({ id, title, children }, i) =>
                children?.length > 0 ? (
                    <Accordion inputType="disabled" key={i} name={title} listData={children} />
                ) : (
                    <AccordionList inputType="disabled" key={i} id={`${title}_${i}`} value={id} label={title} />
                )
            )}
            </div>
          </div>
          <hr className="my-5" />
          <div className="d-flex flex-row align-item-start">
            <div className="w-50">
              <p>Aggiungi Sottocategoria</p>
            </div>
            <div className="w-100">
            <FormikProvider value={formik}>
            <form onSubmit={handleSubmit}>

              <div className="mb-4">
                <RoundedInput
                  id={"Nome"}
                  key={"Nome"}
                  label="Nome"
                  labelAlign={"vertical"}
                  name={"title"}
                  onChange={formik.handleChange}
                  value={formik.values.title}
                />
              </div>
              
              <div className="mb-4">
                <p className="small_text grey_text">Categoria</p>
                <div className="border_black p-2 border-radius-15">
                  
                  {/* add categories  */}
                
                    
                                  {/* <label htmlFor="categoria">Seleziona Categoria</label>
                                  <select  
                                      name='parent_id' 
                                      className='custom-select form-control border_black'
                                      onChange={formik.handleChange}
                                      value={formik.values.parent_id}
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
                          <Accordion inputType="radio" key={i} name={title} listData={children} />
                      ) : (
                          <AccordionList inputType="radio" key={i} id={`${title}_${i}`} value={id} label={title} />
                      )
                  )}
                </div>

                
                <div className={productCss.btnWrapper}>
                    <button  className={productCss.submitBtn} type="submit">Add category</button>
                </div>

              </div>

              </form>
            </FormikProvider>
            </div>
            
          </div>
        </div>
      </div>
    </PageHeader>
  );
}

export default Categoria;



export async function getServerSideProps({req, res}) {

  // let token = req.headers.Cookies || '';
 let cook = Cok.parse( req.headers.cookie )|| '';
 let token = cook.token;
  const brandUrl = routeConfig.getBrandsAdmin;
  const getCategories = routeConfig.getCategories;
  
  const axiosConfig = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
      }
    }

    let axCat = await axios.get(
      getCategories,
        axiosConfig
    );

   

    let catResult = await axCat;

    console.log({'cat': catResult.data.data});
    let categories = [];

    if(catResult.data.data){
      categories = catResult.data.data;
    }
  
  // Pass data to the page via props
  return { props: { categories } }
}
