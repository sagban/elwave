import React, { useState, useRef } from "react";
import SelectBox from "../components/selectBox";
import Webcam from "react-webcam";
import BarLoader from "react-spinners/BarLoader";

const FindShade = () => {
    const Finishes = ["matte", "glossy"];
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [shadeFinish, setShadeFinish] = useState("");
    const [image, setImage] = useState("");
    const [current, setCurrent] = useState(0);
    const [isloading, setIsLoading] = useState(false);

    const handleFinishes = (shadeFinish) =>{
        setShadeFinish(shadeFinish);
        goForward();
    }

    const handleCapture = ()=>{
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
          ){
            const imageSrc = webcamRef.current.getScreenshot();
            console.log(imageSrc);
            setImage(imageSrc);
          }
        goForward();
        setIsLoading(true);
    }
    const goForward = () =>{
        setCurrent(current + 1);
    };
    const goBack = () =>{
        if(current >0)setCurrent(current - 1);
    };

    const detect = async () => {
        // Check data is available
        if (
          typeof webcamRef.current !== "undefined" &&
          webcamRef.current !== null &&
          webcamRef.current.video.readyState === 4
        ) {
          // Get Video Properties
          const video = webcamRef.current.video;
          const videoWidth = webcamRef.current.video.videoWidth;
          const videoHeight = webcamRef.current.video.videoHeight;
          console.log(video);
    
          // Set video width
          webcamRef.current.video.width = videoWidth;
          webcamRef.current.video.height = videoHeight;
    
          // Set canvas height and width
          canvasRef.current.width = videoWidth;
          canvasRef.current.height = videoHeight;
        }
      };


    return (<div>
        {/* Select Finish Shade */}
        {current == 0 ?<div class="container g-padding-y-120--xs  g-fullheight--xs">
            <h1 class="g-font-weight--700"><b>What type of lipstick finish you prefer?</b></h1>
            <div class="row g-padding-y-50--xs ">
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
                    <p class="g-color--dark g-font-size-20--xs">We are looking for the lipstick product matches perfect with your skin tone and the finish you like.</p>
                    <p class="g-color--dark g-font-size-24--xs">Lipstick Finish: <b class="g-color--primary">{shadeFinish}</b></p>
                    <p class="g-color--dark g-font-size-24--xs">Skin Tone: <b class="g-color--primary">{shadeFinish}</b></p>
                    <BarLoader
                color={"#D93108"}
                loading={isloading}
                size={80}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
                </div>
                <div className="col-md-7"><img src={image}></img></div>
            </div>
        </div>:""}
        
        
    </div>)
}

export default FindShade;
