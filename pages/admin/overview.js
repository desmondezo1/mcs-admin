import Nav from "../../components/molecules/Nav";
import Header from "../../components/molecules/Header";
import styles from "../../styles/Home.module.css";
import Head from "next/head";
import NavHeader from "../../components/molecules/NavHeader";

import Chart from "../../components/molecules/Overview/Chart";
import SecondContainer from "../../components/molecules/Overview/SecondContainer";
import Table from "../../components/molecules/Overview/Table";
import DiagonalArrow from "../../images/icons/DiagonalArrow";

function overview(props) {
  return (
    <NavHeader>
      <div className={styles.overview_body_container}>
        <Chart />
        <SecondContainer />
        <Table />

        <div
          className="d-flex align-items-center justify-content-end"
          style={{
            margin: "80px 0",
          }}
        >
          <button
            style={{
              borderRadius: "15px",
            }}
          >
            OPEN ANALYTICS <DiagonalArrow />{" "}
          </button>
        </div>
      </div>
    </NavHeader>
  );
}

export default overview;
