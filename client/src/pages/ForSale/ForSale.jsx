import React from "react";

import SubNavbar from "../../components/ForSale/SubNavbar";
import ForSaleHero from "../../components/ForSale/ForSaleHero";
import ForSaleListing from "../../components/ForSale/ForSaleListing";


const ForSale = () => {
    return (    
        <div className="">
        <SubNavbar/>
        <ForSaleHero />
        <ForSaleListing/>
        </div>
    )
}
export default ForSale;