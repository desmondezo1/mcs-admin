import React from "react";

// import Input from "../../atoms/Input";
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

    if(!resp.access_token){
      return;
    }
    router.push('/admin/overview');
    localStorage.setItem("token", resp.access_token);

  }
  


    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },

      onSubmit: async values => {
        const loginUrl = routeConfig.login;
        console.log({loginUrl});
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
