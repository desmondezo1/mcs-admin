import React from "react";

// import Input from "../../atoms/Input";
import Cookies from 'js-cookie'
import style from "../../../styles/molecule.module.css";
import Button from "../../atoms/Buttons";
import Checkbox from "../../atoms/Checkbox";
import { useState } from "react";
import { useRouter } from 'next/router'
import routeConfig from "../../../config/routeConfig";
import { useFormik, Field,FormikProvider } from 'formik';
import axios from "axios";


function LoginForm(props) {
  
  // let [email, setEmail] = useState('');
  // let [password, setPassword] = useState('');

  const router = useRouter()

  function handleLogin(resp) {

    if(!resp.data.access_token){
      return;
    } 
    // set cookie 

    Cookies.set('token',resp.data.access_token);
    // set storage 
    localStorage.setItem("token", resp.data.access_token);
    router.push('/admin/overview');
   

  }
  


    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },

      onSubmit: async values => {
        const loginUrl = routeConfig.login;
        console.log({loginUrl, env:process.env.BACKEND_API_BASE_URL});
        let formD = await values;
        const axiosConfig = {
          headers: {
              'Content-Type': 'application/json',
          }
        }

        let ax = await axios.post(
            loginUrl,
            formD,
            axiosConfig
        ).then(result =>{


        console.log(result);
        handleLogin(result);
      
      })

      },
    });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps,handleChange } = formik;


  return (
    <div className={style.login_form}>
      <h4 className="underlined_text">ACCEDI</h4>
      <FormikProvider value={formik}>
      <form onSubmit={handleSubmit} >
        <input
         id="email"
         name="email"
         type="email"
         onChange={handleChange}
         value={values.email}
         placeholder="E-MAIL*" 
        />

        <input 
         id="password"
         name="password"
         type="password"
         onChange={handleChange}
         value={values.password}
         placeholder="PASSWORD*" />

        <Button
          style={{
            width: "100%",
            justifyContent: "center",
          }}

          type="submit"
        >
        LOG IN
      </Button>
      </form>
      <Button
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
        color="secondary"
      >
        PASSWORD DIMENTICATA?
      </Button>
      <Checkbox id={"ricordami"} label="Ricordami" />
      </FormikProvider>
    </div>
  );
}

export default LoginForm;
