import React from "react";
import {playFromHexcode} from "../utils/utils";
const Product = (props) => {

    const handlePlay = (color) =>{
        if(color != null) playFromHexcode(color);
    } 

    return (<div class="product g-padding-x-5--xs g-padding-y-5--xs"> 
        <img width={200} src={props.product.image}></img>
        <p class="g-font-size-16--xs g-font-weight--600 g-color--dark g-margin-b-0--xs">{props.product.title}</p>
        <p class="g-font-size-14--xs g-color--dark g-margin-b-0--xs">Rs. {props.product.price}</p>
        <a href={props.product.link} target="_blank" class="g-font-size-14--xs">
            <b>Try Now</b>
            <span class="g-margin-l-5--xs material-icons-outlined">east</span>
        </a>
        <div class="g-margin-t-10--xs g-padding-x-10--xs g-padding-y-5--xs" onClick={()=>handlePlay(props.product.color)} 
        style={{"width": "200px", "height": "36px", "backgroundColor": props.product.color}}>
            <b>Listen</b>
            <span class="g-margin-l-5--xs material-icons-outlined">play_arrow</span>
        </div>
    </div>)
}

export default Product;
