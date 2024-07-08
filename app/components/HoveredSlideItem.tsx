import {useRef, useEffect, useState} from 'react';

function HoverSlideItem({ index, slide, setHasActive, hasActive, activeSlideIndex, setActiveSlideIndex } : { index: number; slide: any; setHasActive: any; hasActive: any; setActiveSlideIndex: any; activeSlideIndex: any; }) {
    const [hovered, setHovered] = useState(false);

    return (

        <div className={`w-full ${hasActive && activeSlideIndex != index ? 'lg:w-[0px]' : ( hasActive && activeSlideIndex == index ? 'lg:w-full lg:px-[5px]' : 'lg:w-3/12 lg:px-[5px]' )} loop-item transition-all`} key={index} onMouseEnter={() => { setHovered(true); setHasActive(true); setActiveSlideIndex(index); }} onMouseLeave={() => { setHovered(false); setHasActive(false); setActiveSlideIndex(-1);}}>
            <div className="relative lg:rounded-[20px] overflow-hidden min-h-[400px] h-[80vh] max-h-[940px]">
            { hovered ? 
                <video
                key={slide.video}
                width="100%"
                height="100%"
                autoPlay
                controls
              >
                <source src={slide.video} type="video/mp4" />
                <source src={slide.video} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            :
              <>
                <img className="object-cover h-full w-full" src={slide.image} alt={slide.heading + ' ' + index} />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#00000000] to-[#00000099]"></div>
                <div className={`absolute bottom-0 left-0 w-full text-center py-[30px] px-[${index == 0 ? '40px' : ( index == 1 ? '30px' : '5px' )}] z-20`}>
                    <h3 className="text-[#fff] text-[48px] lg:text-[32px] 2xl:text-[48px] font-black leading-[58px] lg:leading-[42px] 2xl:leading-[58px] !text-[Montserrat]">{slide.heading}</h3>
                </div>
              </>
            }
            </div>
        </div>
    );
}

export default HoverSlideItem;
