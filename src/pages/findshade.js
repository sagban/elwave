import React, { useState, useRef } from "react";
import SelectBox from "../components/selectBox";
import Product from "../components/product";
import Webcam from "react-webcam";
import BarLoader from "react-spinners/BarLoader";
import axios from 'axios';
import data from "../data.json";

const FindShade = () => {
    const Finishes = ["matte", "shiny"];
    const skin_tones = ["very light", "light", "fair", "medium", "light brown", "brown"];
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [shadeFinish, setShadeFinish] = useState("");
    const [skintone, setSkintone] = useState("");
    const [image, setImage] = useState("");
    const [current, setCurrent] = useState(0);
    const [isloading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const handleFinishes = (shadeFinish) =>{
        setShadeFinish(shadeFinish);
        goForward();
    }

    const handleCapture = async ()=>{
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
          ){
            const imageSrc = webcamRef.current.getScreenshot();
            // console.log(imageSrc);
            setImage(imageSrc);
            identifySkintone(imageSrc);
          }
        goForward();
    }
    const goForward = () =>{
        setCurrent(current + 1);
    };
    const goBack = () =>{
        if(current >0)setCurrent(current - 1);
    };

    const identifySkintone = (imagesrc) =>{
        if(imagesrc == '')return;
        setIsLoading(true);
        const body = {
            image: imagesrc
        }
        axios.post("https://elwave-funcapp.azurewebsites.net/api/GetSkinTone?code=7YMbiAPNj5D7alAdICAk_DXObk22LsSX6T9cRUnGgCTYAzFu08m7AA==", body)
        .then( (res)=>{
            setIsLoading(false);
            console.log(res);
            if(res.status ==200 && res?.data.hasOwnProperty('skintone')){
                console.log(res.skintone);
                if(res.skintone != "Unknown")setSkintone("medium");
                else setSkintone(res.skintone);
            }
        });
    }

    const handleShowProduct = () => {
        setProducts(data['data'].filter(p =>{
            return p.finish == shadeFinish.toLowerCase() && p.skintone == skintone.toLowerCase();
        }));
        console.log(products);
        goForward();
    }
    const startOver = () =>{
        setCurrent(0);
        setImage("");
        setProducts([]);
        setSkintone("");
        setShadeFinish("");
    }

    return (<div>
        {/* Select Finish Shade */}
        {current == 0 ?<div class="container g-padding-y-120--xs">
            <h1 class="g-font-weight--700"><b>What type of lipstick finish you prefer?</b></h1>
            <div class="row g-padding-y-100--xs ">
                {Finishes.map(f=> <div onClick={()=>handleFinishes(f)} class="col-md-3"><SelectBox text={f}/></div>)}
            </div>

        </div>:""}
        {/* Capture Image */}
        {current==1?<div class="container g-padding-y-120--xs">
        <h1 class="g-font-weight--700"><b>Identifying your skin tone</b></h1>
        <div>
            <Webcam
            ref={webcamRef}
            mirrored={true}
            style={{
                position: "relative",
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                textAlign: "center",
                zindex: 9,
                width: 640,
                height: 480,
            }}
            />
        </div>
        <button class="text-uppercase s-btn s-btn--xs s-btn--primary-bg g-padding-x-30--xs g-margin-t-40--xs" onClick={()=> goBack()}>
            <span class="g-margin-r-5--xs material-icons-outlined">west</span><b>Go Back</b>
        </button>
        <button class="text-uppercase s-btn s-btn--xs s-btn--primary-bg g-padding-x-30--xs g-margin-t-40--xs g-margin-l-10--xs" onClick={()=> handleCapture()}>
            <b>Capture</b><span class="g-margin-l-5--xs material-icons-outlined">east</span>
        </button>
        </div>:""}
        
        {current==2?<div class="container g-padding-y-120--xs">
            <div className="row">
                <div className="col-md-5">
                    <h1 class="g-font-weight--700"><b>Hang on...</b></h1>
                    <p class="g-color--dark g-font-size-20--xs">We are identifying your skin tone in order to reccomend products that suites better on you.</p>
                    
                    <BarLoader
                        color={"#D93108"}
                        loading={isloading}
                        size={100}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                    {skintone != ""?
                    <p class="g-color--dark g-font-size-24--xs">Closest match of your skin tone we found: <b class="g-color--primary">{skintone}</b></p>
                    :""}
                </div>
                <div className="col-md-7"><img src={image}></img></div>
            </div>
            <button class="text-uppercase s-btn s-btn--xs s-btn--primary-bg g-padding-x-30--xs g-margin-t-40--xs" onClick={()=> goBack()}>
                <span class="g-margin-r-5--xs material-icons-outlined">west</span><b>Go Back</b>
            </button>
            {skintone != ""?<button class="text-uppercase s-btn s-btn--xs s-btn--primary-bg g-padding-x-30--xs g-margin-t-40--xs g-margin-l-10--xs" onClick={()=> handleShowProduct()}>
                <b>Show Products</b><span class="g-margin-l-5--xs material-icons-outlined">east</span>
            </button>:""}
            
        </div>:""}
        {current==3?
        <div class="container g-padding-y-120--xs">
            <h1 class="g-font-weight--700"><b>Results</b></h1>
            <p class="g-color--dark g-font-size-20--xs">Here are the products that matches following parameters are:</p>
            <p class="g-color--dark g-font-size-20--xs">
                Lipstick Finish: <b class="g-color--primary">{shadeFinish}</b>
                <br/>
                Skin Tone: <b class="g-color--primary">{skintone}</b>
            </p>
            <div className="row">
                {products.length>0?
                    products.map(p =>(<div className="col-md-3"><Product product={p}></Product></div>)
                    )
                :""}
            </div>
            <button class="text-uppercase s-btn s-btn--xs s-btn--primary-bg g-padding-x-30--xs g-margin-t-40--xs" onClick={()=> startOver()}>
                <b>Start Over</b><span class="g-margin-l-5--xs material-icons-outlined">east</span>
            </button>
        </div>:""}
        
        
    </div>)
}

export default FindShade;
