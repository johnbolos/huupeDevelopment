import React, {useState, useRef, useCallback, useEffect} from 'react';
import emailjs from '@emailjs/browser';
import { useLoaderData} from '@remix-run/react';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import {json, type LoaderArgs} from '@shopify/remix-oxygen';

import pressPageBanner from '../images/pressPageBanner.webp';
import createTogether from '../images/press/create-together.webp';
import Carousel from '../components/CarouselCustom';
import CustomSlideshow from '../components/CustomSlideshow';
import abcNews from '../images/press/abc-news.webp';
import ktLa5 from '../images/press/ktla-5.webp';
import mensJournal from '../images/press/mens-journal.webp';
import theManual from '../images/press/the-manual.webp';
import us from '../images/press/us.webp';
import yahoo from '../images/press/yahoo.webp';

export const headers = routeHeaders;

export async function loader({request, params, context}: LoaderArgs) {
  const {page} = await context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: 'press',
      language: context.storefront.i18n.language,
    },
  });

  if (!page) {
    throw new Response(null, {status: 404});
  }

  const seo = seoPayload.page({page, url: request.url});

  return json({page, seo});
}

export default function PressPage() {
  const {page} = useLoaderData<typeof loader>();
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  // may be new state to handle mobile image selection
  const [selectedImageId, setSelectedId] = useState<number>(0);

  const reviewImages = [
    {
      image: abcNews,
      altText: 'ABC News logo',
      title: `South Florida entrepreneurs create ‘smart basketball hoop’`,
      description: 'Many athletes trying to get whatever edge they can, as they train and play. Now, a pair of South Floridians are taking a technological twist to a classic piece of childhood equipment and are hoping it provides an added boost to athletes’ games. Co-founders Paul Anton and Lyth Saeed have created Huupe, billed as the world’s first “smart basketball hoop.”',
      ctaText: 'Read More',
      ctaLink: 'https://www.local10.com/news/local/2022/12/07/south-florida-entrepreneurs-create-smart-basketball-hoop/',
    },
    {
      image: mensJournal,
      altText: `Men's Journal logo`,
      title: 'How Huupe Is Transforming the At-Home Basketball Game With a Smart Basketball Hoop',
      description: 'Basketball hoops have been a staple of American driveways for decades. From in-ground hoops, to portable or wall-mounted hoops, traditional basketball hoops with tempered glass, acrylic, plastic and even wooden backboards have been fixtures in the American driveway for generations. Fast forward to 2022, and basketball hoops are starting to look a bit different than how we typically remember them.',
      ctaText: 'Read More',
      ctaLink: 'https://www.mensjournal.com/entertainment/how-huupe-is-transforming-the-at-home-basketball-game-with-a-smart-basketball-hoop',
    },
    {
      image: ktLa5,
      altText: 'KTLA5 logo',
      title: 'Basketball gets playful upgrade thanks to smart backboard',
      description: 'Huupe is the world’s first smart basketball hoop. Basketball is about to get a serious upgrade with a new smart digital hoop that can track your baskets, offer on demand training, and even let you play live with other people around the world.',
      ctaText: 'Read More',
      ctaLink: 'https://ktla.com/morning-news/huupe-smart-basketball-hoop-review-digital-backboard-richontech/',
    },
    {
      image: yahoo,
      altText: 'Yahoo logo',
      title: `Huupe, a 'smart' basketball hoop startup, raises its game with $11M`,
      description: 'Basketball can be played just about anywhere and by anyone in the world, thanks to a confluence of factors that lower a lot of barriers: ubiquitous hoops set up in parks, schools, driveways and backyards. You can play with one or many, and the only other equipment needed is an inexpensive ball.',
      ctaText: 'Read More',
      ctaLink: 'https://www.yahoo.com/news/huupe-smart-basketball-hoop-startup-134306720.html',
    },
    {
      image: theManual,
      altText: 'The Manual logo',
      title: 'A Peloton-like hoop is coming for your driveway basketball game',
      description: `You've never played basketball like this. In 2023, the app fitness world will feature the digitally connected Huupe, adding one more sport to e-interactive workouts that include the Peloton app and Zwift e-cycling. This e-sport, however, required rigorous testing for the physical abuse that its smart backboard takes when in use.`,
      ctaText: 'Read More',
      ctaLink: 'https://www.themanual.com/fitness/huupe-peloton-like-smart-basketball-workout/',
    },
    {
      image: us,
      altText: 'Us Weekly logo',
      title: `Huupe, LIORE'e, Moxy Management and Ciro Jewelry Top the List of Today's Fastest Growing Early-Stage Brands`,
      description: `Huupe is the world's first-ever smart basketball hoop. Equipped with a high-definition screen as a backboard, huupe allows players to complete training drills or even play against other users no matter where they are.`,
      ctaText: 'Read More',
      ctaLink: 'https://www.usmagazine.com/celebrity-news/news/todays-fastest-growing-early-stage-brands/',
    },
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1920 },
      items: 3
    },
    desktop: {
      breakpoint: { max: 1920, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 465, min: 0 },
      items: 1
    }
  }

  const runTimer = useCallback(() => {
    timer.current = setTimeout(() => {
      if (selectedImageId === reviewImages.length - 1) {
        setSelectedId(0);
      } else {
        setSelectedId((prev) => prev + 1);
      }
    }, 7000);
  }, [reviewImages.length, selectedImageId]);

  const setIndex = (index: number) => {
    clearTimeout(timer.current);
    setSelectedId(index);
    runTimer();
  };

  useEffect(() => {
    runTimer();
    return () => clearTimeout(timer.current);
  }, [runTimer]);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_5y6y1vt', 'template_c4797bi', form.current, 'aOT0o80bLHVB42TED')
      .then((result) => {
          form.current.reset()
      }, (error) => {

      });
  };

  const klaviyoTrigger = () => {
    var _learnq = _learnq || [];

    _learnq.push(['openForm', 'TxAEmG']);
  }


  return (
    <>
      <section className='press-hero-banner relative h-screen xl:h-[1080px]'>
        <div className="flex absolute w-screen h-full bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${pressPageBanner})` }}></div>
        <div className="opacity-50 bg-black w-screen h-full"></div>
        <div className='flex flex-col gap-[21px] max-w-[82.27vw] absolute left-[36px] bottom-[70px] xl:left-[8.798vw] xl:bottom-[8.798vw] w-[356px] xl:w-[33.09vw]'>
          <h1 className='text-[11.627vw] sm:text-[50px] leading-[1em] xl:text[3.48vw] xl:leading-[0.975em] text-white font-black break-words'>WHAT'S EVERYONE SAYING?</h1>
          <p className='text-[14px] leading-[1.57em text-white break-words'>See all the latest press releases,reviews, and news on Huupe.</p>
        </div>

      </section>
      <div className='xl:mx-auto xl:px-[8.798vw] bg-white'>
        <section className='press-reviews w-full pt-[41px] pb-[30px] xl:pt-[4.29vw] xl:pb-[15px]'>
          <p className='font-bold text-[22px] leading-[1.35em] text-center'>Press Reviews</p>
          <div className="press-reviews-container">
            {reviewImages.map((item, index) => (
              <div key={index} className="relative flex align-center justify-center w-[36.04vw] h-[13.62vw] xl:w-full xl:h-full" onClick={() => { setIndex(index) }}>
                <img
                  draggable={false}
                  style={{ cursor: "pointer" }}
                  src={item.image}
                  alt={item.altText}
                  className={selectedImageId === index ? 'active-logo' : 'inactive-logo'}
                />
                <div className={selectedImageId === index ? 'arrow-down' : 'hidden'} />
              </div>
            ))}
          </div>
          <CustomSlideshow className={'xl:hidden'} newState={selectedImageId}>
            {reviewImages.map((item, index) => (
              <div
                key={item.title}
                className="press-logo-slide"
                onClick={() => {
                  setIndex(index);
                }}
              >
                <img
                  draggable={false}
                  style={{cursor: 'pointer'}}
                  src={item.image}
                  alt={item.altText}
                  className={
                    selectedImageId === index ? 'active-logo' : 'inactive-logo'
                  }
                />
                <div className="flex justify-center items-center">
                  <div
                    className={
                      selectedImageId === index ? 'press-arrow-down' : 'hidden'
                    }
                  />
                </div>
              </div>
            ))}
          </CustomSlideshow>

          <div className="flex flex-col xl:flex-row xl:pt-[136px] gap-[56px] xl:px-0">
            <div className="flex flex-col xl:max-w-[34.29vw] w-full px-[36px] xl:px-0">
              <img src={reviewImages[selectedImageId].image} alt={reviewImages[selectedImageId].altText} className='w-max max-h-[92px] max-w-[152px] pb-[10px] xl:pb-[9px]' />
              <h3 className='text-[30px] leading-[1.067em] xl:text-[2.15vw] xl:leading-[1em] font-black pb-[16px] xl:pb-[32px]'>{reviewImages[selectedImageId].title}</h3>
              <p className='text-[14px] leading-[1.571em] font-normal pb-[10px] xl:pb-[9px]'>{reviewImages[selectedImageId].description}</p>
              <a className='text-left font-bold cursor-pointer' href={reviewImages[selectedImageId].ctaLink} target="_blank">{reviewImages[selectedImageId].ctaText}</a>
            </div>
            <div className="flex w-full h-[287px] xl:max-w-[45.92vw] xl:h-[25.83vw] bg-no-repeat bg-center bg-cover xl:rounded-[10px]" style={{ backgroundImage: `url(${createTogether})` }} />
          </div>
        </section>

        <section className='press-reviews w-full pt-[70px] pb-[26px] xl:pt-[4.29vw] xl:pb-[15px]'>
          <p className='font-bold text-[22px] leading-[1.35em] text-center xl:pb-[70px]'>Press Videos</p>

          <div className="hidden xl:flex [&>iframe]:mx-auto xl:flex-row xl:gap-[36px] justify-center">
            <div className="xl:w-[26.43vw] xl:h-[14.98vw] w-full h-full">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/owhCIjvzHH4" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            </div>
            <div className="xl:w-[26.43vw] xl:h-[14.98vw] w-full h-full">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/baiNSlsvl7w" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            </div>

            <div className="xl:w-[26.43vw] xl:h-[14.98vw] w-full h-full">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/rqGUhvAtwso" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            </div>
          </div>
          <Carousel className='xl:hidden' sliderClassName='huupe-carousel__press-slider' typeOfCarousel='press-video-carousel'>
            <div className="xl:w-[26.43vw] xl:h-[14.98vw] w-[75.81vw] h-[43.02vw]">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/owhCIjvzHH4" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            </div>
            <div className="xl:w-[26.43vw] xl:h-[14.98vw] w-[75.81vw] h-[43.02vw]">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/baiNSlsvl7w" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            </div>

            <div className="xl:w-[26.43vw] xl:h-[14.98vw] w-[75.81vw] h-[43.02vw]">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/rqGUhvAtwso" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            </div>
          </Carousel>
        </section>

        <section className='let-create-together py-[70px] px-[36px] w-full xl:py-[150px]'>
          <div className="flex justify-between mx-auto">
            <div className="form flex flex-col w-full relative xl:max-w-[25.58vw]">
              <h3 className='text-[50px] leading-[1em] xl:text-[3.125rem] xl:leading-[1em] font-black'>Let's Create Together</h3>
              <div>
                <p className="font-bold mb-4 mt-6 xl:mt-[30px]">Your Details</p>
                <div className="klaviyo-form-TxAEmG" onClick={() => klaviyoTrigger()}></div>
              </div>
            </div>
            <div className="hidden xl:flex xl:w-full xl:max-w-[45.92vw] xl:h-[18.24vw] bg-no-repeat bg-center bg-cover rounded-[10px]" style={{ backgroundImage: `url(${createTogether})` }} />
          </div>
        </section>
      </div>
    </>
  );
}


const PAGE_QUERY = `#graphql
  query PageDetails($language: LanguageCode, $handle: String!)
  @inContext(language: $language) {
    page(handle: $handle) {
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
`;
