import React, { useState } from "react";
import TableMenuIcon from "../../images/icons/TableMenuIcon";
import atomStyle from "../../styles/atoms.module.css";
import Button from "./Buttons";
import DeleteUserIcon from "../../images/icons/DeleteUserIcon";
import ModifyUser from "../../images/icons/ModifyUser";
import httpCalls from "../../utility/httpCalls"

TableMenuButton.defaultProps = {
  iconContent: <TableMenuIcon />,
  button1: {},
  button2: {} 
};

function TableMenuButton({ iconContent, button1, button2 }) {

  
  const [open, setOpen] = useState(false);
  console.log(iconContent);

  let updateItem = async (url, data, method) => {
    const token = window.localStorage.getItem('token');
    let dataResult = await httpCalls(url, data, method,token);
        dataResult = await dataResult;
        console.log({dataResult});
  }

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
        <Button type={"button"}  key={"button1"} onClick={()=>{updateItem(button1.url,button1.value,button1.method)}} size="auto" color="primary" fontSize="0.8em" margin={"10px 0"}>
          {button1.text ? button1.text: "Attivo"}
        </Button>
        <Button type={"button"}  key={"button1"} onClick={()=>{updateItem(button2.url,button2.value,button2.method)}} size="auto" color="secondary" fontSize="0.8em">
        {button2.text ? button2.text: "BOZZA"}
        </Button>
        <hr />
        <p>
          <ModifyUser /> Modifica User
        </p>
        <p>
          <DeleteUserIcon />
          Cancella User
        </p>
      </div>
    </div>
  );
}

export default TableMenuButton;
