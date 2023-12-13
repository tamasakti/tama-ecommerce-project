import React from "react"
import image1 from "../assets/freestocks-_3Q3tsJ01nc-unsplash.webp"
import image2 from "../assets/freestocks-VFrcRtEQKL8-unsplash.webp"
import image3 from "../assets/karsten-winegeart-4bC1Ef88OYI-unsplash.webp"
import image4 from "../assets/toa-heftiba-abWByT3yg4-unsplash.webp"
import "../styling/slideshow.css"
const colors = [image1, image2, image3, image4];
const delay = 2500;


export default function Slideshow() {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === colors.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {colors.map((index) => (
          <div
            className="slide"
            key={index}
            style={{
                backgroundImage: `url(${index})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
          >
            {/* <img src={index} alt="gambar" className="img-slider"/> */}
          </div>
        ))}
      </div>

      <div className="slideshowDots">
        {colors.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}