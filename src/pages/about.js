import React, { useState } from "react";

const About = () => {

    return (<div>
        <div class="container g-padding-y-80--xs">
            <div class="row g-padding-y-50--xs ">
                <div class="col-md-6">
                    <h1 class="g-font-weight--700 g-font-size-60--xs"><b>Only Change is Constant</b></h1>
                    <p class="g-font-weight--700 g-color--dark g-font-size-22--xs g-margin-t-25--xs">Constant is a web application, that is made for change detection. It provides an easy-to-use platform for users to search through the map interface for SAR images based on geo-locations and timestamps according to the need and use case. It looks through the world's largest network of commercial SAR satellites that has an archive of over 10 million images and 14 years of history. And present all the images in a sorted manner right on the top of the map in order to provide the user whole some idea about the images such that from where, what time, and how these images were taken by the SAR satellites.</p>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-5"><img class="g-margin-t-0--xs" src="https://images.pexels.com/photos/8981524/pexels-photo-8981524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Logo" width="480" /></div>
            </div>

        </div>
    </div>)
}

export default About;
