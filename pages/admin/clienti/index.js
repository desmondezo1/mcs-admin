import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../../../components/molecules/Header";
import Nav from "../../../components/molecules/Nav";
import styles from "../../../styles/Home.module.css";
import Table from "../../../components/molecules/Table";
import ClientList from "../../../config/ClientList";
import Button from "../../../components/atoms/Buttons";
import TableMenuIcon from "../../../images/icons/TableMenuIcon";
import Cok, { serialize } from 'cookie'
import ProfilePicture from "../../../images/icons/ProfilePicture";
import SearchIcon from "../../../images/icons/SearchIcon";
import routeConfig from "../../../config/routeConfig";
import axios from 'axios'
import axiosHttp from "../../../utility/httpCalls";

import {
  RadioButtonContainer,
  RoundedInputWithIcon,
} from "../../../components/atoms/Input";
import TableMenuButton from "../../../components/atoms/TableMenuButton";
import NavHeader from "../../../components/molecules/NavHeader";

function Index({users}) {
  const [filter, setFilter] = useState("");
  const[searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(0);
  useEffect(() => {
    setData(users);
    // setData([{ id:1, first_name:"esmond", email: "des@gamail.com", status: "active", role: 3, created_at: "32423"}]);

    console.log(users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const setColor = (role, expected) =>{
      if (role == expected){
        return "primary"
      }

      return "secodary"
  }
  // useEffect(() => {
  //   const newData = ClientList.filter((item) => {
  //     return filter === "none" ? true : item.status === filter;
  //   });
  //   // setData(newData);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [filter]);
  console.log({users});
  return (
    <NavHeader>
      <div className={styles.overview_body_container}>
        <div className={styles.overview_body_container}>
          <h4>Lista Clienti</h4>
          <br />
          <Table
            headKeys={["No", "Nome", "Email", "Data Creata", "Status", ""]}
            tableData={data}
            displayHead={true}
            selfDisplayComponent={data}
            display
            displayComponent={data.filter(val => {
              if (!categoryFilter) {
                return val;
              }else if(
                categoryFilter == val.role
              ){
                return val;
              }else  if(
                categoryFilter === 0
              ){
                return val;
              }

              // return val;
            }).filter(val => {
              if(!searchTerm){
                return val;
              }else if(
                  val.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  val.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  val.email.toLowerCase().includes(searchTerm.toLowerCase())
                ){
                  return val;
                } 
            }).map(
              ({ id, first_name, email, status, role, created_at }, i) => (
                <tr key={i}>
                  <td>{id}</td>
                  <td>
                    <ProfilePicture
                      style={{
                        marginRight: "6px",
                      }}
                    />
                    {first_name} 
                  </td>
                  <td>{email}</td>
                  <td>{created_at}</td>

                  <Button
                    size={"auto"}
                    fontSize="0.8em"
                    color={status === "active" ? "Received" : "Cancelled"}
                    margin="16px 0"
                  >
                    {status}
                  </Button>
                  <td>
                    <TableMenuButton 
                      button1={{ text: 'CATEGORIA 1', method: "patch", url: `${routeConfig.updateUser}/${id}`, value:{role: 1}, color: setColor(role, 1)}}
                      button2={{ text: 'CATEGORIA 2',  method: "patch", url: `${routeConfig.updateUser}/${id}`, value:{role: 3}, color: setColor(role, 3)}}
                      viewcontent={null}
                      modifica={null}
                      sospende={{ url: `${routeConfig.updateUserStatus}/${id}/status`, data: {status: "active"}, method: "patch", text: " Attiva Profilo "}}
                      attiva={{ url:`${routeConfig.updateUserStatus}/${id}/status`, data: {status: "inactive"}, method: "patch", text: " Sospende Profilo "}}
                      delete ={{url:`${routeConfig.deleteUser}/${id}`, data: null, method: 'DELETE', text: ' Cancella Profilo '}}
                    />
                  </td>
                </tr>
              )
            )}
          >
            <RoundedInputWithIcon
              Suffix={SearchIcon}
              placeholder="RICERCA CLIENTI"
              onChange={(e)=>{setSearchTerm(e.target.value)}}
            />

            <RadioButtonContainer
              id={"FIlter"}
              name="Filter"
              showLabel={false}
              changeState={setCategoryFilter}
              radioButtons={[
                { label: "TUTTI", value: 0 },
                { label: "CATEGORIA 1", value: 1 },
                { label: "CATEGORIA 2", value: 3 },
              ]}
              // onChange={(e)=>{setCategoryFilter(e.target.value)}}
            />
          </Table>
        </div>
      </div>
    </NavHeader>
  );
}

export default Index;


export async function getServerSideProps({req, res}) {

  let cook = Cok.parse( req.headers.cookie ) || '';
  let token = cook.token;
  const usersUrl = routeConfig.getUsers;

  let users = await axiosHttp(usersUrl,null,'GET',token);
  return { props: { users } }
}
