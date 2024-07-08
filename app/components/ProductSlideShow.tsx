import {
  type ReactElement,
  type MutableRefObject,
  useEffect,
  useRef,
} from 'react';
import Slider from 'react-slick';

function ProductSlideShow({
  children,
  nextState,
  newState,
}: {
  children: string | ReactElement | ReactElement[];
  nextState: (arg1: number) => void;
  newState: number;
}) {
  const slider: MutableRefObject<Slider> | undefined = useRef(undefined);

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    infinite: false,
    beforeChange: (current: number, next: number) => nextState(next),
    swipeToSlide: true,
    swipe: true,
    touchThreshold: 100,
    fade: false,
    speed: 500,
    cssEase: 'ease-out',
  };

  useEffect(() => {
    slider?.current.slickGoTo(newState);
  }, [newState]);

  return (
    <Slider ref={slider} {...settings}>
      {children}
    </Slider>
  );
}

export default ProductSlideShow;
