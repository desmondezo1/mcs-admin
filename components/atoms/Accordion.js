import React, { useState } from "react";
import style from "../../styles/atoms.module.css";
import DownArrow from "../../images/icons/DownArrow";

AccordionList.defaultProps = {
  id: "id",
  name: "Test Data",
  label: "List Content",
};
export function AccordionList({ id, name, label }) {
  return (
    <div className={`${style.check_list} d-flex flex-row align-items-center`}>
      <input type="checkbox" id={id} name={name} />
      <label htmlFor={id}></label>
      <p>{label}</p>
    </div>
  );
}

Accordion.defaultProps = {
  name: "Accordion",
  listData: [],
};
function Accordion({ name, listData, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={style.accordion_container}>
      <button
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
        {listData.map(({ name, subList }, i) =>
          subList.length > 0 ? (
            <Accordion key={i} name={name} listData={subList} />
          ) : (
            <AccordionList key={i} id={`${name}_${i}`} label={name} />
          )
        )}
      </div>
    </div>
  );
}

export default Accordion;
