import React, { useState } from "react";

const PlayColor = () => {

    const [hexColor, setHexColor] = useState("#ff0000");
    const handleColorChange = (e) =>{
        const rgb = hexToRgb(e);
    }

    const hexToRgb = (hex) => {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      }

    return (<div class="container g-padding-y-120--xs">
        
        <input type="color" value={"#ff0000"} onChange={(e)=>handleColorChange(e.target?.value)}></input>
    </div>)
}

export default PlayColor;