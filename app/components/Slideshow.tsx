import type {ReactElement} from 'react';
import React from 'react';
import Slider from 'react-slick';

function Slideshow({
  children,
}: {
  children: string | ReactElement | ReactElement[];
}) {
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    swipeToSlide: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: 'linear',
  };

  return <Slider {...settings}>{children}</Slider>;
}

export default Slideshow;
