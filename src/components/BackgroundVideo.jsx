import React from "react";
import backgroundImage from '../assets/neubauazim.webp';
import "../styles/BackgroundVideo.css";

const BackgroundVideo = () => (
  <div className="background-video-container">
    <div className="background-image" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
    <div className="video-overlay"></div>
  </div>
);

export default BackgroundVideo; 