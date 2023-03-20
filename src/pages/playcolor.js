import React, { useState } from "react";
import {rgbToWavelength, hexToRgb, toFrequency, playColor, playFromHexcode} from "../utils/utils";
const PlayColor = () => {

    const musicKeys = ["#9400D3","#4B0082", "#0000FF", "#00FF00", "#FFFF00", "#FF7F00", "#FF0000"]
    const [hexColor, setHexColor] = useState("#ff0000");
    const [wavelength, setWavelength] = useState(650);
    const [tHz, setTHz] = useState(460);


    const handleColorChange = (hexvalue) =>{
        setHexColor(hexvalue);
        const rgb = hexToRgb(hexvalue);
        const wv = rgbToWavelength(rgb);
        setWavelength(wv);
        const fr = toFrequency(wv);
        setTHz(fr);
    }

    const handlePlayButton = () =>{        
        playColor(tHz);
    }

    const handleKeyPress = (key) =>{
        playFromHexcode(key);
    }


    return (<div>
        <div class="g-fullheight--md home2">
            <div class="container g-ver-center--md g-padding-y-80--xs g-padding-y-100--sm">
                <div class="row">
                    <div class="col-lg-6 col-sm-8 g-hor-centered-row__col g-text-center--xs g-text-left--md g-margin-b-60--xs g-margin-b-0--md">
                        <div class="g-margin-b-30--xs g-margin-t-60--xs g-margin-r-20--xs">
                            <h1 class="g-font-size-36--xs g-font-size-45--sm g-font-size-55--sm g-font-size-60--lg g-color--primary g-font-weight--600">Listen the music of colors</h1>
                            <p class="g-font-size-20--xs g-font-weight-800--xs g-font-size-22--md g-color--white g-margin-b-0--xs"><b>An out of the box co-relation between color and sound wave that can help color blind people to feel the colors like never before.</b></p>
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
        <div class="container g-padding-y-80--xs g-padding-y-100--sm">
            <h1 class="g-font-weight--700"><b>Play Colors</b></h1>
            <p class="g-color--dark g-font-size-18--xs">Listen to the magic of colors!</p>
            <div class="row g-padding-y-40--xs">
                <div class="col-md-5">
                    <p class="g-color--dark g-font-weight-800--xs g-font-size-18--xs"><b>Select the color here:</b></p>
                    <input style={{"width":"100%", "height": "200px"}} type="color" value={hexColor} onChange={(e)=>handleColorChange(e.target?.value)}></input>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-6">
                {wavelength !=0?
                    <div class="g-margin-t-40--xs">
                        <p class="g-color--dark g-font-weight-800--xs g-font-size-18--xs">Wavelength of dominant color: {wavelength} nm</p>
                        <p class="g-color--dark g-font-weight-800--xs g-font-size-18--xs">Frequency of dominant color: {tHz} THz</p>
                        <button class="text-uppercase s-btn s-btn--xs s-btn--primary-bg g-padding-x-30--xs g-margin-t-40--xs" onClick={()=>handlePlayButton()}>
                            <b>Play Beat</b><span class="g-margin-l-5--xs material-icons-outlined">play_arrow</span>
                        </button>
                    </div>
                
                :""}
                </div>
            </div>
        </div>
        <div className="g-bg-color--dark">
            <div class="container g-padding-y-80--xs g-padding-y-100--sm">
                <h1 class="g-font-weight--700 g-color--white"><b>Create Music</b></h1>
                <p class="g-color--dark g-font-size-18--xs g-color--white">The power of colors is at your fingertips now! Tap a color, make a beat, and take your music on the move.</p>
                <div class="music-box g-margin-t-80--xs">
                    {musicKeys.map(key => <button class="music-key" onClick={()=>handleKeyPress(key)} style={{backgroundColor: key}}></button>)}
                </div>
            </div>
        </div>   
        
        
    </div>)
}

export default PlayColor;