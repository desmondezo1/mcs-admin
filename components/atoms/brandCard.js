import React from "react";
import Image from "next/image";
import brandLogo from '../../images/brandLogo.png'
import style from "../../styles/atoms.module.css";

BrandCard.defaultProps = {
 image: brandLogo,
 totalProducts: 0
};

function BrandCard({
    image,
    name,
    totalProducts,
    ...rest
  }) {
    return (
        <>
        
        <style jsx>
            {
            `
            .cardWrapper{
                border-radius: 12px;
                border: 1px solid #000;
                display: flex;
                flex-direction: column;
                min-width: 100px;
            }

            .imageWrapper{
                height: 97px;
                width: 100%;
                border-radius: 12px;
            }

            .imageWrapper img{
                height: 100%;
                border-radius: 12px;
            }

            `
            }

        </style>
        <div className="cardWrapper">
            <div className="imageWrapper">
                <Image src={image} height={'97px'} width={'97px'} layout='responsive'/>
            </div>
            <div className="brandNameWrapper">
                {name}
            </div>
            <div className="total">
                {totalProducts} products
            </div>

        </div>
        </>
    )
}

export default BrandCard;