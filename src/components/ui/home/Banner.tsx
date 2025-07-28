"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Banner = () => {
  return (
    <Carousel>
      <div>
        <img src="https://i.ibb.co/1fM3zs7/01.jpg" />
      </div>
      <div>
        <img src="https://i.ibb.co/MNx4gcm/02.jpg" />
      </div>
      <div>
        <img src="https://i.postimg.cc/85yP393J/03.png" />
      </div>
      <div>
        <img src="https://i.ibb.co/Vm00Bnz/04.jpg" />
      </div>
      <div>
        <img src="https://i.ibb.co/d4ZFcZ3/05.png" />
      </div>
      <div>
        <img src="https://i.ibb.co/51YgYz5/06.png" />
      </div>
    </Carousel>
  );
};

export default Banner;
