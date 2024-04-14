import { useEffect, useRef, useState } from "react";

const Carousel = ({ items, direction = "left" }) => {
  const [array, setArray] = useState(items);
  const intervalRef = useRef();
  const [shift, setShift] = useState(0);

  const [elementLength, setElementLength] = useState(0);

  useEffect(() => {
    setArray(items);
  }, [items]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setShift((prev) => (direction === "left" ? prev + 0.1 : prev - 0.1));
    }, 10);

    return () => clearInterval(intervalRef);
  }, []);

  if (!elementLength && array) {
    const carousel = document.getElementById("carousel");
    if (carousel && carousel.getBoundingClientRect().width > 0) {
      setElementLength(carousel.getBoundingClientRect().width / array.length);
    }
  }

  useEffect(() => {
    const carousel = document.getElementById("carousel");
    carousel.style.transform = `translate(${
      direction === "left" ? shift - elementLength : shift
    }px, 0)`;

    if (carousel && array) {
      const carouselLength =
        carousel.getBoundingClientRect().width / array.length;
      if (
        direction === "left"
          ? carouselLength - shift <= 0
          : carouselLength + shift <= 0
      ) {
        carousel.style.transition = "none";

        const firstInQueue =
          direction === "left" ? array[array.length - 1] : array[0];
        const newArray =
          direction === "left"
            ? array.slice(0, array.length - 1)
            : array.slice(1);
        direction === "left"
          ? newArray.unshift(firstInQueue)
          : newArray.push(firstInQueue);
        setArray(newArray);
        setShift(0);
      } else {
        carousel.style.transition = "all 0.01s ease";
      }
    }
  }, [shift]);

  return (
    <div className="carousel">
      <div id="carousel" className="line">
        {array &&
          array.map((item, index) => (
            <div key={item.id} className="item">
              <img src={item.image_url} alt="" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Carousel;
