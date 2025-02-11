import {defer, type LoaderArgs} from '@shopify/remix-oxygen';
import {Suspense, useRef, useState, useCallback, useEffect} from 'react';
import {Await, useLoaderData} from '@remix-run/react';
import {AnalyticsPageType} from '@shopify/hydrogen';

import {
  ProductSwimlane,
  SlideCarousel,
  Link,
} from '~/components';
import CustomSlideshow from '../components/CustomSlideshow';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import LazyLoad from 'react-lazy-load';

import abc from '../images/abc.webp';
import hoh from '../images/hoh2.webp';
import mensjournal from '../images/mens-journal2.webp';
import themanual from '../images/the-manual.webp';
import weeklyus from '../images/weekly-us2.webp';
import yahoo from '../images/yahoo.webp';
import youtube from '../images/youtube.webp';

import trackData from '../images/trackData.webp';
import nbalevel from '../images/nbalevel.webp';
import liveCoaching from '../images/liveCoaching.webp';
import groupTournaments from '../images/groupTournaments.webp';
import homepagebanner from '../images/homepagebanner2.webp';

import huupeMini from '../images/huupeMini.webp';
import huupeMiniMobile from '../images/huupeMiniMobile.webp';


import huupeNewLogo from '../images/huupeMiniHeading.webp';



// VIdeos
import trackDataVideo from '../videos/trackData.webm';
import nbaLevelVideo from '../videos/nbaLevel.mp4';
import liveCoachingVideo from '../videos/liveCoachingVideo.mp4';


/* Whats in the box */
import whatsinthebox from '../images/whatsinthebox.webp';
import whatsinthebox2 from '../images/whatsinthebox2.png';
import whatsinthebox3 from '../images/whatsinthebox3.png';
import whatsinthebox4 from '../images/whatsinthebox4.png';
import whatsinthebox5 from '../images/whatsinthebox5.png';
import whatsinthebox6 from '../images/whatsinthebox6.png';
import whatsinthebox7 from '../images/whatsinthebox7.png';
// import whatsinthebox7 from '../images/huupeMini/step4.webp';
import whatsinthebox8 from '../images/whatsinthebox8.png';


import shottracking from '../images/shottracking.webp';
import huupeSpecs from '../images/huupemini-specs.webp';


/* Smart TV Apps */
import netflixIcon from '../images/netflix.webp';
import hboIcon from '../images/hbo.webp';
import youtubeIcon from '../images/youtubeIcon.webp';
import espnIcon from '../images/espn.webp';
import spotifyIcon from '../images/spotify.webp';
import disneyIcon from '../images/disney.webp';
import huluIcon from '../images/hulu.webp';
import appletvIcon from '../images/appletv.webp';
import paramountIcon from '../images/paramount.webp';


import worldFirstSmart from '../images/worldFirstSmart.webp';



export const headers = routeHeaders;

export async function loader({params, context}: LoaderArgs) {
  const {language, country} = context.storefront.i18n;
  if (
    params.locale &&
    params.locale.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    // If the locale URL param is defined, yet we still are on `EN-US`
    // the the locale param must be invalid, send to the 404 page
    throw new Response(null, {status: 404});
  }

  const {shop, hero} = await context.storefront.query(HOMEPAGE_SEO_QUERY, {
    variables: {handle: '/'},
  });

  const seo = seoPayload.home();

  return defer({
    shop,
    primaryHero: hero,
    // These different queries are separated to illustrate how 3rd party content
    // fetching can be optimized for both above and below the fold.
    featuredProducts: context.storefront.query(
      HOMEPAGE_FEATURED_PRODUCTS_QUERY,
      {
        variables: {
          country,
          language,
        },
      },
    ),
    analytics: {
      pageType: AnalyticsPageType.home,
    },
    seo,
  });
}

