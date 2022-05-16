import React from "react";
import Head from "next/head";
import Header from "../../../components/molecules/Header";
import Nav from "../../../components/molecules/Nav";
import styles from "../../../styles/Home.module.css";
import Table from "../../../components/molecules/Table";
import ClientList from "../../../config/ClientList";
import Button from "../../../components/atoms/Buttons";
import TableMenuIcon from "../../../images/icons/TableMenuIcon";
import ProfilePicture from "../../../images/icons/ProfilePicture";
import SearchIcon from "../../../images/icons/SearchIcon";
import {
  RadioButtonContainer,
  RoundedInputWithIcon,
} from "../../../components/atoms/Input";

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
                headKeys={["No", "Nome", "Email", "Data Creata", "Status", ""]}
                tableData={ClientList}
                displayHead={true}
                selfDisplayComponent={true}
                display
                displayComponent={ClientList.map(
                  ({ no, name, email, status, date }, i) => (
                    <tr key={i}>
                      <td>{no}</td>
                      <td>
                        <ProfilePicture
                          style={{
                            marginRight: "6px",
                          }}
                        />
                        {name}
                      </td>
                      <td>{email}</td>
                      <Button
                        size={"auto"}
                        fontSize="0.8em"
                        color={status === "Attivo" ? "Received" : "Cancelled"}
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
                  placeholder="RICERCA CLIENTI"
                />

                <RadioButtonContainer
                  id={"FIlter"}
                  name="Filter"
                  showLabel={false}
                  radioButtons={[
                    { label: "TUTTI", value: "TUTTI" },
                    { label: "CATEGORIA 1", value: "CATEGORIA 1" },
                    { label: "CATEGORIA 2", value: "CATEGORIA 2" },
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
