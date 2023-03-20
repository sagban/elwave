import React, { useState, CSSProperties } from "react";
import axios from 'axios';
import MoonLoader from "react-spinners/MoonLoader";
import { Store } from 'react-notifications-component';


const Home = () => {

    return (<>
    <div class="s-promo-block-v2 g-fullheight--md home">
        <div class="container g-ver-center--md g-padding-y-80--xs g-padding-y-100--sm">
            <div class="row">
                <div class="col-lg-6 col-sm-8 g-hor-centered-row__col g-text-center--xs g-text-left--md g-margin-b-60--xs g-margin-b-0--md">
                    <div class="g-margin-b-30--xs g-margin-t-60--xs">
                        <h1 class="g-font-size-36--xs g-font-size-45--sm g-font-size-55--sm g-font-size-80--lg g-color--primary g-font-weight--600">EL Wave</h1>
                        <h3>Estee Lauder</h3>
                        <p class="g-font-size-20--xs g-font-weight-800--xs g-font-size-22--md g-color--dark g-margin-b-0--xs"><b>A full-scaled AI tool to communicate with color-blind people and get personalized lip shade colors. </b></p>
                    </div>
                    <span class="g-display-block--xs g-display-inline-block--lg g-margin-b-10--xs g-margin-b-0--lg">
                        <a href="/find-lipshade" class="text-uppercase g-width-200--xs btn-block s-btn s-btn--sm s-btn--primary-bg g-padding-x-50--xs g-margin-b-20--xs">
                            <span class="g-display-block--xs g-font-size-13--xs">Get Started</span>
                        </a>
                    </span>
                </div>

            </div>
        </div>
    </div>
    </>)
}

export default Home;
