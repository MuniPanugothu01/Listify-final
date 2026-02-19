import React from "react";
import ForSaleSubNavbar from "../../components/ForSale/ForSaleSubNavbar";
import ForSaleHero from "../../components/ForSale/ForSaleHero";
import ForSaleListing from "../../components/ForSale/ForSaleListing";

const ForSale = () => {
    return (    
        <div className="">
        <ForSaleSubNavbar/>
        <ForSaleHero />
        <ForSaleListing/>
        </div>
    )
}
export default ForSale;