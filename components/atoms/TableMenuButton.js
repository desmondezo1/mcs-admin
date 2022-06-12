import React, { useState } from "react";
import TableMenuIcon from "../../images/icons/TableMenuIcon";
import atomStyle from "../../styles/atoms.module.css";
import Button from "./Buttons";
import DeleteUserIcon from "../../images/icons/DeleteUserIcon";
import ModifyUser from "../../images/icons/ModifyUser";
import httpCalls from "../../utility/httpCalls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/router'
import Cookies from "js-cookie";
import Link from "next/link";

TableMenuButton.defaultProps = {
  iconContent: <TableMenuIcon />,
  button1: {},
  button2: {},
  viewcontent: {},
  delete: {},
  modifica: {},
  sospende: {},
};

function TableMenuButton({
  iconContent,
  button1,
  button2,
  modifica,
  ...rest
}) {
  const router = useRouter();
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

  let modifyItem = async (url) => {
    router.push(url);
  };

  let updateItem = async (url, data, method) => {
    const token = window.localStorage.getItem("token");
    let dataResult = await httpCalls(url, data, method, token);
    dataResult = await dataResult;
    if (dataResult) {
      if (dataResult.role == 1) {
        toast.success("Updated!");
      }
      if (dataResult.role == 3) {
        toast.success("updated!");
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

        {!button1? "":
          (<Button
            type={"button"}
            key={"button1"}
            onClick={() => {
              updateItem(button1.url, button1.value, button1.method);
            }}
            size="auto"
            color="primary"
            fontSize="0.8em"
            margin={"10px 0"}
            style={{cursor: "pointer"}}
          >
            {button1.text ? button1.text : "Attivo"}
          </Button>
          )}
        


        {!button2? "":
          (<Button
          type={"button"}
          key={"button2"}
          onClick={() => {
            updateItem(button2.url, button2.value, button2.method);
          }}
          size="auto"
          color="secondary"
          fontSize="0.8em"
          style={{cursor: "pointer"}}
        >
          {button2.text ? button2.text : "BOZZA"}
        </Button>
        )}

        {!rest?.viewcontent? "":
          (<Button
          type={"button"}
          key={"button2"}
          onClick={() => {
            modifyItem(rest?.viewcontent?.url);
          }}
          size="auto"
          color="secondary"
          fontSize="0.8em"
          style={{cursor: "pointer"}}
        >
          {rest?.viewcontent.text ? rest?.viewcontent.text : "VIEW"}
        </Button>
        )}

        <hr />




      {modifica? ( 
        
        <p
          key={"modifyUser" + Date.now()}
          onClick={() => {
            modifyItem(modifica.url);
          }}
          style={{cursor: "pointer"}}
        >
            {" "}
            <ModifyUser />{modifica.text}{" "}

          
          </p>)
          
          :""}
       
          
      {!rest?.shipped? "" :(

        <p
          key={"shippedItem" + Date.now()}
          onClick={() => {
            updateItem(rest.shipped.url, rest.shipped.data, rest.shipped.method);
          }}
          style={{cursor: "pointer"}}
        >
          <ModifyUser />
          {rest?.shipped?.text}
        </p>

      )}


      {!rest?.attiva? "" :(

        <p
          key={"activatedUser" + Date.now()}
          onClick={() => {
            updateItem(rest?.attiva.url, rest.attiva.data, rest.attiva.method);
          }}
          style={{cursor: "pointer"}}
        >
          <ModifyUser />
          {rest?.attiva?.text}
        </p>

      )}

      {!rest?.sospende? "" :(

        <p
          key={"suspendUser" + Date.now()}
          onClick={() => {
            updateItem(rest?.sospende.url, rest.sospende.data, rest.sospende.method);
          }}
          style={{cursor: "pointer"}}
        >
        <ModifyUser />
          {rest?.sospende?.text}
        </p>

      )}


      {!rest?.delete? "" :(

        <p
          key={"cancelUser" + Date.now()}
          onClick={() => {
            deleteItem(rest.delete.url, rest.delete.data, rest.delete.method);
          }}
          style={{cursor: "pointer"}}
        >
          <DeleteUserIcon />
          {rest?.delete?.text}
        </p>

          )}


      </div>
    </div>
  );
}

export default TableMenuButton;
