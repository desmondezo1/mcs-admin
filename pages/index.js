import React from "react";
import Accordion, { AccordionList } from "../components/atoms/Accordion";
import { CategoriaData } from "../config/CategoriesData";

function index(props) {
  return (
    <div className="p-5">
      {CategoriaData.map(({ name, subList }, i) =>
        subList.length > 0 ? (
          <Accordion key={i} name={name} listData={subList} />
        ) : (
          <AccordionList key={i} id={`${name}_${i}`} label={name} />
        )
      )}
    </div>
  );
}

export default index;
