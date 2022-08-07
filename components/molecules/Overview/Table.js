import React, { Fragment } from "react";
import styles from "../../../styles/Home.module.css";
import TableComponent from "../Table";
import Button from "../../atoms/Buttons";
import TableData from "../../../config/OverviewTable";
import { useRouter } from "next/router";
import Arrow from "../../../images/icons/Arrow";

function Table({orders}) {
  const router = useRouter();
  const displayStatusName = (statusId) =>{
    return ["none","Received","Cancelled","Shipped","Pending" ][statusId];    
  }
  return (
    <div className={styles.table}>
      <TableComponent
        headKey={["id", "name", "email", "amount", "status", "date"]}
        tableData={orders}
        displayHead={false}
        selfDisplayComponent={true}
        displayComponent={orders.map(
          ({ id, first_name, last_name, email, total_amount, status, date }, i) => (
            <tr key={i}>
              <td>{id}</td>
              <td>{first_name} {last_name}</td>
              <td>{email}</td>
              <td>{total_amount}</td>
              <Button
                    size={"auto"}
                    fontSize="0.8em"
                    color={displayStatusName(status)}
                    margin="16px 0"
                    className={`${displayStatusName(status).toLowerCase()}`}
                  >
                    {!status? displayStatusName(0): displayStatusName(status)}
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
