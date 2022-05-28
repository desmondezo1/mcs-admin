import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../../components/molecules/Header";
import Nav from "../../components/molecules/Nav";
import styles from "../../styles/Home.module.css";
import Table from "../../components/molecules/Table";
import Button from "../../components/atoms/Buttons";
import TableMenuIcon from "../../images/icons/TableMenuIcon";
import ProfilePicture from "../../images/icons/ProfilePicture";
import SearchIcon from "../../images/icons/SearchIcon";
import axiosHttp from "../../utility/httpCalls";
import Cok from "cookie";
// import routeConfig from '../../../config/routeConfig'
import routeConfig from "../../config/routeConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  RadioButtonContainer,
  RoundedInputWithIcon,
} from "../../components/atoms/Input";
import OrdiniData from "../../config/OrdiniData";
import DownArrow from "../../images/icons/DownArrow";
import NavHeader from "../../components/molecules/NavHeader";

function Index({ ordersData }) {
  const [filter, setFilter] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(ordersData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const newData = ordersData.filter((item) => {
      return filter === "none" ? true : item.status === filter;
    });
    // setData(newData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              "Data Creata",
              <DownArrow key="arr" />,
            ]}
            tableData={data}
            displayHead={true}
            selfDisplayComponent={true}
            display
            displayComponent={data.map(
              ({ id, name, email, valore, status, date }, i) => (
                <tr key={i}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{valore}</td>
                  <Button
                    size={"auto"}
                    fontSize="0.8em"
                    color={status}
                    margin="16px 0"
                  >
                    {status}
                  </Button>
                  <td>{date}</td>
                  <td>
                    <TableMenuIcon />
                  </td>
                </tr>
              )
            )}
          >
            <RoundedInputWithIcon
              Suffix={SearchIcon}
              placeholder="RICERCA ORDINE"
            />

            <RadioButtonContainer
              id={"FIlter"}
              name="Filter"
              showLabel={false}
              changeState={setFilter}
              radioButtons={[
                { label: "TUTTI", value: "Tutti" },
                { label: "RECEIVED", value: "Received" },
                { label: "PENDING", value: "Pending" },
                { label: "CANCELLED", value: "Cancelled" },
                { label: "SHIPPED", value: "Shipped" },
                { label: "No FIlter", value: "none" },
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
