import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../../../../components/molecules/Header";
import Nav from "../../../../components/molecules/Nav";
import styles from "../../../../styles/Home.module.css";
import FormStyle from "../../../../styles/forms.module.css";
import Button from "../../../../components/atoms/Buttons";
import AddIcon from "../../../../images/icons/AddIcon";
import routeConfig from "../../../../config/routeConfig";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import axiosHttp from "../../../../utility/httpCalls";
import Cok from "cookie";

import {
  RoundedInput,
  RadioButtonContainer,
} from "../../../../components/atoms/Input";
import { useRouter } from "next/router";

export default function Modifieduser({user}) {
  const router  = useRouter();
  const [userData, setUserData] = useState(user || {});
  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(user?.phone );
  const [userRole, setUserRole] = useState(user || "");

  const setChange = (val) => {
    console.log({val});
    setUserRole(val);
  }

  const updateUser = async () => {
    const token = window.localStorage.getItem("token");

    if(userData.id){
      let updateUser = `${routeConfig.updateNonAdminUser}/${userData.id}`;
      const axiosConfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
  
      let axUser = await axios.patch(updateUser, {
        'first_name': firstName,
        'last_name': lastName,
        'email': email,
        'password': password,
        'phone': phone,
        // 'role': `${userRole}`
      }, axiosConfig).then((res) => {
        if (res.status == 200) {
          toast.success("Updated!")
        }
        console.log(res);
      }).catch((error)=>{
        console.error(error.response);
      });
  };

  }

  useEffect(()=>{ console.log({ userRole})},[])
  return (
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
            <h4>Modifica User </h4>
            <br />

            <div className="form_container d-flex flex-row justify-content-between primary_background border_primary p-4 align-items-start border-radius-15 position-relative">
              <div className={FormStyle.form_container}>
                <RoundedInput id={`frstname`} name={'first_name'} value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} label="NOME" placeholder="Nome" />
                <RoundedInput id={`lrstname`} name={'Last_name'} value={lastName} onChange={(e)=>{setLastName(e.target.value)}}  label="COGNOME" />
                <RoundedInput id={`email`} name={'email'} value={email} onChange={(e)=>{setEmail(e.target.value)}}  label="EMAIL" />
                <RoundedInput id={`phone`} name={'phone'} value={phone} onChange={(e)=>{setPhone(e.target.value)}}  label="TELEFONO" />
                <RoundedInput id={`password`} name={'password'} value={password} onChange={(e)=>{setPassword(e.target.value)}}  label="PASSWORD" type="password" />
                {/* <RadioButtonContainer
                  name={"RUOLO"}
                  radioButtons={[
                    {
                      label: "ADMIN",
                      value: 4,
                    },
                    {
                      label: "CREATOR",
                      value: 2,
                    },
                  ]}
                  changeState={setChange}
                /> */}

                <Button
                  className={`position-absolute m-auto ${FormStyle.submit_button}`}
                  size="auto"
                  color={"primary"}
                  onClick={()=>{updateUser()}}
                >
                  SALVA{" "}
                </Button>
              </div>

              <Button
                fontSize="0.8em"
                size="auto"
                onClick={() => router.push("/admin/admin_page/nuovouser")}
              >
                <AddIcon />

                <p
                  className="m-0"
                  style={{
                    marginLeft: "5px",
                  }}
                >
                  NUOVO USER
                </p>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// export default modifieduser;

export async function getServerSideProps({ req, res, params }) {

  try {
    let cook = Cok.parse(req.headers.cookie) || "";
    let token = cook.token;
    console.log(req.query);
    const userUrl = `${routeConfig.getUser}/${params.id}`;
    console.log({userUrl})
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    let axUser = await axios.get(userUrl, axiosConfig);

    let result = await axUser;
    console.log({res:result?.data?.data})

    let user;

    if (result.data.data) {
      user = result.data.data;
    }

    // Pass data to the page via props
    return { props: { user } };
  } catch (error) {
    return {
      props: {
        user: {},
      },
    };
  }
}
