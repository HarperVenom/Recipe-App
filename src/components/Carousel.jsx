import { useEffect, useRef, useState } from "react";
import { adjustTitle } from "./Recipe";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

const Carousel = ({
  items,
  direction = "left",
  keyWord = "empty",
  loading,
  error,
  id,
}) => {
  const [array, setArray] = useState(items);
  const intervalRef = useRef();
  const [shift, setShift] = useState(0);
  const [active, setActive] = useState(null);

  const [elementLength, setElementLength] = useState(0);

  useEffect(() => {
    setArray(items);
  }, [items]);

  function startAnimation() {
    intervalRef.current = setInterval(() => {
      setShift((prev) => (direction === "left" ? prev + 0.1 : prev - 0.1));
    }, 0.1);
  }

  useEffect(() => {
    startAnimation();

    return () => clearInterval(intervalRef.current);
  }, []);

  if (!elementLength && array) {
    const carousel = document.getElementById(id);
    if (carousel && carousel.getBoundingClientRect().width > 0) {
      setElementLength(carousel.getBoundingClientRect().width / array.length);
    }
  }

  useEffect(() => {
    const carousel = document.getElementById(id);
    if (carousel)
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
      }
    }
  }, [shift]);

  function handleHover(index) {
    setActive(index);
  }
  function handleUnhover() {
    setActive(null);
  }

  return (
    <div className="carousel-container">
      <h3 className="header">
        <span>Keyword: </span> {keyWord}
      </h3>
      <div className="carousel">
        {loading ? (
          <Spinner loading={loading} />
        ) : error ? (
          <div>An error occured: {error.message}</div>
        ) : (
          <div id={id} className="line">
            {array &&
              array.map((item, index) => (
                <Link
                  to={"/Recipe-App/" + item.id}
                  key={item.id}
                  className={
                    "item " +
                    (active !== null
                      ? active !== index
                        ? "dark"
                        : "active"
                      : "")
                  }
                  onMouseEnter={() => handleHover(index)}
                  onMouseLeave={handleUnhover}
                >
                  <h3>{adjustTitle(item.title, 25)}</h3>
                  <img src={item.image_url} alt="" />
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;
