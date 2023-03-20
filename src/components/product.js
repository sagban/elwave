import React from "react";

const Product = (props) => {

    return (<div class="product g-padding-x-5--xs g-padding-y-5--xs"> 
        <img width={200} src={props.product.image}></img>
        <p class="g-font-size-16--xs g-font-weight--600 g-color--dark g-margin-b-0--xs">{props.product.title}</p>
        <p class="g-font-size-14--xs g-color--dark  g-margin-b-0--xs">Rs. {props.product.price}</p>
        <a href={props.product.link} target="_blank" class="text-uppercase">
                <b>Try Now</b>
        </a>
    </div>)
}

export default Product;
