import { useRef, useState, forwardRef } from 'react'
import MultiCarousel from 'react-multi-carousel'
import {
  CarouselProps,
  ResponsiveType,
} from 'react-multi-carousel/lib/types'

import 'react-multi-carousel/lib/styles.css'
import useWindowDimensions from '~/lib/useWindowDimensions'


interface CarouselStyle extends React.ComponentPropsWithoutRef<'div'> {
  alignItems?: string;
  translateX?: any;
  disableFixedWidth?: boolean;
  startOffset?: number;
  typeOfCarousel?: string;
  autoPlay?: boolean;
  playSpeed?: number;
  infinite?: boolean;
  afterChange?: void;
}

interface Carousel extends CarouselStyle {
  navigator?: 'scroll' | 'bullet'
  partialVisible?: boolean
  centerMode?: boolean
  responsive?: ResponsiveType
  carouselControlClassName?: string
  scrollOffset?: number
  singleCarousel?: boolean,
  sliderClassName?: string
}

// items are based on how many items should the carousel to recognize as visible in screen.
const defaultResponsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1920 },
    items: 7
  },
  desktop: {
    breakpoint: { max: 1920, min: 1280 },
    items: 7
  },
  tablet: {
    breakpoint: { max: 1279, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 465, min: 0 },
    items: 1
  }
}

interface CarouselRef {
  current?: CarouselProps
  listRef?: any
}

function CarouselCustom(props: Carousel) {
  const { className, children, responsive, sliderClassName, typeOfCarousel, autoPlay, playSpeed, infinite, afterChange } = props
  const { width } = useWindowDimensions()
  const carousel = useRef<CarouselRef>()
  const [translateX, setTranslateX] = useState<number>(0)

  const beforeChange = (nextSlide: number) => {
    let adjust
    switch (typeOfCarousel) {
      case 'press-reviews-carousel':
        adjust = width - width / (2.5)
        if (nextSlide !== 0) setTranslateX(adjust * nextSlide)
        else setTranslateX(0)
        break;
      case 'press-video-carousel':
        let widthAdjust = 0;

        let currentSlideWidth = carousel.current?.listRef?.current?.offsetWidth
        if (width >= 768 && width < 1280) {
          widthAdjust = (width - currentSlideWidth + width / 10)
          adjust = 100 + 100 / width * 100;
          if (nextSlide !== 0) setTranslateX(adjust * nextSlide + widthAdjust)
          else setTranslateX(0)
        } else if (width >= 1280) {
          setTranslateX(-230)
        }
        break;
      default:
        break;
    }
  }

  return (
    <MultiCarousel
      ref={carousel as any}
      className={`huupe-carousel ${className}`}
      responsive={responsive || defaultResponsive}
      beforeChange={(nextSlide) => beforeChange(nextSlide)}
      afterChange={() => afterChange()}
      infinite={infinite}
      sliderClass={sliderClassName}
      additionalTransfrom={translateX}
      autoPlay={autoPlay ? true : false}
      autoPlaySpeed={autoPlay ? playSpeed : 0}
      transitionDuration={400}
      swipeable
      draggable
      focusOnSelect
      partialVisible
    >
      {children}
    </MultiCarousel>
  );
}

export default forwardRef(CarouselCustom);
