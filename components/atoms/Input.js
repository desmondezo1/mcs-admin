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
  labelAlign: "row",
};

export function RoundedInput({ id, label, labelAlign, ...rest }) {
  return (
    <div
      className={`${FormStyle.input_container} ${
        labelAlign === "vertical" && FormStyle.column
      }  my-2`}
    >
      <label htmlFor={id}>{label}</label>
      <input id={id} className="p-1 px-2" {...rest} />
    </div>
  );
}

export function RoundedInputWithIcon({ Prefix, Suffix, ...rest }) {
  return (
    <div className={FormStyle.input_field_with_icon}>
      {Prefix && <Prefix />}
      <input type="text" {...rest} />
      {Suffix && <Suffix />}
    </div>
  );
}

export function RadioButton({ label, name, value, ...rest }) {
  return (
    <>
      <input name={name} value={value} type="radio" id={value} {...rest} />
      <label htmlFor={value}>{label}</label>
    </>
  );
}

RadioButtonContainer.defaultProps = {
  id: "ID",
  label: "Input Label",
};

RadioButtonContainer.defaultProps = {
  showLabel: true,
};
export function RadioButtonContainer({
  id,
  label,
  name,
  radioButtons,
  showLabel,
  changeState,

  ...rest
}) {
  const radios = radioButtons.map(({ label: inputLabel, value }, i) => (
    <RadioButton
      label={inputLabel}
      value={value}
      name={name}
      key={`${i}-${value}_${name}`}
      onChange={(e) => changeState(value)}
      {...rest}
    />
  ));
  return (
    <div className={`${FormStyle.input_container}  my-3`}>
      {showLabel && (
        <div htmlFor={id} className="label">
          {name}
        </div>
      )}
      <div className={`${FormStyle.radio_container}`}>{radios}</div>
    </div>
  );
}
