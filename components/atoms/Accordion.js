import React, { useState } from "react";
import style from "../../styles/atoms.module.css";
import DownArrow from "../../images/icons/DownArrow";

AccordionList.defaultProps = {
  id: "id",
  name: "Test Data",
  label: "List Content",
};
export function AccordionList({
  inputType = "checkbox",
  id,
  name,
  label,
  value,
}) {
  return (
    <div className={`${style.check_list} d-flex flex-row align-items-center`}>
      <input type={inputType} id={id + Date.now()} value={value} name={name} />
      <label htmlFor={id + Date.now()}></label>
      <p>{label}</p>
    </div>
  );
}

Accordion.defaultProps = {
  name: "Accordion",
  listData: [],
};
function Accordion({ inputType = "checkbox", name, listData, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={style.accordion_container}>
      <button
        type="button"
        className="d-flex flex-row align-items-center"
        onClick={() => setOpen((s) => !s)}
      >
        <DownArrow
          className={open ? style.rotate_0 : style.rotate_90}
          stroke={"black"}
        />{" "}
        <p
          style={{
            margin: "0",
            marginLeft: "20px",
          }}
        >
          {name}
        </p>
      </button>
      <div
        className={`${style.accordion_body} ${
          open && style.open
        } position-relative`}
      >
        {listData.map(({ id, title, children }, i) =>
          children?.length > 0 ? (
            <Accordion key={i} name={title} listData={children} />
          ) : (
            <AccordionList
              inputType={inputType}
              key={i}
              id={`${title}_${i}`}
              value={id}
              label={title}
            />
          )
        )}
      </div>
    </div>
  );
}

export default Accordion;