export default function Homepage() {
  const {
    featuredProducts,
  } = useLoaderData<typeof loader>();

  const thelogos = [
    {
        image: hoh,
        url: 'https://www.youtube.com/watch?v=jaFTibH-kOY&ab_channel=HouseofHighlights',
        altText: 'house of highlights logo',
      },
    {
      image: abc,
      url: 'https://www.local10.com/news/local/2022/12/07/south-florida-entrepreneurs-create-smart-basketball-hoop/',
      altText: 'ABC News logo',
    },
    {
      image: mensjournal,
      url: 'https://www.mensjournal.com/entertainment/how-huupe-is-transforming-the-at-home-basketball-game-with-a-smart-basketball-hoop',
      altText: `Men's Journal logo`,
    },
    {
    image: youtube,
    url: 'https://www.youtube.com/embed/baiNSlsvl7w',
    altText: 'YouTube logo',
    },
    {
    image: yahoo,
    url: 'https://www.yahoo.com/news/huupe-smart-basketball-hoop-startup-134306720.html',
    altText: 'Yahoo logo',
    },
    {
      image: themanual,
      url: 'https://www.themanual.com/fitness/huupe-peloton-like-smart-basketball-workout/',
      altText: 'The Manual logo',
    },
    {
      image: weeklyus,
      url: 'https://www.usmagazine.com/celebrity-news/news/todays-fastest-growing-early-stage-brands/',
      altText: 'Us Weekly logo',
    },
  ];

  const [slideActive, setslideActive] = useState(0);
  const [slideActiveVideo, setSlideActiveVideo] =
    useState<string>(trackDataVideo);
  const [slideActiveImage, setSlideActiveImage] = useState<string>(trackData);
  const slideWithText = [
    {
      image: trackData,
      heading: 'Shot Tracking',
      description:
        '<p>Data is how we measure improvement - so we built the huupe basketball hoop to keep track of everything you do on the court. Using state-of-the-art technology, the huupe tracks your shooting percentage, position on the court, speed, agility, release time, and more while giving you real time feedback. Then we analyze that data, give it back to you, and show you how you can improve. The huupe is the first ever smart basketball hoop that can use data to deliver insights for continuous improvement.</p>',
      url: '/products/the-huupe',
      video: trackDataVideo,
    },
    {
      image: nbalevel,
      heading: 'Distance Tracking',
      description:
        '<p>The huupe basketball hoop makes this possible. These workouts turn casual play to NBA game level. You can get access to targeted workouts and drills from NBA skills trainers, youth trainers, and everything in between.</p>',
      url: '/products/the-huupe',
      video: nbaLevelVideo,
    },
    {
      image: liveCoaching,
      heading: 'Worldwide Gaming',
      description:
        '<p>Book a live session with certified trainers that work with your schedule. Learn the fundamentals, get taken through pro workouts and take your game to the next level. These training sessions are geared towards propelling your basketball skills forward. Live sessions work on your time and at your pace so you can get truly tailored advice.</p>',
      url: '/products/the-huupe',
      video: liveCoachingVideo,
    },
    {
      image: groupTournaments,
      heading: 'Battle Royale',
      description:
        "<p>Get ready to break a sweat with your family and friends in a friendly group basketball competition using the huupe. Keeping track of scores and stats with the huupe is easy so you don't have to worry about it while you show off your skills.</p><p> The huupe allows you to create your own tournament. Invite your family and friends to see who the best shooter REALLY is.</p>",
      url: '/products/the-huupe',
    },
    {
      image: groupTournaments,
      heading: 'Daily Prize Challenges',
      description:
        "<p>Get ready to break a sweat with your family and friends in a friendly group basketball competition using the huupe. Keeping track of scores and stats with the huupe is easy so you don't have to worry about it while you show off your skills.</p><p> The huupe allows you to create your own tournament. Invite your family and friends to see who the best shooter REALLY is.</p>",
      url: '/products/the-huupe',
    },
    {
      image: groupTournaments,
      heading: 'Free attempt',
      description:
        "<p>Get ready to break a sweat with your family and friends in a friendly group basketball competition using the huupe. Keeping track of scores and stats with the huupe is easy so you don't have to worry about it while you show off your skills.</p><p> The huupe allows you to create your own tournament. Invite your family and friends to see who the best shooter REALLY is.</p>",
      url: '/products/the-huupe',
    },
    {
      image: groupTournaments,
      heading: 'No subscription',
      description:
        "<p>Get ready to break a sweat with your family and friends in a friendly group basketball competition using the huupe. Keeping track of scores and stats with the huupe is easy so you don't have to worry about it while you show off your skills.</p><p> The huupe allows you to create your own tournament. Invite your family and friends to see who the best shooter REALLY is.</p>",
      url: '/products/the-huupe',
    },
    {
      image: groupTournaments,
      heading: 'Stream your favorite apps. huupe mini Full Smart TV',
      description:
        "<p>Get ready to break a sweat with your family and friends in a friendly group basketball competition using the huupe. Keeping track of scores and stats with the huupe is easy so you don't have to worry about it while you show off your skills.</p><p> The huupe allows you to create your own tournament. Invite your family and friends to see who the best shooter REALLY is.</p>",
      url: '/products/the-huupe',
    },
    {
      image: groupTournaments,
      heading: 'All sensors. No camera',
      description:
        "<p>Get ready to break a sweat with your family and friends in a friendly group basketball competition using the huupe. Keeping track of scores and stats with the huupe is easy so you don't have to worry about it while you show off your skills.</p><p> The huupe allows you to create your own tournament. Invite your family and friends to see who the best shooter REALLY is.</p>",
      url: '/products/the-huupe',
    },
    {
      image: groupTournaments,
      heading: 'Over-the-door mount',
      description:
        "<p>Get ready to break a sweat with your family and friends in a friendly group basketball competition using the huupe. Keeping track of scores and stats with the huupe is easy so you don't have to worry about it while you show off your skills.</p><p> The huupe allows you to create your own tournament. Invite your family and friends to see who the best shooter REALLY is.</p>",
      url: '/products/the-huupe',
    },
    {
      image: groupTournaments,
      heading: 'Wall mount',
      description:
        "<p>Get ready to break a sweat with your family and friends in a friendly group basketball competition using the huupe. Keeping track of scores and stats with the huupe is easy so you don't have to worry about it while you show off your skills.</p><p> The huupe allows you to create your own tournament. Invite your family and friends to see who the best shooter REALLY is.</p>",
      url: '/products/the-huupe',
    },
    {
      image: groupTournaments,
      heading: 'Remote controlled',
      description:
        "<p>Get ready to break a sweat with your family and friends in a friendly group basketball competition using the huupe. Keeping track of scores and stats with the huupe is easy so you don't have to worry about it while you show off your skills.</p><p> The huupe allows you to create your own tournament. Invite your family and friends to see who the best shooter REALLY is.</p>",
      url: '/products/the-huupe',
    },
  ];

  const whatsInTheBox = [
    {
      img: whatsinthebox
    },
    {
      img: whatsinthebox2
    },
    {
      img: whatsinthebox3
    },
    {
      img: whatsinthebox4
    },
    {
      img: whatsinthebox5
    },
    {
      img: whatsinthebox6
    },
    {
      img: whatsinthebox7
    },
    {
      img: whatsinthebox8
    },
  ];

  const hardware = [
    {
      title: 'Backboard',
      content: '22 x 17 x 1.5”',
    }
  ];

  const tvspecs = [
    {
      title: 'Resolution',
      content: 'FHD',
    }
  ];

  const powerContent = [
    {
      title: 'Mounting',
      content: 'Door-Mount, standard TV Vesa Wall-Mount',
    },
    {
      title: 'External Power',
      content: 'USB-C Cable',
    },
  ];

  const mechanical = [
    {
      title: 'Impact',
      content: 'Throwing balls at normal speed does not damage huupe or internal parts',
    },
    {
      title: 'Dunking',
      content: '"Soft" dunkability, no hanging. huupe does not break / damage.',
    },
    {
      title: 'Battery Recharging',
      content: '8000 mAh',
    },
  ];

  const shotTrackingSpecs = [
    {
      title: 'No Camera',
      content: 'huupe mini uses advanced radar and LiDar and does not use a camera',
    },
    {
      title: 'Shot Tracking',
      content: 'Can measure makes, attempts, what is distance to person: < 5 ft, 5ft - 10ft, >10ft distance.',
    }
  ];

  const audioSpecs = [
    {
      title: 'Compatibility with Airpods/Headphones',
      content: 'Yes',
    },
    {
      title: 'Speakers',
      content: '8W speakers',
    }
  ];


  const smartTVApps = [
    netflixIcon,
    hboIcon,
    youtubeIcon,
    espnIcon,
    spotifyIcon,
    disneyIcon,
    huluIcon,
    appletvIcon,
    paramountIcon
  ]

  const [progressingSlide2, setProgressingSlide2] = useState( 100 / slideWithText.length );
  const [progressingSlide, setProgressingSlide] = useState( progressingSlide2 - 3 );
  

  return (
    <>
      <section className="homepage-banner px-0 lg:px-0 mb-12 lg:mb-12">
        <div className="relative">
          
            <img src={homepagebanner} />
            {/* <video
              key={homeBannerVideo}
              height="100%"
              autoPlay
              loop
              muted
              playsInline
              poster={homepagebanner}
            >
              <source src={homeBannerVideo} type="video/mp4" />
              <source src={homeBannerVideo} type="video/webm" />
              Your browser does not support the video tag.
            </video> */}
          <div className="absolute top-0 left-0 w-full h-full flex flex-col text-center items-center justify-end pb-20 pt-20 md:px-8 lg:pt-0">
            <h1 className="mb-6 lg:mb-12 lg:!text-[50px] 2xl:!text-[68px]">The same fun smart huupe...but mini</h1>
            <Link
              key="/products/huupe-classic"
              to={`/products/huupe-classic`}
              target="_self"
              prefetch="intent"
              className="main-button normal-case"
            >
              Buy now
            </Link>
            <span className="mt-6">now available <del>$699</del> <b className="font-bold">$599</b></span>
          </div>
        </div>
      </section>

      <section className="homepage-logo-showcase px-6 lg:px-12 2xl:px-24 mb-12">
        <h2 className="text-center center">Featured In</h2>
        <div className="logo-wrapper hidden xl:flex ">
          {thelogos.map((thelogo, index) => (
            <a href={thelogo.url} key={index} target="_blank" rel="noreferrer">
              <img src={thelogo.image} alt={thelogo.altText} />
            </a>
          ))}
        </div>
        <SlideCarousel
          containerStyles={'logo-slider xl:hidden'}
          trackStyles={'logo-slide-track'}
        >
          {thelogos.map((thelogo, index) => (
            <a
              href={thelogo.url}
              key={index}
              target="_blank"
              rel="noreferrer"
              className="logo-slide"
            >
              <img src={thelogo.image} alt={thelogo.altText} />
            </a>
          ))}
        </SlideCarousel>
      </section>

      <section className="homepage-featured-products px-0 lg:px-12">
        <div className="homepage-featured-products-wrapper">
            {featuredProducts && (
                <Suspense>
                <Await resolve={featuredProducts}>
                    {({featuredProducts}) => {
                    if (!featuredProducts?.nodes) return <></>;
                    return (
                        <ProductSwimlane
                        products={featuredProducts}
                        title="Featured Products"
                        count={3}
                        />
                    );
                    }}
                </Await>
                </Suspense>
            )}
        </div>
      </section>


      <section className="homepage-banner homepage-huupemini-showcase px-0 lg:px-12 2xl:px-24 mb-12 lg:mb-16">
        <div className="relative">
          
          <LazyLoad>
            <img src={huupeMini} alt="Huupe Mini" className="hidden lg:block lg:rounded-[20px] w-full object-cover object-center h-full max-h-[700px] 2xl:max-h-[891px] lg:min-h-[600px] 2xl:min-h-[753px]"/>
          </LazyLoad>
          <LazyLoad>
            <img src={huupeMiniMobile} alt="Huupe Mini Mobile" className="block lg:hidden lg:rounded-[20px] w-full object-cover object-center"/>
          </LazyLoad>
          <div className="absolute top-0 left-0 w-full h-full flex flex-col text-center items-center justify-end pb-20 pt-20 md:px-8 lg:pt-0">
            <h2 className="mb-6 lg:mb-24 !text-[34px] lg:!text-[40px] 2xl:!text-[55px] leading-[100%]"><img className="h-[34px] lg:h-[38px] 2xl:h-[44px] inline-block" src={huupeNewLogo} alt="Huupe Logo"/> <b className="font-black !text-[34px] lg:!text-[40px] 2xl:!text-[55px]">mini</b><br/><span className="text-[34px] lg:text-[40px] 2xl:text-[55px] leading-[100%]">is now available for purchase.</span></h2>
            <Link
              key="/products/huupe-classic"
              to={`/products/huupe-classic`}
              target="_self"
              prefetch="intent"
              className="main-button normal-case"
            >
              Buy now
            </Link>
            <span className="mt-4 2xl:mt-6 text-[#000000] text-[16px]">now available <del>$699</del> <b className="font-bold">$599</b></span>
          </div>
        </div>
        <div className="mt-[20px] lg:mt-[50px] text-center flex items-center justify-center flex-col lg:gap-[20px] max-w-[1110px] mx-[auto]">
          <h2 className="mb-4 lg:mb-0 text-[#000] text-[50px] 2xl:text-[55px] leading-[100%] font-black normal-case lg:uppercase">
            Your games. <br className="block lg:hidden" />Your shows. <br className="block lg:hidden" />Your music. <br className="block lg:hidden" />All in the backboard.
          </h2>
          <p className="px-4 lg:px-0 max-w-[765px] mx-[auto] text-[#000] text-[20px] lg:text-[24px] leading-[30px] lg:leading-[24px]">The next generation of mini hoops are coming to you this year. Limited availability</p>
          <Link
              key="/products/huupe-classic"
              to={`/products/huupe-classic`}
              target="_self"
              prefetch="intent"
              className="main-button normal-case"
            >
              Buy now
            </Link>
            <span className="block text-[#000000] text-[16px] 2xl:text-[24px] mt-4 lg:mt-0">now available <del>$699</del> <b className="font-bold">$599</b></span>
        </div>
      </section>

      <section className="homepage-whatsinthebox px-0 lg:px-12 2xl:px-24 mb-12">
        <div className="whatsinthebox-text px-6 lg:px-0 max-w-[633px]">
          <h2 className="text-[#000] text-[24px] lg:text-[34px] 2xl:text-[48px] leading-[100%] font-bold mb-4">What's In The Box?</h2>
          <p className="text-[16px] text-[#000]">Everything you need to get your game on. Just find the nearest door, or mount it to your wall like you would a TV, hang up huupe mini, and start huuping.</p>
        </div>

        {whatsInTheBox && <>
        <div className="whatsinthebox-gallery hidden lg:flex flex-wrap mt-5">
          {whatsInTheBox.map((slider, index, elements) => (
            index != 2 && index != 5 ? 
              <div className={`p-0 lg:p-[10px] whatsinthebox-gallery-item w-full ${index == 3 || index == 4 || index == 5 ? 'whatsinthebox-gallery-item-small' : ''} ${index == 1 || index == 4 ?'flex flex-col' : ''}`} key={index}>
                <LazyLoad className={`${index == 1 || index == 4 ? 'pb-[10px]' : '' }`}>
                  <img className={`w-full h-full object-cover lg:rounded-[20px] bg-gradient-to-b from-[#f6f6f6] to-[#eaeaea] ${index == 1 || index == 4 ? 'flex-1' : '' }`} src={slider.img} alt={`Whats in the gallery image ${index}`}/>
                </LazyLoad>
                {index == 1 || index == 4 ? 
                  <LazyLoad className={`${index == 1 || index == 4 ? 'pt-[10px]' : '' }`}>
                    <img className="flex-1 w-full h-full object-cover lg:rounded-[20px] bg-gradient-to-b from-[#f6f6f6] to-[#eaeaea]" src={elements[index+1].img} alt={`Whats in the gallery image ${index+1}`}/>
                  </LazyLoad>
                : null}
              </div>
              : null
          ))}
        </div>
        <CustomSlideshow newState={1} numberSlides={1} className={'lg:hidden'} centerMode={false} autoPlay={false}>
          {whatsInTheBox.map((item, index) => (
            <div
              key={index}
              className="p-0 pt-[30px] whatsinthebox-gallery-item w-full"
            >
              <img
                draggable={false}
                src={item.img}
                alt={`Whats in the gallery image ${index+1}`}
                className="cursor-pointer w-full h-full object-cover bg-gradient-to-b from-[#f6f6f6] to-[#eaeaea]"
              />
            </div>
          ))}
        </CustomSlideshow>
        </>}
      </section>


      <section className="homepage-shottracking px-0 lg:px-12 2xl:px-24 mb-12 lg:mb-24">
          <div className="relative">
            <LazyLoad>
              <img src={shottracking} alt="Shot Tracking + Distance" className="min-h-[300px] object-cover max-h-[891px] lg:rounded-[20px]"/>
            </LazyLoad>
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center bg-[#00000033] rounded-[20px]">
              <h2 className="text-[#fff] text-[50px] lg:text-[80px] 2xl:text-[120px] font-black leading-[100%]">SHOP TRACKING + DISTANCE</h2>
              {/* <p className="w-full lg:text-[24px] 2xl:text-[34px] text-[#fff] lg:leading-[22px] hidden lg:flex justify-between px-[30px]"><span>Shot Tracking</span><span>Distance Tracking</span><span>All Sensors</span><span>No Camera</span><span>1pt 2pt 3pt</span><span>Daily Challenges</span></p> */}

              <SlideCarousel
                containerStyles={'mt-[25px]'}
                trackStyles={'flex gap-[15px]'}
              >
                <span className="whitespace-nowrap text-[16px] lg:text-[24px] 2xl:text-[34px] text-[#fff] leading-[24px] lg:leading-[22px] px-[10px]">Shot Tracking</span>
                <span className="whitespace-nowrap text-[16px] lg:text-[24px] 2xl:text-[34px]  text-[#fff] leading-[24px] lg:leading-[22px] px-[10px]">Distance Tracking</span>
                <span className="whitespace-nowrap text-[16px] lg:text-[24px] 2xl:text-[34px]  text-[#fff] leading-[24px] lg:leading-[22px] px-[10px]">All Sensors</span>
                <span className="whitespace-nowrap text-[16px] lg:text-[24px] 2xl:text-[34px]  text-[#fff] leading-[24px] lg:leading-[22px] px-[10px]">No Camera</span>
                <span className="whitespace-nowrap text-[16px] lg:text-[24px] 2xl:text-[34px]  text-[#fff] leading-[24px] lg:leading-[22px] px-[10px]">1pt 2pt 3pt</span>
                <span className="whitespace-nowrap text-[16px] lg:text-[24px] 2xl:text-[34px]  text-[#fff] leading-[24px] lg:leading-[22px] px-[10px]">Daily Challenges</span>
              </SlideCarousel>
            </div>
          </div>

          <h2 className="hidden lg:block font-black text-center mt-[50px] text-[34px] lg:text-[90px] 2xl:text-[120px] leading-[100%] text-[#000] px-[25px] lg:px-0 normal-case lg:uppercase">Play With friends around the world</h2>
          <p className="block lg:hidden font-black text-center mt-[50px] text-[34px] leading-[50px] text-[#000] px-[25px] normal-case">Play With friends around the world</p>
      </section>

      <section className="home-progressing-slide mb-12 bg-gradient-to-b from-[#f6f6f6] to-[#eaeaea]">
        <div className="p-0 pt-[15px] lg:pt-24 lg:p-12 2xl:p-24">
            <div className="block">
              <div className="flex flex-col lg:flex-row homepage-text-image-slider-item w-full">
                <div className="w-full lg:w-6/12 p-6 lg:p-0 lg:pr-4">
                  <h2 className="hidden lg:block text-[#000] text-[24px] lg:text-[40px] 2xl:text-[55px] font-black leading-[24px] lg:leading-[50px] 2xl:leading-[66px] normal-case lg:uppercase">The world's first smart mini hoop game console</h2>
                  <p className="block lg:hidden text-[#000] text-[24px] lg:text-[40px] 2xl:text-[55px] font-black leading-[24px] lg:leading-[50px] 2xl:leading-[66px] normal-case lg:uppercase">The world's first smart mini hoop game console</p>
                  <div className="slider-dots flex flex-col relative pl-0 mt-[20px]">
                    {/* <span className="slider-dots-fade-top absolute w-full top-0 left-[15px] pointer-events-none z-20" style={{height: (progressingSlide <= 8 ? 0 : progressingSlide) + '%'}}></span> */}
                    {slideWithText.map((sliderDot, index2) => (
                      // className={`${
                      //   slideActive == index2 ? 'active z-40 text-[#0071E3] text-[20px] lg:text-[28px] 2xl:text-[34px] font-bold' : 'z-10 text-[16px] lg:text-[20px] 2xl:text-[24px] font-normal text-[#000] opacity-40'
                      // } leading-[110%] cursor-pointer transition-all relative`}
                      <div
                        className={`${
                          slideActive == index2 ? 'active z-40 text-[#0071E3] text-[20px] lg:text-[28px] 2xl:text-[34px] font-bold' : 'active z-40 text-[#0071E3] text-[20px] lg:text-[28px] 2xl:text-[34px] font-bold'
                        } leading-[110%] transition-all relative`}
                        key={index2}
                        onClick={() => {
                          setslideActive(index2);
                          setSlideActiveVideo(
                            sliderDot.video ? sliderDot.video : '',
                          );
                          setProgressingSlide( index2 + 1 != slideWithText.length ?  ( progressingSlide2 * ( index2 + 1 ) ) - 3 : progressingSlide2 * ( index2 + 1 ) );
                          setSlideActiveImage(sliderDot.image);
                        }}
                        onMouseEnter={() => {
                          setslideActive(index2);
                          setSlideActiveVideo(
                            sliderDot.video ? sliderDot.video : '',
                          );
                          setProgressingSlide( index2 + 1 != slideWithText.length ?  ( progressingSlide2 * ( index2 + 1 ) ) - 3 : progressingSlide2 * ( index2 + 1 ) );
                          setSlideActiveImage(sliderDot.image);
                        }}
                      >{sliderDot.heading}</div>
                    ))}

                    {/* <span className="absolute h-full top-0 left-0 bg-[#D9D9D9] w-[6px] rounded-[120px]">
                      <span className="absolute top-0 left-0 w-full bg-[#0071E3] transition-all rounded-[120px]" style={{height: progressingSlide + '%'}}></span>
                    </span>
                    <span className="slider-dots-fade-bottom absolute w-full bottom-0 left-[15px] pointer-events-none z-20" style={{height: (100 - progressingSlide) + '%'}}></span> */}
                  </div>
                  
                </div>
                <div className="w-full lg:w-6/12 mt-[20px] lg:mt-0 slideMedia pl-0 lg:pl-4">
                  <img src={worldFirstSmart} className="h-full object-cover lg:rounded-[20px]" />
                </div>
              </div>
            </div>
        </div>
      </section>

      <section className="app-logos px-8 pt-[30px] lg:pt-0 lg:px-12 2xl:px-24 mb-12">
        <div className="text-center">
          <h2 className="text-[#000] text-[50px] lg:text-[120px] leading-[100%] font-black mb-[30px] lg:mb-[15px] normal-case lg:uppercase">A full smart TV</h2>
          <p className="text-[#000] text-[20px] 2xl:text-[24px] leading-[30px] 2xl:leading-[36px]">Stream your favorite apps while you play</p>
        </div>

        {smartTVApps.length !== 0 && <>
        <div className="app-logos-wrapper flex flex-wrap lg:flex-nowrap gap-x-[10px] gap-y-[15px] lg:gap-[25px] lg:justify-between mt-[40px]">
          {smartTVApps.map((logo,index,elements) => (
            <LazyLoad key={index} >
              <img src={logo} alt={`Logo ${index+1}`} className="w-[60px] h-[60px] lg:w-[auto] lg:h-[auto] rounded-[10px]"/>
            </LazyLoad>
          ))}
        </div>
        </>}
      </section>

      <section className="huupe-specs px-8 lg:pl-0 lg:pr-0 pt-4 lg:pt-6 pb-8">
        <div className="flex flex-wrap lg:flex-nowrap">
          <div className="w-full lg:w-6/12 pr-0 lg:pr-12 lg:pl-12 2xl:pl-24">
            <h2 className="text-heading mb-10 font-black"><img className="-ml-[10px] h-[40px] 2xl:h-[65px] inline-block" src={huupeNewLogo} />mini SPECS</h2>
            <div className="spec-detail">
              <h3 className="mb-[5px] lg:mb-3">Physical Dimension</h3>
              <table className="hidden lg:table">
                <tbody>
                  {hardware.map((item, index) => (
                    <tr key={index}>
                      <td>{item.title}</td>
                      <td>{item.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="block lg:hidden accordion-wrapper">
                {hardware.map(({title, content}, index) => (
                  <AccordionItem title={title} content={content} key={index} />
                ))}
              </div>
            </div>

            <div className="spec-detail">
              <h3 className="mb-[5px] lg:mb-3 mt-[25px] lg:mt-5">TV</h3>
              <table className="hidden lg:table">
                <tbody>
                  {tvspecs.map((item, index) => (
                    <tr key={index}>
                      <td>{item.title}</td>
                      <td>{item.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="block lg:hidden accordion-wrapper">
                {tvspecs.map(({title, content}, index) => (
                  <AccordionItem title={title} content={content} key={index} />
                ))}
              </div>
            </div>

            <div className="spec-detail">
              <h3 className="mb-[5px] lg:mb-3 mt-[25px] lg:mt-5">Installation</h3>
              <table className="hidden lg:table">
                <tbody>
                  {powerContent.map((item, index) => (
                    <tr key={index}>
                      <td>{item.title}</td>
                      <td>{item.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="block lg:hidden accordion-wrapper">
                {powerContent.map(({title, content}, index) => (
                  <AccordionItem title={title} content={content} key={index} />
                ))}
              </div>
            </div>

            <div className="spec-detail">
              <h3 className="mb-[5px] lg:mb-3 mt-[25px] lg:mt-5">Mechanical</h3>
              <table className="hidden lg:table">
                <tbody>
                  {mechanical.map((item, index) => (
                    <tr key={index}>
                      <td>{item.title}</td>
                      <td>{item.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="block lg:hidden accordion-wrapper">
                {mechanical.map(({title, content}, index) => (
                  <AccordionItem title={title} content={content} key={index} />
                ))}
              </div>
            </div>

            <div className="spec-detail">
              <h3 className="mb-[5px] lg:mb-3 mt-[25px] lg:mt-5">Shot Tracking</h3>
              <table className="hidden lg:table">
                <tbody>
                  {shotTrackingSpecs.map((item, index) => (
                    <tr key={index}>
                      <td>{item.title}</td>
                      <td>{item.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="block lg:hidden accordion-wrapper">
                {shotTrackingSpecs.map(({title, content}, index) => (
                  <AccordionItem title={title} content={content} key={index} />
                ))}
              </div>
            </div>

            <div className="spec-detail">
              <h3 className="mb-[5px] lg:mb-3 mt-[25px] lg:mt-5">Audio</h3>
              <table className="hidden lg:table">
                <tbody>
                  {audioSpecs.map((item, index) => (
                    <tr key={index}>
                      <td>{item.title}</td>
                      <td>{item.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="block lg:hidden accordion-wrapper">
                {audioSpecs.map(({title, content}, index) => (
                  <AccordionItem title={title} content={content} key={index} />
                ))}
              </div>
            </div>

          </div>
          <div className="w-full lg:w-6/12 hidden lg:block">
            <img src={huupeSpecs} className="object-cover h-full w-full" />
          </div>
        </div>
      </section>
    </>
  );
}


function AccordionItem({title, content}: {title: string; content: string}) {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className="accordion-item">
        <div
          className="accordion-title flex justify-between"
          onClick={() => setIsActive(!isActive)}
        >
          <div>{title}</div>
          <div>{isActive ? '-' : '+'}</div>
        </div>
        {isActive && <div className="accordion-content">{content}</div>}
      </div>
    </>
  );
}

const COLLECTION_CONTENT_FRAGMENT = `#graphql
  fragment CollectionContent on Collection {
    id
    handle
    title
    descriptionHtml
    heading: metafield(namespace: "hero", key: "title") {
      value
    }
    byline: metafield(namespace: "hero", key: "byline") {
      value
    }
    cta: metafield(namespace: "hero", key: "cta") {
      value
    }
    spread: metafield(namespace: "hero", key: "spread") {
      reference {
        ...Media
      }
    }
    spreadSecondary: metafield(namespace: "hero", key: "spread_secondary") {
      reference {
        ...Media
      }
    }
  }
  ${MEDIA_FRAGMENT}
` as const;

const HOMEPAGE_SEO_QUERY = `#graphql
  query seoCollectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    hero: collection(handle: $handle) {
      ...CollectionContent
    }
    shop {
      name
      description
    }
  }
  ${COLLECTION_CONTENT_FRAGMENT}
` as const;


// @see: https://shopify.dev/api/storefront/2023-07/queries/products
export const HOMEPAGE_FEATURED_PRODUCTS_QUERY = `#graphql
  query homepageFeaturedProducts($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 8) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;