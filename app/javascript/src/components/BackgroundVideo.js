import React from 'react'
import videoSrc from 'file-loader!../../../assets/video/japan.mp4';
import './BackgroundVideo.css'

const BackgroundVideo = ({ style }) => {
  return (
    <div className="bg-video-wrapper">
      <video style={style} loop autoPlay muted className="big-video">
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
}

export default BackgroundVideo;
