import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../../../components/molecules/Header";
import Nav from "../../../components/molecules/Nav";
import styles from "../../../styles/Home.module.css";
import Table from "../../../components/molecules/Table";
import Button from "../../../components/atoms/Buttons";
import TableMenuIcon from "../../../images/icons/TableMenuIcon";
import ProfilePicture from "../../../images/icons/ProfilePicture";
import SearchIcon from "../../../images/icons/SearchIcon";
import axiosHttp from "../../../utility/httpCalls";
import Cok from "cookie";
// import routeConfig from '../../../config/routeConfig'
import routeConfig from "../../../config/routeConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  RadioButtonContainer,
  RoundedInputWithIcon,
} from "../../../components/atoms/Input";
import OrdiniData from "../../../config/OrdiniData";
import DownArrow from "../../../images/icons/DownArrow";
import NavHeader from "../../../components/molecules/NavHeader";
import TableMenuButton from "../../../components/atoms/TableMenuButton";

function Index({ ordersData }) {
  const [filter, setFilter] = useState("none");
  const [searchFilter, setSearchFilter] = useState("none");
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(ordersData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayStatusName = (statusId) =>{
    return ["none","Received","Cancelled","Shipped","Pending" ][statusId];    
  }

  const formatDatetoString = (date) => {
    let d = new Date(date);
    return `${d.getDate()} - ${d.getMonth()} - ${d.getFullYear()}  ${d.getHours()}:${d.getMinutes()}`;
  }

  useEffect(() => {
    const newData = ordersData.filter((item) => {
      return filter === "none" ? true : +item.status === filter;
    });
    setData(newData);

  }, [filter]);

  return (
    <NavHeader>
      <div className={styles.overview_body_container}>
        <div className={styles.overview_body_container}>
          <h4>Ordini</h4>
          <br />
          <Table
            headKeys={[
              "#ID",
              "Nome",
              "Email",
              "Valore",
              "Status",
              "Pagamento",
              "Data Creata",
              <DownArrow key="arr" />,
            ]}
            tableData={data}
            displayHead={true}
            selfDisplayComponent={true}
            display
            displayComponent={data.filter((item) => {
              if (searchFilter == "none"|| searchFilter == "") {
                return item;
              }else if (
                item.id == searchFilter||
                item.first_name.toLowerCase().startsWith(searchFilter.toLowerCase()) ||
                item.last_name.toLowerCase().startsWith(searchFilter.toLowerCase()) ||
                item.email.toLowerCase().startsWith(searchFilter.toLowerCase())
                ) {
                return item;
              }
            }).map(
              ({ id, first_name, last_name, email, total_amount, status, payment_status, created_at, }, i) => (
                <tr key={i}>
                  <td>{id}</td>
                  <td>{`${first_name} ${last_name}`}</td>
                  <td>{email}</td>
                  <td>{total_amount}</td>
                  <td>
                    <Button
                    size={"auto"}
                    fontSize="0.8em"
                    color={displayStatusName(status)}
                    margin="16px 0"
                    className={`${displayStatusName(status).toLowerCase()}`}
                  >
                    {!status? displayStatusName(0): displayStatusName(status)}
                  </Button>
                  </td>

                  <td>
                    <Button
                    size={"auto"}
                    fontSize="0.8em"
                    color={!+payment_status? "Cancelled": "Received" }
                    margin="16px 0"
                    className={`${displayStatusName(status).toLowerCase()}`}
                  >
                    {+payment_status? "Pagato": "non pagato"}
                  </Button>
                  </td>
                  <td>{formatDatetoString(created_at)}</td>
                  <td>
                  <TableMenuButton 
                  button1={null}
                  button2={null}
                  viewcontent={{ text: 'VISUALIZZA DETTAGLI', url: `ordini/${id}`}}
                  attiva={{ url:`${routeConfig.updateOrder}/${id}`, data: {status: 3}, method: "patch", text: " Shipped "}}
                  sospende={{url:`${routeConfig.updateOrder}/${id}`, data: {status: 1}, method: "patch", text: " Received "}}
                  shipped={{url:`${routeConfig.updateOrder}/${id}`, data: {status: 4}, method: "patch", text: " Pending "}}
                  modifica={null}
                  delete ={{ url:`${routeConfig.updateOrder}/${id}`, data: {status: 5}, method: "patch", text: " Cancella Ordine "}}
                  />
                  </td>
                </tr>
              )
            )}
          >
            <RoundedInputWithIcon
              Suffix={SearchIcon}
              placeholder="RICERCA ORDINE"
              onChange={(e)=>{setSearchFilter(e.target.value)}}
            />

            <RadioButtonContainer
              id={"FIlter"}
              name="Filter"
              showLabel={false}
              changeState={setFilter}
              radioButtons={[
                { label: "TUTTI", value: "none" },
                { label: "RECEIVED", value: 1 },
                { label: "PENDING", value: 4 },
                { label: "CANCELLED", value: 2 },
                { label: "SHIPPED", value: 3 },
                // { label: "No FIlter", value: "none" },
              ]}
            />
          </Table>
        </div>
      </div>
    </NavHeader>
  );
}

export default Index;

export async function getServerSideProps({ req, res }) {
  try {
    let cook = Cok.parse(req.headers.cookie) || "";
    let token = cook.token;
    const ordersUrl = routeConfig.getOrdersAdmin;
    let ordersData = await axiosHttp(ordersUrl, null, "GET", token);

    return { props: { ordersData } };
  } catch (error) {
    return { props: { ordersData: OrdiniData } };
  }
}
