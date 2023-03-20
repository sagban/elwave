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
    return L.toFixed(4);
}


const toFrequency = (wavelength)=>{
    return (300000/wavelength).toFixed(4);
}

const playColor = (frequency) => {
    const audioCtx = new(window.AudioContext || window.webkitAudioContext)();
    var oscillator = audioCtx.createOscillator();

    oscillator.type = 'sine';
    oscillator.frequency.value = frequency; // value in hertz
    oscillator.connect(audioCtx.destination);
    oscillator.start();

    setTimeout(
        () => {
        oscillator.stop();
    }, 500);
}

const playFromHexcode = (hexColor) => {
    const rgb = hexToRgb(hexColor);
    const wv = rgbToWavelength(rgb);
    const fr = toFrequency(wv);
    playColor(fr);
}

export {rgbToWavelength, hexToRgb, toFrequency, playColor, playFromHexcode};