import React from "react";
import styles from "../../../styles/Home.module.css";
import FormStyle from "../../../styles/forms.module.css";
import Button from "../../../components/atoms/Buttons";
import AddIcon from "../../../images/icons/AddIcon";
import {
  RoundedInput,
  RadioButtonContainer,
} from "../../../components/atoms/Input";
import NavHeader from "../../../components/molecules/NavHeader";

function nuovouser(props) {
  return (
    <NavHeader>
      <div className={styles.overview_body_container}>
        <h4>Nuovo User</h4>
        <br />

        <div className="form_container d-flex flex-row justify-content-between primary_background border_primary p-4 align-items-start border-radius-15 position-relative">
          <div className={FormStyle.form_container}>
            <RoundedInput label="NOME" placeholder="Nome" />
            <RoundedInput label="COGNOME" />
            <RoundedInput label="EMAIL" />
            <RoundedInput label="TELEFONO" />
            <RoundedInput label="PASSWORD" type="password" />
            <RadioButtonContainer
              name={"RUOLO"}
              radioButtons={[
                {
                  label: "ADMIN",
                  value: "ADMIN",
                },
                {
                  label: "CREATOR",
                  value: "CREATOR",
                },
              ]}
            />

            <Button
              className={`position-absolute m-auto ${FormStyle.submit_button}`}
              size="auto"
            >
              SALVA{" "}
            </Button>
          </div>
        </div>
      </div>
    </NavHeader>
  );
}

export default nuovouser;
