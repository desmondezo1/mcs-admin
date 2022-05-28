import React, { useState } from "react";
import TableMenuIcon from "../../images/icons/TableMenuIcon";
import atomStyle from "../../styles/atoms.module.css";
import Button from "./Buttons";
import DeleteUserIcon from "../../images/icons/DeleteUserIcon";
import ModifyUser from "../../images/icons/ModifyUser";
import httpCalls from "../../utility/httpCalls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import Link from "next/link";

TableMenuButton.defaultProps = {
  iconContent: <TableMenuIcon />,
  button1: {},
  button2: {},
  delete: {},
  modifica_link: "/modifica",
};

function TableMenuButton({
  iconContent,
  button1,
  button2,
  modifica_link,
  ...rest
}) {
  const [open, setOpen] = useState(false);
  // console.log(iconContent);

  let deleteItem = async (url, data, method) => {
    const token = window.localStorage.getItem("token");

    let dataResult = await httpCalls(url, data, method, token);
    dataResult = await dataResult;
    if (dataResult) {
      toast.success("Clienti Deleted");
    } else {
      toast.error("Sorry, I guess something went wrong");
    }
  };

  let updateItem = async (url, data, method) => {
    const token = window.localStorage.getItem("token");
    let dataResult = await httpCalls(url, data, method, token);
    dataResult = await dataResult;
    if (dataResult) {
      if (dataResult.role == 1) {
        toast.success("Clienti Added to CATEGORIA 1");
      }
      if (dataResult.role == 3) {
        toast.success("Clienti Added to CATEGORIA 2");
      }
    } else {
      toast.error("Sorry, I guess something went wrong");
    }
    console.log({ dataResult });
  };

  return (
    <div className={atomStyle.table_menu_button_container}>
      <button
        className={atomStyle.table_menu_button}
        onClick={() => setOpen((prev) => !prev)}
      >
        {iconContent}
      </button>

      <div
        className={`${atomStyle.table_menu_button_container_modal} ${
          !open && atomStyle.display_none
        } border_primary border-radius-15`}
      >
        <Button
          type={"button"}
          key={"button1"}
          onClick={() => {
            updateItem(button1.url, button1.value, button1.method);
          }}
          size="auto"
          color="primary"
          fontSize="0.8em"
          margin={"10px 0"}
        >
          {button1.text ? button1.text : "Attivo"}
        </Button>
        <Button
          type={"button"}
          key={"button2"}
          onClick={() => {
            updateItem(button2.url, button2.value, button2.method);
          }}
          size="auto"
          color="secondary"
          fontSize="0.8em"
        >
          {button2.text ? button2.text : "BOZZA"}
        </Button>
        <hr />
        <Link href={modifica_link}>
          <a>
            {" "}
            <ModifyUser /> Modifica User{" "}
          </a>
        </Link>
        <p
          key={"cancelUser" + Date.now()}
          onClick={() => {
            deleteItem(rest.delete.url, rest.delete.data, rest.delete.method);
          }}
        >
          <DeleteUserIcon />
          Cancella User
        </p>
      </div>
    </div>
  );
}

export default TableMenuButton;
