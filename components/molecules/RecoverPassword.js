import React from "react";
import Input from "../atoms/Input";
import style from "../../styles/molecule.module.css";
import Button from "../atoms/Buttons";

function RecoverPassword(props) {
  return (
    <div className={style.recover_password}>
      <h4 className="underlined_text">PASSWORD DIMENTICATA</h4>

      <p>
        Hai perso la password? Inserisci l’email cui è stata effettuata la
        registrazione (Admin).
        <br />
        Riceverai tramite email un link per generarne una nuova.
      </p>
      <Input placeholder="E-MAIL*" />
      <Button
        style={{
          width: "100%",
          justifyContent: "center",
        }}
        color="primary"
      >
        INVIA
      </Button>
    </div>
  );
}

export default RecoverPassword;
