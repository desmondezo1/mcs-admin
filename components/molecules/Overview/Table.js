import React, { Fragment } from "react";
import styles from "../../../styles/Home.module.css";
import TableComponent from "../Table";
import Button from "../../atoms/Buttons";
import TableData from "../../../config/OverviewTable";
import { useRouter } from "next/router";
import Arrow from "../../../images/icons/Arrow";

function Table(props) {
  const router = useRouter();
  return (
    <div className={styles.table}>
      <TableComponent
        headKey={["id", "name", "email", "amount", "status", "date"]}
        tableData={TableData}
        displayHead={false}
        selfDisplayComponent={true}
        displayComponent={TableData.map(
          ({ id, name, email, amount, status, date }, i) => (
            <tr key={i}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{email}</td>
              <td>{amount}</td>
              <Button
                size={"auto"}
                fontSize="0.8em"
                color={status}
                margin="16px 0"
              >
                {status}
              </Button>
              <td>{date}</td>
            </tr>
          )
        )}
      >
        <p className="grey_text">Latest Orders</p>
        <div>
          <Button color="secondary" size={"auto"}>
            <p
              style={{
                margin: "0px",
                marginRight: "10px",
              }}
              className="small_text"
              onClick={() => {
                router.push("/admin/ordini/");
              }}
            >
              SEE ALL
            </p>
            <Arrow />
          </Button>
        </div>
      </TableComponent>
    </div>
  );
}

export default Table;
