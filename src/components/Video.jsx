import React from 'react';
import '../styles/Video.css';

const Video = () => {
  return (
    <div className="video-container">
      <div className="video-effect-wrapper">
        <div className="video-player">
          <div className="video-wrapper">
            <iframe 
              className="video-iframe"
              loading="lazy" 
              title="Gumlet video player"
              src="https://play.gumlet.io/embed/680507e63ab3a7b826cece2d?preload=true&autoplay=true&loop=true&background=false&disable_player_controls=true"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"
              frameBorder="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
