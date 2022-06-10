import React from "react";
import Image from "next/image";
import brandLogo from "../../images/brand_logo.png";
import style from "../../styles/atoms.module.css";
import CancelRedButton from "../../images/icons/RedCancelIcon";

BrandCard.defaultProps = {
  image: brandLogo,
  totalProducts: 0,
};

function BrandCard({ image, name, totalProducts, deletefunction, ...rest }) {
  return (
    <>
      <style jsx>
        {`
          .cardWrapper {
            display: flex;
            flex-direction: column;
            padding: 1rem;
            position: relative; 
            align-items: flex-start;
            
          }

          .imageWrapper {
            height: 130px;
            width: 100%;
            border-radius: 12px;
            border-radius: 12px;
            border: 1px solid #000;
            display: flex; 
            flex-flow: row nowrap: 
            align-items: center; 
            justify-content: center;
          }

          .imageWrapper img {
            height: 100%;
            border-radius: 12px;
          }
          .brandNameWrapper{ 
            margin-top: 20px;
            font-size: 1.2rem;
          }
        `}
      </style>
      <div className="cardWrapper">
        <button
          style={{
            border: "0px",
            background: "none",
            position: "absolute",
            right: "0",
            top: "0",
          }}
          onClick={deletefunction}
          type="button"
        >
          <CancelRedButton />
        </button>
        <div className="imageWrapper">
          <Image
            src={image}
            height={"40px"}
            // width={"40px"}
            layout="intrinsic"
            style={{
              width: "400px",
            }}
            alt="brand"
          />
        </div>
        <div className="brandNameWrapper">{name}</div>
        <div className="total">{totalProducts} products</div>
      </div>
    </>
  );
}

export default BrandCard;
