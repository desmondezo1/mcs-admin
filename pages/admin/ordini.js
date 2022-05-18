import React from "react";
import Head from "next/head";
import Header from "../../components/molecules/Header";
import Nav from "../../components/molecules/Nav";
import styles from "../../styles/Home.module.css";
import Table from "../../components/molecules/Table";
import Button from "../../components/atoms/Buttons";
import TableMenuIcon from "../../images/icons/TableMenuIcon";
import ProfilePicture from "../../images/icons/ProfilePicture";
import SearchIcon from "../../images/icons/SearchIcon";
import {
  RadioButtonContainer,
  RoundedInputWithIcon,
} from "../../components/atoms/Input";
import OrdiniData from "../../config/OrdiniData";
import DownArrow from "../../images/icons/DownArrow";

function index(props) {
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
            <div className={styles.overview_body_container}>
              <h4>Lista Clienti</h4>
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
                tableData={OrdiniData}
                displayHead={true}
                selfDisplayComponent={true}
                display
                displayComponent={OrdiniData.map(
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
                  radioButtons={[
                    { label: "TUTTI", value: "TUTTI" },
                    { label: "RECEIVED", value: "RECEIVED" },
                    { label: "PENDING", value: "PENDING" },
                    { label: "CANCELLED", value: "CANCELLED" },
                    { label: "SHIPPED", value: "SHIPPED" },
                  ]}
                />
              </Table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default index;