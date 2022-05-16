import React from "react";
import { Label } from "recharts";

import style from "../../styles/atoms.module.css";
import FormStyle from "../../styles/forms.module.css";

function Input(props) {
  return <input {...props} className={style.text_input} />;
}

export default Input;

RoundedInput.defaultProps = {
  id: "Input Id",
  label: "Input Label",
};
export function RoundedInput({ id, label, ...rest }) {
  return (
    <div className={`${FormStyle.input_container}  my-2`}>
      <label htmlFor={id}>{label}</label>
      <input id={id} className="p-1 px-2" {...rest} />
    </div>
  );
}

export function RadioButton({ label, name, value }) {
  return (
    <>
      <input name={name} value={value} type="radio" id={value} />
      <label htmlFor={value}>{label}</label>
    </>
  );
}

RadioButtonContainer.defaultProps = {
  id: "ID",
  label: "Input Label",
};

export function RadioButtonContainer({
  id,
  label,
  name,
  radioButtons,
  ...rest
}) {
  const radios = radioButtons.map(({ label: inputLabel, value }, i) => (
    <RadioButton label={inputLabel} value={value} name={name} key={i} />
  ));
  return (
    <div className={`${FormStyle.input_container}  my-3`}>
      <div htmlFor={id} className="label">
        {name}
      </div>
      <div className={`${FormStyle.radio_container}`}>{radios}</div>
    </div>
  );
}
