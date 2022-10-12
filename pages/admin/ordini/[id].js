import styles from "../../../styles/Home.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import routeConfig from "../../../config/routeConfig";
import NavHeader from "../../../components/molecules/NavHeader";
import axios from "axios";
import style from "../../../styles/table.module.css";
import productCss from "../../../styles/prodotti/prodotti.module.css";
import Cok from "cookie";
import { useEffect, useState } from "react";



export default function OrdiniDetails({order, token}) {
    const [prd, setPrd] = useState(JSON.parse(order?.product_id));
    const [billingAdd, setBillingAdd] = useState({});

    useEffect(() => {

        const axiosConfig = {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          };

      let ax = axios.get(`${routeConfig.updateNonAdminUser}/${order?.user_id}/billing-address`,axiosConfig).then(r =>{
        setBillingAdd(r.data.data);
      })
    })
    
   
    return (<>
        <NavHeader>
      <div className={styles.overview_body_container}>
        <div className={styles.overview_body_container}>
          <h4>Visualizza Dettagli</h4>
          <br />
            <div className={style.table_container}>
            <div className={productCss.formInputSection}>
                <h3 className={productCss.formSectionH3}>
                Dettagli Ordine
                </h3>
                    <div className={productCss.formInputWrapper}>
                        <div className={productCss.input}>
                            <ul style={{
                                marginLeft: "0px",
                                paddingLeft: "0px"
                            }}>
                                <li>Numero Ordine: {order?.id}</li>
                                <li>Data: {order?.created_at}</li>
                                <li>Indirizzo Email: {order?.email}</li>
                                <li>Totale: €{order?.total_amount}</li>
                                <li>Metodo di Pagamento: Carta di Credito</li>
                            </ul>
                        </div>

                        <div className={productCss.input}>
                            <table>
                                <th style={{
                                    color: "#999999",
                                    fontSize: "0.9rem",
                                    fontWeight: "500"
                                }}>Prodotti</th>

                                {prd?.map((item, index) =>{
                                    return(<>
                                    
                                <tr key={index} className={'proditemlist'} style={{
                                    borderTop: "1px solid #999999",
                                    borderBottom: "1px solid #999999",
                                }}>
                                    <td style={{
                                        padding: "10px 0px"
                                    }}>{order?.prd_details[index]?.title} </td>
                                    <td>€{order?.prd_details[index]?.price} x {item?.qty}</td>
                                    <td>€{order?.prd_details[index]?.price * item?.qty}</td>
                                </tr>                                    
                                    
                                    
                                    </>)
                                })}

                                <div style={{height: "20px"}}></div>
                                <tr style={{
                                    marginTop: "20px"
                                }}>
                                    <td> </td>
                                    <td>Subtotale</td>
                                    <td>€{order?.sub_total}</td>
                                </tr>
                                {/* <tr>
                                    <td> </td>
                                    <td>Sconto</td>
                                    <td>€113.25</td>
                                </tr> */}
                                {/* <tr>
                                    <td> </td>
                                    <td>IVA (22%)</td>
                                    <td>€0</td>
                                </tr> */}
                                <tr>
                                    <td> </td>
                                    <td>Spedizione</td>
                                    <td>€{order?.delivery_charge}</td>
                                </tr>
                                <div style={{height:"20px"}}></div>
                                <tr  style={{
                                    borderTop: "1px solid #999999",
                                    borderBottom: "1px solid #999999",
                                }}>
                                    <td></td>
                                    <td style={{
                                        padding: "20px 0px",
                                        fontSize: "1.2rem"
                                    }}>Totale</td>
                                    <td>€{order?.total_amount}</td>
                                </tr>
                            </table>
                        </div>

                        <div className={productCss.input} style={{
                           display: "flex",
                           flexDirection: "row",
                        }}>
                            <ul>
                                <li>Dati di Spedizione</li>
                                <li>{order?.first_name} {order?.last_name}</li>
                                <li>{order?.address}</li>
                                <li>{order?.phone}</li>
                                <li>{order?.email}</li>
                                <li>{order?.order_number}</li>
                            </ul>
                        
                            <ul>
                                <li>Dati di Fatturazione</li>
                                <li>{billingAdd?.first_name} {billingAdd?.last_name}</li>
                                <li>{billingAdd?.address1}</li>
                                <li>{billingAdd?.phone}</li>
                                <li>{billingAdd?.email}</li>
                                <li>{order?.order_number}</li>
                            </ul>
                        




                        </div>
                    </div>
                </div>
            </div>
          </div>
      </div>
    </NavHeader>
    
    
    </>)
}

export async function getServerSideProps({ req, res, params }) {
    // let token = req.headers.Cookies || '';

    // user/{user_id}/billing-address
  
    try {
      let cook = Cok.parse(req.headers.cookie) || "";
      let token = cook.token;
      const orderUrl = `${routeConfig.getOrderDetails}/${params.id}`;
      const axiosConfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
  
      let ax = await axios.get(orderUrl, axiosConfig);
      let result = await ax;

      let order ;
      if (result.data.data) {
        order = result.data.data;
      }


  
      // Pass data to the page via props
      return { props: { order , token} };
    } catch (error) {
      return {
        props: {
          order: {},
        },
      };
    }
  }
  