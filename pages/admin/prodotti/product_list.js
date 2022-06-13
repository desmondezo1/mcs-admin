import React, { useEffect, useState } from "react";
import NavHeader from "../../../components/molecules/NavHeader";
import Table from "../../../components/molecules/Table";
import DownArrow from "../../../images/icons/DownArrow";
import ProductListData from "../../../config/ProductListData";
import ProfilePicture from "../../../images/icons/ProfilePicture";
import TableMenuButton from "../../../components/atoms/TableMenuButton";
import Buttons from "../../../components/atoms/Buttons";
import SearchIcon from "../../../images/icons/SearchIcon";
import AddIcon from "../../../images/icons/AddIcon";
import Cok from 'cookie'
import routeConfig from '../../../config/routeConfig'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import axiosHttp from "../../../utility/httpCalls";

import {
  RadioButtonContainer,
  RoundedInputWithIcon,
} from "../../../components/atoms/Input";

function Product_list({productListData}) {

  const[searchTerm, setSearchTerm] = useState('');
  const[tableFilter, settableFilter] = useState('');
  const[prodD, setProdD] = useState();

  useEffect(()=>{
    if(productListData){
      setProdD(productListData)
    }
  })

  return (
    <NavHeader>
      <div
        className={""}
        style={{
          width: "78%",
        }}
      >
        <h4>Lista Prodotti</h4>

        <br />
        <br />
        <Table
          headKeys={[
            "No",
            "Nome",
            // "Email",
            "Data Creata",
            "Status",
            () => <DownArrow />,
          ]}
          tableData={prodD}
          displayHead={true}
          selfDisplayComponent={true}
          displayComponent={prodD?.filter(val=>{
            if (!searchTerm) {
              return val;
            } else if(
              val.title.toLowerCase().includes(searchTerm.toLowerCase())
            ){
              return val;
            }
          }).filter(val => {
            if(!tableFilter){
              return val;
            } else if(
              val.status.toLowerCase() === tableFilter.toLowerCase()
            ){
              return val;
            }else if(
              tableFilter.toLowerCase() === "all"
            ){
              return val;
            }

          }).map(
            ({ id, title, status, updated_at }, i) => (
              <tr key={i}>
                <td>{i +1}</td>
                <td>
                  <ProfilePicture
                    style={{
                      marginRight: "6px",
                    }}
                  />
                  {title}
                </td>
                <td>{updated_at}</td>
                <Buttons
                  size={"auto"}
                  fontSize="0.8em"
                  color={status === "published" ? "Received" : "Cancelled"}
                  margin="16px 0"
                >
                  {status === "published" ? "Attivo" : "Bozza"}
                </Buttons>
                <td>
                  <TableMenuButton 
                  button1={{ text: 'Attivo', method: "patch", url: `${routeConfig.updateProduct}/${id}`, value:{status:"published"}}}
                  button2={{ text: 'BOZZA',  method: "patch", url: `${routeConfig.updateProduct}/${id}`, value:{status:"unpublished"}}}
                  viewcontent={null}
                  attiva={null}
                  sospende={null}
                  modifica={{ url: `/admin/prodotti/agguino/${id}`, text: "Modifica Prodotto"}}
                  delete ={{url:`${routeConfig.deleteProduct}/${id}`, data: null, method: 'DELETE', text: ' Cancella Prodotto '}}
                  />
                </td>
              </tr>
            )
          )}
        >
          <RoundedInputWithIcon
            Suffix={SearchIcon}
            placeholder="RICERCA PRODOTTI"
            onChange={(e)=>{setSearchTerm(e.target.value)}}
          />

          <RadioButtonContainer
            id={"FIlter"}
            name="Filter"
            showLabel={false}
            radioButtons={[
              { label: "TUTTI", value: "all" },
              { label: "ATTIVO", value: "published" },
              { label: "BOZZA", value: "unpublished" },
            ]}
            onChange={(e)=>{settableFilter(e.target.value)}}
          />
        </Table>
      </div>
    </NavHeader>
  );
}

export default Product_list;

export async function getServerSideProps({req, res}) {

  let cook = Cok.parse( req.headers.cookie )|| '';
  let token = cook.token;
  const productsUrl = routeConfig.getProducts;
  let productListData = await axiosHttp(productsUrl,null,'GET',token);
  console.log({productListData});
  return { props: { productListData } }
}

