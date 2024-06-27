import {useRef, useEffect} from 'react';
import type {ReactElement, MutableRefObject} from 'react';
import Slider from 'react-slick';

function CustomSlideshow({
  children,
  className,
  newState,
  centerMode = true,
  autoPlay = true,
  numberSlides = 1,
}: {
  children: string | ReactElement | ReactElement[];
  className: string;
  newState: number;
  centerMode: boolean;
  autoPlay: boolean;
  numberSlides: number;
}) {
  const slider: MutableRefObject<Slider> | undefined = useRef(undefined);

  if( newState ){
    useEffect(() => {
      slider?.current.slickGoTo(newState);
    }, [newState]);
  }
  

  const isAutoPlay = autoPlay == true ? true : false;

  const settings = {
    autoplay: false,
    slidesToShow: numberSlides,
    slidesToScroll: 1,
    variableWidth: centerMode,
    swipeToSlide: true,
    centerMode: centerMode,
    speed: 1000,
    cssEase: 'linear',
    autoplaySpeed: isAutoPlay ? 5000 : 0,
    adaptiveHeight: !centerMode,
    infinite: true,
  };

  return (
    <div className={className}>
      <Slider ref={slider} {...settings}>
        {children}
      </Slider>
    </div>
  );
}

export default CustomSlideshow;
