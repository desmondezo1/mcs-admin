import styles  from '../../../styles/Home.module.css'
import Head from 'next/head'
import Header from '../../../components/molecules/Header'
import Nav from '../../../components/molecules/Nav'
import productCss from '../../../styles/prodotti/prodotti.module.css'
import { useFormik, Field,FormikProvider } from 'formik';
import { useState } from 'react'
// import { Formik, Form, useField } from 'formik';
// import TextArea from '../../components/atoms/form/formElements'

export default function prodotti(){

    const [productOptions, setProductOptions] = useState([{product: ""}])

    const handleResp = (resp)=>{
        console.log(resp)
    }
   
        const formik = useFormik({
          initialValues: {
            brand: '',
            description: '',
            title: '',
            pieces: [{ price: [0,0], discount: [0,0]}],
            pdf: '',
            image: '',
            tag: '',
            volume: '',
            surface: '',
            uses: '',
            brand: '',
            description: '',
            title: ''
          },
         
          onSubmit: async values => {
            //   let pdfInput = document.getElementById('pdf')
            //   let imageInput = document.getElementById('image');
            //   console.log(pdfInput);

             
                // form.append("image", imageInput.files[0]);
              
                // form.append("pdf", pdfInput.files[0]);
               

              console.log(values);
              values = JSON.stringify(values)
              const token = window.localStorage.getItem('token');
              let form = new FormData();
              form.append('title', values.title);
              form.append('brand', values.brand);
              form.append('description', values.description);
            //   form.append('image', image);
            //   form.append('pdf', pdf);
              form.append('image', values.image)
              form.append('pdf', values.pdf)
              form.append('pieces', JSON.stringify(values.pieces))
              form.append('surface', values.surface)
              form.append('tag', values.tag)
              form.append('uses', values.uses)
              form.append('volume', values.volume)

             
            //   console.log(JSON.stringify({values, token}))
            // alert(JSON.stringify(values, null, 2));
            // const respData = await fetch(`${process.env.BACKEND_API_BASE_URL}/products/create`,{
            // const respData = await fetch(`http://backend-api.mcsgroupsrl.com/api/admin/products/create`,{
            const respData = await fetch(`http://127.0.0.1:8000/api/admin/products/create`,{
            // const respData = await fetch(`/api/addProduct?v=${token}`,{
                method: "POST",
                body: form,
                headers: {
                    'Authorization': 'Bearer ' + token,
                  }
              });

              let data = await respData.json();
              console.log({data});
            
          },
          enableReinitialize: true
        });

        const handleProductAdd = () => {
            setProductOptions([...productOptions, {product : ""}]);
        }

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
            <h2>Aggiungi Prodotto</h2>
            <div className={productCss.formWrapper}>
                
            <FormikProvider value={formik}>
            <form onSubmit={handleSubmit}>
                <div className={productCss.formInputSection}>
                    <h3 className={productCss.formSectionH3}>Info Generiche</h3>
                    <div className={productCss.formInputWrapper}>
                        <div className={productCss.input}>
                            <label htmlFor="title">Titolo del Prodotto</label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                className='form-control'
                                onChange={handleChange}
                                value={values.title}
                            />
                        </div>

                        <div className={productCss.input}>
                            <label htmlFor="decription">Descrizione</label>
                            <textarea
                            row="6"
                            id="description"
                            name='description'
                            className='form-control'
                            onChange={formik.handleChange}
                            value={formik.values.description}
                            >
                            </textarea>
                        </div>

                        <div className={productCss.input}>
                            
                            <label htmlFor="brand">Brand (Marca)</label>
                            <select 
                                name='brand' 
                                className='custom-select form-control'
                                onChange={formik.handleChange}
                                value={formik.values.brand}
                                id="brand"
                                >
                                    <option selected >Brand..</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                        </div>

                    </div>

                </div>
{/* --------------------------------------------------------------------------------------------- */}
                {/* dynamic products  */}
                <div className={productCss.formInputSection}>
                <h3 className={productCss.formSectionH3}>Pezzi e Prezzi</h3>
                <div className={productCss.dynamicListcontainer}>
                { productOptions.map((singleProduct, index) => {
                   return ( <div className={`${productCss.formInputWrapper} productListWrapper`}>
                        
                            <label htmlFor="piece">Pezzo {index + 1}</label>
                            <div className={productCss.categoryTypeWrapper}>
                                <div className={productCss.input}>
                                <label htmlFor="packaging">Confezione</label>
                                    <Field
                                        id="packaging"
                                        name={`pieces[${index}].packaging`}
                                        type="text"
                                        className='form-control'
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
                                        className='form-control'
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
                                        className='form-control'
                                        onChange={handleChange}
                                        // value={values?.pieces[index]?.quantity}
                                    />
                                </div>
                            </div>

                            <div className={productCss.discountPriceWrapper}>
                                <div className={productCss.input}>
                                    <label htmlFor="price1">Prezzo (€) - Cat 1</label>
                                        <Field
                                            id="price1"
                                            name={`pieces[${index}].price[0]`}
                                            type="text"
                                            className='form-control'
                                            onChange={handleChange}
                                            // value={values?.pieces[index]?.price[0]}
                                        />
                                    </div>
                                    <div className={productCss.input}>
                                    <label htmlFor="price2">Prezzo (€) - Cat 2</label>
                                        <Field
                                            id="price2"
                                            name={`pieces[${index}].price[1]`}
                                            type="text"
                                            className='form-control'
                                            onChange={formik.handleChange}
                                            // value={values?.pieces[index]?.price[1]
                                            // }
                                        />
                                    </div>
                                    <div className={productCss.input}>
                                    <label htmlFor="discount1">Sconto (%) - Cat 1</label>
                                        <Field
                                            id="discount1"
                                            name={`pieces[${index}].discount[0]`}
                                            type="text"
                                            className='form-control'
                                            onChange={formik.handleChange}
                                            // value={values?.pieces[index]?.discount[0]}
                                        />
                                    </div>
                                    <div className={productCss.input}>
                                    <label htmlFor="discount2">Sconto (%) - Cat 2</label>
                                        <Field
                                            id="discount2"
                                            name={`pieces[${index}].discount[1]`}
                                            type="text"
                                            className='form-control'
                                            onChange={formik.handleChange}
                                            // value={formik.values?.pieces[index]?.discount[1]}
                                        />
                                    </div>
                            </div>

                        <div className={productCss.input}>
                            { productOptions.length - 1 == index &&

                            <button onClick={handleProductAdd}>
                                + 
                                 AGGIUNGI PEZZO
                            </button>                            
                            }
                        </div>
                    </div>
                )})}
                </div>
                </div>

                <div className={productCss.formInputSection}>
                <h3 className={productCss.formSectionH3}>Informazione Aggiuntive</h3>
                    <div className={`${productCss.formInputWrapper}`}>
                        <div className={productCss.input}>
                            <label htmlFor="uses">Usi</label>
                            <input
                                id="uses"
                                name="uses"
                                type="text"
                                className='form-control'
                                onChange={formik.handleChange}
                                value={formik.values.uses}
                            />
                        </div>
                        <div className={productCss.input}>
                            <label htmlFor="surface_with">Superficie da Trattare</label>
                            <input
                                id="surface"
                                name="surface"
                                type="surface"
                                className='form-control'
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
                                className='form-control'
                                onChange={formik.handleChange}
                                value={formik.values.volume}
                            />
                        </div>
                    </div>
                </div>

                <div className={productCss.formInputSection}>
                <h3 className={productCss.formSectionH3}>Info Scheda Tecnica</h3>
                    <div className={productCss.formInputWrapper}>
                        <div className={productCss.input}>
                            <label htmlFor="pdf">PDF</label>
                            <input
                                id="pdf"
                                name="pdf"
                                type="file"
                                className='form-control'
                                onChange={formik.handleChange}
                                value={values.pdf}
                            />
                        </div>
                    </div>
                </div>

                <div className={productCss.formInputSection}>
                <h3 className={productCss.formSectionH3}>Media</h3>
                    <div className={productCss.formInputWrapper}>
                        <div className={productCss.input}>
                            <label htmlFor="image">Immagine</label>
                            <input
                                id="image"
                                name="image"
                                type="file"
                                className='form-control'
                                onChange={formik.handleChange}
                                value={values.image}
                            />
                        </div>
                    </div>
                </div>

                <div className={productCss.formInputSection}>
                <h3 className={productCss.formSectionH3}>Categoria</h3>
                    <div className={productCss.formInputWrapper}>
                        <div className={productCss.input}>
                                <label htmlFor="categoria">Seleziona Categoria</label>
                                <select className='custom-select form-control' id="categoria">
                                    <option selected>Choose...</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                        </div>
                    </div>
                </div>

                <div className={productCss.formInputSection}>
                <h3 className={productCss.formSectionH3}>Tag</h3>
                    <div className={productCss.formInputWrapper}>
                        <div className={productCss.input}>
                        <label htmlFor="tag">Aggiungi Tag (#)</label>
                            <input
                                id="tag"
                                name="tag"
                                type="text"
                                className='form-control'
                                onChange={formik.handleChange}
                                value={values.tag}
                            />
                        </div>
                    </div>
                </div>

                <div className={productCss.formInputSection}>
                <h3 className={productCss.formSectionH3}>Status</h3>
                    <div className={productCss.formInputWrapper}>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input"
                                onChange={formik.handleChange}
                                type="radio" name="status" id="inlineRadio1" value="published"  />
                            <label class="form-check-label" for="inlineRadio1">Attiva</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input"
                             onChange={formik.handleChange}
                              type="radio" name="status" id="inlineRadio2" value="unpublished" />
                            <label class="form-check-label" for="inlineRadio2">Bozza</label>
                        </div>                    
                    </div>
                </div>


           <div className={productCss.btnWrapper}>
                <button  className={productCss.submitBtn} type="submit">Add Product</button>
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