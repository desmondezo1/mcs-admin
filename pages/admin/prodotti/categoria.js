import React from "react";
import PageHeader from "../../../components/molecules/NavHeader";
// import CategoriaStyle from "../../../styles/prodotti/categoria.css";
import { RoundedInput } from "../../../components/atoms/Input";
import { Categoria } from "../../../config/CategoriesData";
import Accordion, { AccordionList } from "../../../components/atoms/Accordion";

function categoria(props) {
  return (
    <PageHeader title={"Categoria"}>
      <div className={""} style={{ width: "78%" }}>
        <h4 className="my-3 "> Categoria</h4>

        <div className="border_primary border-radius-15 p-4 primary_background">
          <div className="d-flex flex-row align-item-start">
            <div className="w-50">
              <p>Lista Categoria</p>
            </div>
            <div className="border_black p-2 border-radius-15">
              {Categoria.map(({ name, subList }, i) =>
                subList.length > 0 ? (
                  <Accordion key={i} name={name} listData={subList} />
                ) : (
                  <AccordionList key={i} id={`${name}_${i}`} label={name} />
                )
              )}
            </div>
          </div>
          <hr className="my-5" />
          <div className="d-flex flex-row align-item-start">
            <div className="w-50">
              <p>Aggiungi Sottocategoria</p>
            </div>
            <div>
              <div className="mb-4">
                <RoundedInput
                  id={"Nome"}
                  key={"Nome"}
                  label="Nome"
                  labelAlign={"vertical"}
                />
              </div>
              <p className="small_text grey_text">Categoria</p>
              <div className="border_black p-2 border-radius-15">
                {Categoria.map(({ name, subList }, i) =>
                  subList.length > 0 ? (
                    <Accordion key={i} name={name} listData={subList} />
                  ) : (
                    <AccordionList key={i} id={`${name}_${i}`} label={name} />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageHeader>
  );
}

export default categoria;
