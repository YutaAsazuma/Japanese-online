import React from 'react'
import videoSrc from 'file-loader!../../../assets/video/japan.mp4';
import './BackgroundVideo.css'

const BackgroundVideo = () => {
  return (
    <div className="bg-video-wrapper">
      <video loop autoPlay muted id="big-video">
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
}

export default BackgroundVideo;
