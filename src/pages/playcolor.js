import React, { useState } from "react";

const PlayColor = () => {

    const [hexColor, setHexColor] = useState("#ff0000");
    const [wavelength, setWavelength] = useState(0);
    const [tHz, setTHz] = useState(0);
    const handleColorChange = (hexvalue) =>{
        setHexColor(hexvalue);
        const rgb = hexToRgb(hexvalue);
        console.log(rgb);
        rgbToWavelength(rgb);
    }

    const hexToRgb = (hex) => {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
    }

    const rgbToWavelength = (rgb) =>{
        let R = rgb["r"]/255;
        let G = rgb["g"]/255;
        let B = rgb["b"]/255;

        let M = Math.max(R, G, B);
        let m = Math.min(R, G, B);
        let C = M - m;
        let H;
        if(C==0){
            console.log("black");
        }
        else if (M == R){
            H = (G-B)/C % 6
        }
        else if (M == G){
            H = (B-R)/C + 2
        }
        else if (M == B){
            H = (R-G)/C + 4
        }
        
        const L = 650 - 250 / 270 * H * 60;
        setWavelength(L.toFixed(4));
        setTHz(toFrequency(wavelength));
    }
    const toFrequency = (wavelength)=>{
        return (300000/wavelength).toFixed(4);
        // return (440 * Math.pow(2, (wavelength-650)/140)).toFixed(4);
    }

    return (<div class="container g-padding-y-120--xs">
        <div class="row">
            <div class="col-md-5">
            <p class="g-color--dark g-font-weight-600--xs g-font-size-20--xs">Select Color</p>
        <input class="selectBox" type="color" value={hexColor} onChange={(e)=>handleColorChange(e.target?.value)}></input>
            </div>
            <div class="col-md-7">
            {wavelength !=0?
        <div>
            <p>Wavelength of dominant color: {wavelength} nm</p>
            <p>Frequency of dominant color: {tHz} THz</p>
            </div>
        
        :""}
            </div>
        </div>
        
        
    </div>)
}

export default PlayColor;