import { useState, useEffect } from "react";
import "./NeonCarousel.css";

const images = [
  "https://www.ecartelera.com/images/noticias/fotos/49600/49626/1.jpg",
  "https://media.es.wired.com/photos/67c1d3abeb97da4d4b7964f3/master/w_2560%2Cc_limit/shrek-5-cast-announcement-tgj.jpg",
  "https://assets.aboutamazon.com/7f/e6/b76966994e56a97dbeba44f56009/barbie-hero.jpg",
];

function BackgroundDiv() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="neon-carousel">
      <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
      <button className="carousel-control-prev" onClick={prevSlide}>
        ‹
      </button>
      <button className="carousel-control-next" onClick={nextSlide}>
        ›
      </button>
    </div>
  );
}

export default BackgroundDiv;
