import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const ImageSlider = ({imageUrls}) => {
  const [ imageIndex, setImageIndex ] = useState(0)

  const slideStyle = {
    height: "100%",
    position: "relecative"
  }

  const sliderStyle = {
    width: "100%",
    height: "100%",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${imageUrls[imageIndex]})`,
  }

  const rightArrow = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "32px",
    fontSize: "45px",
    color: "#000",
    zIndex: 1,
    cursor: "pointer"
  }

  const leftArrow = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "32px",
    fontSize: "45px",
    color: "#000",
    zIndex: 1,
    cursor: "pointer"
  }

  const nextImage = () => {
    const isLastIndex = imageIndex === imageUrls.length - 1;
    const newIndex = isLastIndex ? 0 : imageIndex + 1;
    setImageIndex(newIndex);
  }

  const prevImage = () => {
    const isFirstIndex = imageIndex === 0;
    const newIndex = isFirstIndex ? imageUrls.length - 1 : imageIndex - 1;
    setImageIndex(newIndex);
  }

  return(
    <div style={slideStyle}>
      <div style={sliderStyle}></div>
      <div style={rightArrow} onClick={nextImage} ><FontAwesomeIcon icon={faChevronRight} /></div>
      <div style={leftArrow} onClick={prevImage} ><FontAwesomeIcon icon={faChevronLeft} /></div>
    </div>
  )
}

export default ImageSlider;
