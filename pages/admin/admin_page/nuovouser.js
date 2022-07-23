import React from "react";
import styles from "../../../styles/Home.module.css";
import FormStyle from "../../../styles/forms.module.css";
import Button from "../../../components/atoms/Buttons";
import AddIcon from "../../../images/icons/AddIcon";
import routeConfig from "../../../config/routeConfig";
import { toast } from "react-toastify";

import axios from "axios";
import { useState } from "react";
import {
  RoundedInput,
  RadioButtonContainer,
} from "../../../components/atoms/Input";
import NavHeader from "../../../components/molecules/NavHeader";

function Nuovouser(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [userRole, setUserRole] = useState("");


  const setChange = (val) => {
    console.log({val});
    setUserRole(val);
  }


  const createAUser = async () => {
    const token = window.localStorage.getItem("token");

      let createUser = `${routeConfig.createUser}`;
      const axiosConfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
  
      let axUser = await axios.post(createUser, {
        'first_name': firstName,
        'last_name': lastName,
        'email': email,
        'password': password,
        'phone': phone,
        'role': `${userRole}`
      }, axiosConfig).then((res) => {
        if (res.status == 200) {
          toast.success(res.status.desc)
        }
        console.log(res);
      }).catch((error)=>{
        console.error(error.response);
      });

  }

  return (
    <NavHeader>
      <div className={styles.overview_body_container}>
        <h4>Nuovo User</h4>
        <br />

        <div className="form_container d-flex flex-row justify-content-between primary_background border_primary p-4 align-items-start border-radius-15 position-relative">
          <div className={FormStyle.form_container}>
              <RoundedInput id={`frstname`} name={'first_name'} value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} label="NOME" placeholder="Nome" />
              <RoundedInput id={`lrstname`} name={'Last_name'} value={lastName} onChange={(e)=>{setLastName(e.target.value)}}  label="COGNOME" />
              <RoundedInput id={`email`} name={'email'} value={email} onChange={(e)=>{setEmail(e.target.value)}}  label="EMAIL" />
              <RoundedInput id={`phone`} name={'phone'} value={phone} onChange={(e)=>{setPhone(e.target.value)}}  label="TELEFONO" />
              <RoundedInput id={`password`} name={'password'} value={password} onChange={(e)=>{setPassword(e.target.value)}}  label="PASSWORD" type="password" />
            <RadioButtonContainer
              name={"RUOLO"}
              radioButtons={[
                {
                  label: "ADMIN",
                  value: "4",
                },
                {
                  label: "CREATOR",
                  value: "2",
                },
              ]}
              changeState={setChange}
            />

            <Button
              className={`position-absolute m-auto ${FormStyle.submit_button}`}
              size="auto"
              onClick={createAUser}
            >
              SALVA{" "}
            </Button>
          </div>
        </div>
      </div>
    </NavHeader>
  );
}

export default Nuovouser;
