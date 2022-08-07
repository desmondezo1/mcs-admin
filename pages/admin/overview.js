import Nav from "../../components/molecules/Nav";
import Header from "../../components/molecules/Header";
import styles from "../../styles/Home.module.css";
import Head from "next/head";
import NavHeader from "../../components/molecules/NavHeader";
import axiosHttp from "../../utility/httpCalls";
import Cok from "cookie";
import Chart from "../../components/molecules/Overview/Chart";
import SecondContainer from "../../components/molecules/Overview/SecondContainer";
import Table from "../../components/molecules/Overview/Table";
import DiagonalArrow from "../../images/icons/DiagonalArrow";
import routeConfig from "../../config/routeConfig";
function overview({ordersData}) {
  return (
    <NavHeader>
      <div className={styles.overview_body_container}>
        <Chart />
        <SecondContainer />
        <Table orders={ordersData}/>

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

export async function getServerSideProps({ req, res }) {
  try {
    let cook = Cok.parse(req.headers.cookie) || "";
    let token = cook.token;
    const ordersUrl = routeConfig.getOrdersAdmin;
    let ordersData = await axiosHttp(ordersUrl, null, "GET", token);
    console.log({ordersData})
    return { props: { ordersData } };
  } catch (error) {
    return { props: { ordersData: {} } };
  }
}