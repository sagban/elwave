import React, { useState } from "react";

const About = () => {

    return (<div>
        <div class="container g-padding-y-80--xs">
            <div class="row g-padding-y-50--xs ">
                <div class="col-md-6">
                    <h1 class="g-font-weight--700 g-font-size-60--xs"><b>Waving Colors!</b></h1>
                    <p class="g-font-weight--700 g-color--dark g-font-size-22--xs g-margin-t-25--xs">
                    EL Wave is an interactive web application to communicate with color-blind people and get personalized lip shade colors. 
                    <br/>
                    Here will be the experience: Once the user land on our website, there will be questions on the kind of look they would prefer. Later, a real-time picture will be taken of the user to find out the skin tone, which could lie under 6 categories of skin color. once the skin tone is detected personalized shades will be recommended. Along with the personalization we wanted the user to actually feel the color they going to shop for further. 
                    <br/>
                    Users could try out the wave feature to listen to the sound of the colors and the recommended lip shade. 
                    </p>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-5"><img class="g-margin-t-0--xs" src="https://images.pexels.com/photos/8981524/pexels-photo-8981524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Logo" width="480" /></div>
            </div>

        </div>
    </div>)
}

export default About;
