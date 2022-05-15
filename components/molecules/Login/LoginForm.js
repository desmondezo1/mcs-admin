import React from "react";

// import Input from "../../atoms/Input";
import style from "../../../styles/molecule.module.css";
import Button from "../../atoms/Buttons";
import Checkbox from "../../atoms/Checkbox";
import { useState } from "react";
import { useFormik } from 'formik';


function LoginForm(props) {

  // let [email, setEmail] = useState('');
  // let [password, setPassword] = useState('');



  
    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      onSubmit: async values => {

        const res = await fetch("/api/login",{
          method: "POST",
          body: JSON.stringify(values)
        }).then(r => r.json()).then(r => console.log(r));

        // resp = await res.json();
        // console.log(res);

      },
    });


  return (
    <div className={style.login_form}>
      <h4 className="underlined_text">ACCEDI</h4>
      <form onSubmit={formik.handleSubmit} >
        <input
         id="email"
         name="email"
         type="email"
         onChange={formik.handleChange}
         value={formik.values.email}
         placeholder="E-MAIL*" 
        />

        <input 
         id="password"
         name="password"
         type="password"
         onChange={formik.handleChange}
         value={formik.values.password}
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
    </div>
  );
}

export default LoginForm;
