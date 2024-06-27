import {json,defer, type LoaderArgs} from '@shopify/remix-oxygen';
import React, {Suspense, useRef, useState, useEffect, useCallback, type SyntheticEvent} from 'react';
import {Await, useLoaderData} from '@remix-run/react';
import {AnalyticsPageType} from '@shopify/hydrogen';

import {
  Modal,
  Link,
} from '~/components';
import CustomSlideshow from '../components/CustomSlideshow';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {getHeroPlaceholder} from '~/lib/placeholders';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import LazyLoad from 'react-lazy-load';

import slider1 from '../images/slider1.webp';

import trackData from '../images/trackData.webp';
import nbalevel from '../images/nbalevel.webp';
import liveCoaching from '../images/liveCoaching.webp';
import groupTournaments from '../images/groupTournaments.webp';
import homepagebanner from '../images/howitworks/howItWorksBanner.webp';

import epicMobile from '../images/epicMobile.webp';

// VIdeos
import trackDataVideo from '../videos/trackData.webm';
import nbaLevelVideo from '../videos/nbaLevel.mp4';
import liveCoachingVideo from '../videos/liveCoachingVideo.mp4';

// Testimonial Videos
import jahzere from '../videos/testimonials/jahzere.webm';
import john from '../videos/testimonials/john.webm';
import matteo from '../videos/testimonials/matteo.webm';
import aauteam from '../videos/testimonials/aauteam.webm';

// Testimonial Images
import elenetsineke from '../images/customers/elenetsineke.webp';
import amymoore from '../images/customers/amymoore.webp';
import ejanosike from '../images/customers/ejanosike.webp';
import jahzereImg from '../images/customers/jahzere.webp';

import easyToUseApp from '../images/howitworks/easyToUseApp.webp';
import easyToUseAppCP from '../images/howitworks/easyToUseAppCP.webp';
import easyToUseAppCPMobile from '../images/howitworks/easyToUseAppCPMobile.webp';

import huupeSpecs from '../images/howitworks/huupeSpecs.webp';
import statsBG from '../images/statsBGNEW.webp';

import drakeImage from '../images/drake.webp';
import drake from '../videos/drake.mp4';


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
import huupeLogo from '../images/huupeLogo.webp';




// trainers
import alison_zingale from '../images/ourtrainer/trainers/alison_zingale.webp';
import dennis_clifford from '../images/ourtrainer/trainers/dennis_clifford.webp';
import drew_jacobs from '../images/ourtrainer/trainers/drew_jacobs.webp';
import fadeaway_fitness from '../images/ourtrainer/trainers/fadeaway_fitness.webp';
import isaiah_johnson from '../images/ourtrainer/trainers/isaiah_johnson.webp';
import jamie_schneck from '../images/ourtrainer/trainers/jamie_schneck.webp';
import jlaw from '../images/ourtrainer/trainers/jlaw.webp';
import joe_sherburne from '../images/ourtrainer/trainers/joe_sherburne.webp';
import lonnie_jackson from '../images/ourtrainer/trainers/lonnie_jackson.webp';
import mariana_bautista from '../images/ourtrainer/trainers/mariana_bautista.webp';
import Micah_Lancaster from '../images/ourtrainer/trainers/Micah-Lancaster.webp';
import nate_wickstrom from '../images/ourtrainer/trainers/nate_wickstrom.webp';


import huupeNewLogo from '../images/huupeMiniHeading.webp';


import zipState from 'zip-state';
import {installers} from '../data/installers';
import {usStates} from '../data/stateNames';
import InstallerCard from '../components/InstallerCard';

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

  const {page} = await context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: 'installation',
      language: context.storefront.i18n.language,
    },
  });

  const seo = seoPayload.home();

  return defer({
    page,
    seo,
    analytics: {
      pageType: 'installations'
    }
  });
}

export default function Installation() {
  // TODO: skeletons vs placeholders
  const skeletons = getHeroPlaceholder([{}, {}, {}]);

  const homeSlider = [
    {
      image: slider1,
      imageMobile: epicMobile,
      heading: 'EPIC',
      alt: 'the huupe with the screen on'
    },
  ];

  const [slideActive, setslideActive] = useState(0);
  const [slideActiveVideo, setSlideActiveVideo] =
    useState<string>(trackDataVideo);
  const [slideActiveImage, setSlideActiveImage] = useState<string>(trackData);
  const slideWithText = [
    {
      image: nbalevel,
      heading: 'Pro Workouts',
      description:
        '<p>The huupe basketball hoop makes this possible. These workouts turn casual play to NBA game level. You can get access to targeted workouts and drills from NBA skills trainers, youth trainers, and everything in between.</p>',
      url: '/products/the-huupe',
      video: nbaLevelVideo,
    },
    {
      image: trackData,
      heading: 'Track Your Stats',
      description:
        '<p>Data is how we measure improvement - so we built the huupe basketball hoop to keep track of everything you do on the court. Using state-of-the-art technology, the huupe tracks your shooting percentage, position on the court, speed, agility, release time, and more while giving you real time feedback. Then we analyze that data, give it back to you, and show you how you can improve. The huupe is the first ever smart basketball hoop that can use data to deliver insights for continuous improvement.</p>',
      url: '/products/the-huupe',
      video: trackDataVideo,
    },
    {
      image: liveCoaching,
      heading: 'World Class Coaching',
      description:
        '<p>Book a live session with certified trainers that work with your schedule. Learn the fundamentals, get taken through pro workouts and take your game to the next level. These training sessions are geared towards propelling your basketball skills forward. Live sessions work on your time and at your pace so you can get truly tailored advice.</p>',
      url: '/products/the-huupe',
      video: liveCoachingVideo,
    },
    {
      image: groupTournaments,
      heading: 'Worldwide Competitions',
      description:
        "<p>Get ready to break a sweat with your family and friends in a friendly group basketball competition using the huupe. Keeping track of scores and stats with the huupe is easy so you don't have to worry about it while you show off your skills.</p><p> The huupe allows you to create your own tournament. Invite your family and friends to see who the best shooter REALLY is.</p>",
      url: '/products/the-huupe',
      video: ''
    },
  ];


  const [activeTestimonial, setActiveTestimonial] = useState<string>(jahzere);
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
    setActiveTestimonial('');
  };

  const testimonials = [
    {
      video: jahzere,
      img: elenetsineke,
      rating: 5,
      name: 'Elene Tsineke',
      message:
        'It does everything...I’m definitely going to need to use that in the future',
      altText: 'A young girl dribbling the ball',
    },
    {
      video: john,
      img: amymoore,
      rating: 5,
      name: 'Amy Moore',
      message:
        'Man I love this huupe',
      altText: 'A beautiful women in white shirt.',
    },
    {
      video: matteo,
      img: ejanosike,
      rating: 5,
      name: 'EJ Anosike',
      message:
        'I promise you. I’ll be in front of this thing all day',
      altText: 'A man smiling',
    },
    {
      video: jahzere,
      img: jahzereImg,
      rating: 5,
      name: 'John Doe',
      message:
        'You can be watching a move, and learning a new move at the same time',
      altText:
        'a group of young men in basketball uniforms posing for a picture',
    }
  ];



  const stats = [
    {
        bigtext: '60"',
        title: 'Backboard Size'
    },
    {
        bigtext: 'FHD',
        title: 'Screen Resolution'
    },
    {
        bigtext: "7.5'-10'",
        title: 'Adjustable Height'
    },
    {
        bigtext: '60',
        title: 'FPS'
    },
  ];


  const hardware = [
    {
      title: 'SERIES 1',
      content: 'Ideal for homes, outdoor courts and boutique gyms',
    },
    {
      title: 'TYPE',
      content: 'In-ground or wall mount',
    },
    {
      title: 'BACKBOARD SIZE',
      content: '60" x 42"',
    },
    {
      title: 'POLE SIZE',
      content: '6" x 6"',
    },
    {
      title: 'OVERHANG',
      content: "3' at 10' height, 4' at 7.5' height",
    },
    {
      title: '3-POINT STATIONARY WALL MOUNT (Indoor only)',
      content:
        "2' to '3 extension, 3' to '4 extension, 4' to '6 extension, 6' to '9 extension, 9' to '12 extension",
    },
    {
      title: 'AUDIO',
      content: '30W Stereo speakers',
    },
  ];

  const wireless = [
    {
      title: 'WI-FI',
      content: 'WiFi 6E (2.4GHz, 5GHz)',
    },
    {
      title: 'BLUETOOTH',
      content: 'BLUETOOTH 5.2 BR/EDR/LE',
    },
    {
      title: 'BLUETOOTH AUDIO SUPPORT',
      content: 'Yes',
    },
  ];

  const powerContent = [
    {
      title: 'AC INPUT',
      content: '100VAC - 240VAC, 50Hz/60Hz',
    },
    {
      title: 'MAX POWER CONSUMPTION',
      content: '600W',
    },
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
    paramountIcon,
    huupeLogo
  ];
  
  const trainers = [
    {
      image: jlaw,
      imgAlt: 'A male trainer holding a basketball',
      name: 'Jordan Lawley',
      skills: 'NBA level shooting, footwork, and overall detail',
      collegiate: 'UC San Deigo',
      professional: 'Mexico and New Zealand',
      experience:
        'Trained NBA legends like Zach LaVine, Klay Thompson, CJ McCollum, Carmelo Anthony, Julius Randle, Josh Giddey, Alex Caruso, and dozens more.',
      founder: '',
    },
    {
      image: Micah_Lancaster,
      imgAlt: 'A male trainer dribbling the basketball',
      name: 'Micah Lancaster',
      skills: 'NBA level ball handling, finishing and skill development',
      collegiate: '',
      professional: '',
      experience:
        "Founder of I'm Possible Training. Has trained over 50,000 students, 10,000 collegiate basketball athletes, and 100+ NBA players.",
      founder: '',
    },
    {
      image: fadeaway_fitness,
      imgAlt: 'A male trainer crouching with a basketball',
      name: 'Fadeaway Fitness',
      skills: 'NBA level ball handling, shooting and balance.',
      collegiate: '',
      professional: '',
      experience:
        'Professional playing experiences in Mexico, Italy, Canada, Dallas, Erie, Lynchburg, Buffalo, and Indianapolis.',
      founder: '',
    },
    {
      image: dennis_clifford,
      imgAlt: 'A male basketball player dunking the basketball',
      name: 'Dennis Clifford',
      skills: 'Footwork, Post Moves, Big Man Finishes',
      collegiate: 'Boston College',
      professional:
        'Santa Cruz Warriors, Alba Berlin, Igokea, Delaware Blue Coats, Rasta Vechta',
      experience: '',
      founder: '',
    },
    {
      image: mariana_bautista,
      imgAlt: 'A female trainer holding a basketball',
      name: 'Mariana Bautista',
      skills: 'Ball Handling, Passing, Strength, Conditioning, Body Control',
      collegiate: 'Cleveland State University',
      professional: '',
      experience: '',
      founder: 'Grind Girl Fitness',
    },
    {
      image: nate_wickstrom,
      imgAlt: 'A male trainer holding a basketball looking away from camera',
      name: 'Nate Wickstrom',
      skills: 'Shooting, Ball Handling, Shot Creation',
      collegiate: 'University of Wisconsin Stout',
      professional: '',
      experience: '',
      founder: 'EL1TE Performance (NBA Training Academy)',
    },
    {
      image: lonnie_jackson,
      imgAlt: 'A male basketball player shooting the basketball',
      name: 'Lonnie Jackson',
      skills: 'Shooting, Muscle Memory, IQ',
      collegiate: 'Boston College & Boise State',
      professional: '',
      experience: '',
      founder: '',
    },
    {
      image: joe_sherburne,
      imgAlt: 'A male trainer dribbling the basketball',
      name: 'Joe Sherburne',
      skills: 'Shooting, Scoring, Finishing',
      collegiate: 'University of Maryland, Baltimore',
      professional: '',
      experience: '',
      founder: '',
    },
    {
      image: isaiah_johnson,
      imgAlt: 'A male basketball player tipping the ball',
      name: 'Isaiah Johnson',
      skills: 'Shooting, Ball Handling, Defense, Finishing at the Rim',
      collegiate: 'University of Northern Michigan',
      professional: 'Ponte Prizreni, Kosovo',
      experience: '',
      founder: '',
    },
    {
      image: jamie_schneck,
      imgAlt: 'A male basketball player scoring over opponent',
      name: 'Jamie Schneck',
      skills: 'Footwork, Big Guard Skills, Post Moves, Finishes',
      collegiate: 'University of Hartford',
      professional: '',
      experience: '',
      founder: '',
    },
    {
      image: drew_jacobs,
      imgAlt: 'A male basketball player passing the basketball',
      name: 'Drew Jacobs',
      skills: 'Point Guard Coach, Ball Handling, Shooting',
      collegiate: 'Boston College',
      professional: '',
      experience: '',
      founder: 'Head & Heart Hoops',
    },
    {
      image: alison_zingale,
      imgAlt: 'A young female trainer holding a basketball',
      name: 'Allison Zingale',
      skills: 'Stretching, Yoga, Mindfulness, Rehabilitation',
      collegiate: '',
      professional: '',
      experience: 'Certified Yoga Instructor and PT',
      founder: '',
    },
  ];

  const [activeTrainer, setActiveTrainer] = useState(trainers[0]);

  const nextTrainer = () => {
    if (slideActive < trainers.length - 1) {
      setslideActive(slideActive + 1);
      setActiveTrainer(trainers[slideActive + 1]);
    } else {
      setslideActive(0);
      setActiveTrainer(trainers[0]);
    }
  };

  const prevTrainer = () => {
    if (slideActive === 0) {
      setslideActive(trainers.length);
      setActiveTrainer(trainers[trainers.length - 1]);
    } else {
      setslideActive(slideActive - 1);
      setActiveTrainer(trainers[slideActive - 1]);
    }
  };




  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  // may be new state to handle mobile image selection
  const [selectedImageId, setSelectedId] = useState<number>(0);
  const runTimer = useCallback(() => {
    timer.current = setTimeout(() => {
      if (selectedImageId === testimonials.length - 1) {
        setSelectedId(0);
      } else {
        setSelectedId((prev) => prev + 1);
      }
    }, 7000);
  }, [testimonials.length, selectedImageId]);

  const setIndex = (index: number) => {
    clearTimeout(timer.current);
    setSelectedId(index);
    runTimer();
  };

  useEffect(() => {
    runTimer();
    return () => clearTimeout(timer.current);
  }, [runTimer]);


  const [validZip, setValidZip] = useState(true);
  const [zipcode, setZipcode] = useState<string>('');
  const [state, setState] = useState<string | undefined>();
  const [installerList, setInstallerList] = useState<Installer[] | undefined>();

  function onZipChange(zip: string) {
    setValidZip(true);
    setZipcode(zip);
  }

  function validateUSZip(zip: string) {
    return /^\d{5}(-\d{4})?$/.test(zip);
  }


  function handleZipSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const hasZip = validateUSZip(zipcode);
    if (hasZip) {
      setValidZip(true);
      const region = zipState(zipcode);
      const selectedState = usStates.find(
        (state) => state.abbreviation === region,
      );
      setState(selectedState?.name);

      const tempInstallerList: Installer[] = [];
      installers.forEach((installer) => {
        if (installer.state === region) {
          tempInstallerList.push(installer);
        } else if (selectedState?.abbreviation === 'DC') {
          if (installer.state === 'MD' || installer.state === 'VA')
            tempInstallerList.push(installer);
        }
      });

      if (tempInstallerList) {
        const uniqueInstallers = [
          ...new Map(tempInstallerList.map((m) => [m.name, m])).values(),
        ];
        setInstallerList(uniqueInstallers);
      } else {
        setInstallerList(undefined);
      }
    } else {
      setValidZip(false);
    }
    setZipcode('');
  }

  return (
    <>
      {modalOpen ? (
        <Modal cancelLink={''} close={closeModal}>
          <video
            key={activeTestimonial}
            width="100%"
            height="100%"
            autoPlay
            controls
          >
            <source src={activeTestimonial} type="video/mp4" />
            <source src={activeTestimonial} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </Modal>
      ) : (
        <></>
      )}

      <section className="homepage-banner px-6 lg:px-24 mb-12 lg:pt-[146px]">
        <div className="relative">
          <img src={homepagebanner} />
          
          <div className="absolute top-0 left-0 w-full h-full flex flex-col text-center items-center justify-end pb-[250px]">
            <h1 className="mb-3 !text-[#000] font-black max-w-[1082px] mx-auto w-full block">THE WORLD'S FIRST SMART BASKETBALL HOOP</h1>
            <Link
              key="/products/the-huupe"
              to="/products/the-huupe"
              target="_self"
              prefetch="intent"
              className="main-button"
            >
              Reserve Now
            </Link>
          </div>
        </div>
      </section>


      <section className="px-0 lg:px-24 mb-12 lg:mb-0">
        <div className="hidden lg:flex flex-wrap -mx-[5px]">
          {slideWithText.map((slide,index) => (
            <div className="w-full lg:w-3/12 loop-item px-[5px] cursor-pointer" key={index} onClick={() => {
              setActiveTestimonial(slide.video);
              setModalOpen(true);
            }}>
              <div className="relative rounded-[20px] h-full overflow-hidden min-h-[400px] lg:h-[80vh] max-h-[940px]">
                <img className="object-cover h-full w-full" src={slide.image} alt={slide.heading + ' ' + index} />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#00000000] to-[#00000099]"></div>
                <div className={`absolute bottom-0 left-0 w-full text-center py-[30px] px-[${index == 0 ? '40px' : ( index == 1 ? '30px' : '5px' )}] z-20`}>
                  <h3 className="text-[#fff] text-[48px] font-black leading-[58px]">{slide.heading}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="block lg:hidden">
          <CustomSlideshow centerMode={false} autoPlay={false}>
            {slideWithText.map((slide,index) => (
              <div className="w-full lg:w-3/12 loop-item px-[5px]" key={index} onClick={() => {
                setActiveTestimonial(slide.video);
                setModalOpen(true);
              }}>
                <div className="relative rounded-[20px] overflow-hidden min-h-[400px] h-[80vh] max-h-[940px]">
                  <img className="object-cover h-full w-full" src={slide.image} alt={slide.heading + ' ' + index} />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#00000000] to-[#00000099]"></div>
                  <div className={`absolute bottom-0 left-0 w-full text-center py-[30px] px-[${index == 0 ? '40px' : ( index == 1 ? '30px' : '5px' )}] z-20`}>
                    <h3 className="text-[#fff] text-[48px] font-black leading-[58px]">{slide.heading}</h3>
                  </div>
                </div>
              </div>
            ))}
          </CustomSlideshow>
        </div>
      </section>

      <section className="homepage-slider px-6 lg:px-24 mb-12">
        <div className="homepage-slider-wrapper">
          {homeSlider.map((slider, index) => (
            <div className="homepage-slider-item relative" key={index}>
              <img
                alt={slider.alt}
                src={slider.image}
                className={`${
                  slider.imageMobile !== '' ? 'hidden md:block' : ''
                } w-full object-cover`}
              />
              {slider.imageMobile !== '' ? (
                <img
                  alt={slider.alt}
                  src={slider.imageMobile}
                  className="md:hidden w-full object-cover"
                />
              ) : (
                <></>
              )}
              <h2>{slider.heading}</h2>
            </div>
          ))}
        </div>
      </section>

      <section className="text-image howitworks-text-image-2 px-0 lg:px-24 pb-12 lg:pb-16">
        <div className="flex gap-4 flex-wrap lg:flex-nowrap">
          <div className="w-full lg:w-7/12 pr-4 hidden lg:block">
            <img
              src={easyToUseApp}
              className="h-full w-full object-cover object-left image-bordered"
            />
          </div>
          <div className="w-full block lg:hidden mobile-easytouse text-center">
            <img
              src={easyToUseAppCPMobile}
              alt="A screen of the huupe application"
              className="inline-block lg:hidden image-bordered"
            />
          </div>
          <div className="w-full lg:w-5/12 lg:pl-[40px] px-6 lg:pr-0 pt-8 lg:pt-0">
            <img
              src={easyToUseAppCP}
              className="mb-[15px] hidden lg:block object-cover object-top h-auto max-h-[311px] w-full max-w-[350px] me-auto"
            />
            <h2 className="text-heading mb-2">EASY TO USE MOBILE APP</h2>
            <p className="text-[19px] lg:text-[25px]">
            Stream our mobile app right to the huupe and play.
            </p>
            <Link
              key="/products/the-huupe"
              to="/products/the-huupe"
              target="_self"
              prefetch="intent"
              className="main-button mt-3"
            >
              Reserve Now
            </Link>
          </div>
        </div>
      </section>


      <section className="stats-section px-6 lg:px-24 pb-24">
        <div className="stats-wrapper relative">
            <img src={statsBG} />
            <div className="stats-details absolute top-0 right-0 pr-36 pt-10">
                {stats.map((stat, index) => (
                <div className="text-center py-[10px] relative" key={index}>
                    <h2>{stat.bigtext}</h2>
                    <p>{stat.title}</p>
                </div>
                ))}
            </div>
        </div>
      </section>

      <section className="huupe-specs huupe-specs-pro px-6 lg:pl-24 lg:pr-0 pt-4 lg:pt-6 pb-8 lg:pb-12">
        <div className="flex flex-wrap lg:flex-nowrap">
          <div className="w-full lg:w-5/12 pr-0 lg:pr-24">
          <h2 className="text-heading mb-10 font-black"><img className="-ml-[10px] h-[40px] lg:h-[65px] inline-block" src={huupeNewLogo} />PRO SPECS</h2>
            <div className="spec-detail">
              <h3 className="mb-[5px] lg:mb-3">HARDWARE</h3>
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
              <h3 className="mb-[5px] lg:mb-3 mt-[25px] lg:mt-5">WIRELESS</h3>
              <table className="hidden lg:table">
                <tbody>
                  {wireless.map((item, index) => (
                    <tr key={index}>
                      <td>{item.title}</td>
                      <td>{item.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="block lg:hidden accordion-wrapper">
                {wireless.map(({title, content}, index) => (
                  <AccordionItem title={title} content={content} key={index} />
                ))}
              </div>
            </div>

            <div className="spec-detail">
              <h3 className="mb-[5px] lg:mb-3 mt-[25px] lg:mt-5">POWER</h3>
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
              <h3 className="mb-[5px] lg:mb-3 mt-[25px] lg:mt-5">INSTALLATION</h3>
              <p>
                The huupe is installed by our professional installers. In
                addition to delivering and installing the huupe in your home or
                driveway, our delivery partners will connect the huupe to WiFi,
                pair your Bluetooth and get your account set up so you can start
                training right away.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-7/12 hidden lg:block">
            <img src={huupeSpecs} className="object-cover h-full w-full" />
          </div>
        </div>
      </section>


      <section className="text-image howitworks-text-image px-6 lg:px-24 mb-0 pb-12">
        <div className="flex flex-wrap items-stretch lg:flex-nowrap gap-4">
        <div className="w-full lg:w-6/12 mt-6 lg:mt-0">
            {/* <img src={stream} /> */}
            <LazyLoad className="h-full">
              <video
                key={drake}
                height="100%"
                autoPlay
                loop
                muted
                playsInline
                poster={drakeImage}
                className="w-full h-full rounded-[20px] object-cover"
              >
                <source src={drake} type="video/mp4" />
                <source src={drake} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </LazyLoad>
          </div>
          <div className="w-full lg:w-6/12 pl-0 lg:pl-[25px]">
            <div className="max-w-[387px]">
                <h2 className="text-[68px] leading-[100%] font-black mb-4">STREAM ANYTHING</h2>
                <p>
                The huupe enables you to play whilst watching YouTube and more.
                Fancy listening to Drake whilst dunking, no problem!
                </p>
            </div>
            {smartTVApps.length > 0 ? 
                <div className="flex flex-wrap justify-start pt-[20px] pb-[25px] gap-x-[15px] gap-y-[30px]">
                    {smartTVApps.map((logo,index,elements) => (
                        <LazyLoad key={index} >
                        <img src={logo} alt={`Logo ${index+1}`} className="w-[60px] h-[60px] lg:w-[124px] lg:h-[124px] rounded-[10px]"/>
                        </LazyLoad>
                    ))}
                </div>
            : null}
          </div>
          
        </div>
      </section>


      <section className="the-trainer px-6 lg:px-24 relative mb-12 lg:mb-24">
        <div className="the-trainer-background content-none absolute top-1/2 lg:top-0 left-[-20%] md:left-1/3 w-[793px] lg:w-[1568px] h-[793px] lg:h-[1568px]" />
        <h3 className="text-[48px] leading-[100%] text-[#000] font-black lg:uppercase mb-0">Our Trainers</h3>
        <div className="flex relative items-center z-10 flex-wrap">
          <div className="w-full lg:w-5/12 basis-full lg:basis-5/12 pt-0 lg:pt-8 pb-8 lg:pb-24">
            <h2 className="text-[#000] mb-6 uppercase text-[72px] font-black font-[Montserrat] leading-[105%] max-w-[400px]">{activeTrainer.name}</h2>
            <ul className="text-[#000]">
              {activeTrainer.skills ? (
                <li>
                  <b>Skills:</b> {activeTrainer.skills}
                </li>
              ) : (
                <></>
              )}
              {activeTrainer.collegiate ? (
                <li>
                  <b>Collegiate Basketball:</b> {activeTrainer.collegiate}
                </li>
              ) : (
                <></>
              )}
              {activeTrainer.professional ? (
                <li>
                  <b>Professional:</b> {activeTrainer.professional}
                </li>
              ) : (
                <></>
              )}
              {activeTrainer.experience ? (
                <li>
                  <b>Experience:</b> {activeTrainer.experience}
                </li>
              ) : (
                <></>
              )}
              {activeTrainer.founder ? (
                <li>
                  <b>Founder:</b> {activeTrainer.founder}
                </li>
              ) : (
                <></>
              )}
            </ul>
          </div>
          <div className="w-full lg:w-7/12 basis-full lg:basis-7/12 relative">
            
            <img width="456" height="539" src={activeTrainer.image} alt={activeTrainer.imgAlt} className="h-[400px] md:h-[600px] lg:h-[888px] w-auto" />
            
          </div>
        </div> 
        <div className="relative w-full">
            <div className="slider-dots mb-8 absolute right-0 bottom-[45px] w-full justify-center hidden lg:flex z-10">
              {trainers.map((trainer, index) => (
                <div
                  className={`${
                    slideActive == index ? 'active' : ''
                  } slider-dots-item`}
                  key={index}
                  onClick={() => {
                    setslideActive(index);
                    setActiveTrainer(trainer);
                  }}
                ></div>
              ))}
            </div>
            <span
              className="activeTrainerNext absolute bottom-[30px] left-0 block p-4 cursor-pointer z-20"
              onClick={() => prevTrainer()}
            >
              <svg width="87" height="88" viewBox="0 0 87 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M43.4981 30.6377L30.2879 43.9998L43.4981 57.3618L47.2834 53.5331L40.577 46.7497L57.0918 46.7497L57.0918 41.2499L40.577 41.2499L47.2834 34.4664L43.4981 30.6377ZM43.4921 9.16652C48.2551 9.16652 52.7321 10.0807 56.9231 11.9092C61.1141 13.7376 64.7597 16.219 67.8599 19.3534C70.9601 22.4879 73.4144 26.1738 75.2229 30.4111C77.0313 34.6484 77.9356 39.1759 77.9355 43.9936C77.9355 48.8114 77.0317 53.3398 75.224 57.579C73.4164 61.8182 70.9632 65.5057 67.8644 68.6415C64.7656 71.7774 61.1216 74.2599 56.9324 76.0891C52.7433 77.9184 48.2672 78.833 43.5042 78.833C38.7412 78.833 34.2642 77.9188 30.0732 76.0903C25.8822 74.2619 22.2366 71.7805 19.1364 68.6461C16.0362 65.5116 13.5818 61.8257 11.7734 57.5884C9.96495 53.3512 9.06072 48.8237 9.06072 44.0059C9.06072 39.1881 9.96456 34.6597 11.7722 30.4205C13.5799 26.1813 16.0331 22.4938 19.1319 19.358C22.2307 16.2222 25.8747 13.7396 30.0639 11.9104C34.253 10.0811 38.7291 9.16652 43.4921 9.16652Z" fill="black"/>
              </svg>
            </span>
            <span
              className="activeTrainerNext absolute bottom-[30px] right-0 block p-4 cursor-pointer z-20"
              onClick={() => nextTrainer()}
            >
              <svg width="87" height="88" viewBox="0 0 87 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M43.5019 57.3623L56.7121 44.0002L43.5019 30.6382L39.7166 34.4669L46.423 41.2503H29.9082V46.7501H46.423L39.7166 53.5336L43.5019 57.3623ZM43.5079 78.8335C38.7449 78.8335 34.2679 77.9193 30.0769 76.0908C25.8859 74.2624 22.2403 71.781 19.1401 68.6466C16.0399 65.5121 13.5856 61.8262 11.7771 57.5889C9.96868 53.3516 9.06445 48.8241 9.06445 44.0064C9.06445 39.1886 9.96829 34.6602 11.776 30.421C13.5836 26.1818 16.0368 22.4943 19.1356 19.3585C22.2344 16.2226 25.8784 13.7401 30.0676 11.9109C34.2567 10.0816 38.7328 9.16699 43.4958 9.16699C48.2588 9.16699 52.7358 10.0812 56.9268 11.9097C61.1178 13.7381 64.7634 16.2195 67.8636 19.3539C70.9638 22.4884 73.4181 26.1742 75.2266 30.4116C77.035 34.6488 77.9393 39.1763 77.9393 43.9941C77.9393 48.8119 77.0354 53.3403 75.2278 57.5795C73.4201 61.8187 70.9669 65.5062 67.8681 68.642C64.7693 71.7778 61.1253 74.2604 56.9361 76.0896C52.747 77.9189 48.2709 78.8335 43.5079 78.8335Z" fill="black"/>
              </svg>
            </span>
          </div>
      </section>


      <section className="px-6 lg:px-24 bg-[#fff] mb-12">
        <h2 className="text-[48px] font-black leading-[100%] mb-[40px]">OUR CUSTOMERS</h2>
        <CustomSlideshow className="-mx-[7px] has-slick-arrows" centerMode={false} autoPlay={false} numberSlides={3}>
          {testimonials.map((testimony, index) => (
            <div className="customer-item px-[7px]" key={index}>
              <div className="relative rounded-[20px] overflow-hidden">
                <img src={testimony.img} alt={testimony.altText} className="h-[826px] w-[auto] object-cover"/>

                <div className="h-[210px] absolute bottom-0 left-0 w-full p-[30px] bg-[#000000B2]">
                  <p className="font-bold uppercase mb-[10px] text-[#fff] lg:text-[24px]">{testimony.name}</p>
                  <p className="lg:text-[24px] text-[#fff]">"{testimony.message}"</p>
                </div>
              </div>
            </div>
          ))}
        </CustomSlideshow>
      </section>

      <section className="px-6 lg:px-24 bg-[#ffffff] mb-12">
        <h2 className="text-[48px] font-black leading-[100%] mb-[50px]">WE DO THE HEAVY LIFTING</h2>
        <div className="relative flex gap-[30px] flex-col lg:flex-row">
            <div className="relative w-full lg:w-6/12">
              <LazyLoad>
                <div className="relative pb-[56.3%]">
                  <iframe
                    className="h-full w-full absolute top-0 left-0 rounded-[20px] lg:rounded[10px]"
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/ozVW3sZ96J0?controls=1&mute=1&autoplay=0`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </LazyLoad>
            </div>
            <div className="relative w-full lg:w-6/12">
              <LazyLoad>
                <div className="relative pb-[56.3%]">
                  <iframe
                    className="h-full w-full absolute top-0 left-0 rounded-[20px] lg:rounded[10px]"
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/mm3Db3LMcdI?controls=1&mute=1&autoplay=0`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </LazyLoad>
            </div>
        </div>
      </section>

      <section className="px-6 lg:pt-[30px] lg:px-24 bg-[#ffffff] flex flex-col lg:flex-row mb-12">
        <div className="flex flex-col w-full lg:w-5/12 lg:mr-[120px] justify-center">
          <h1 className="text-heading text-center uppercase lg:text-left !text-[40px] lg:!text-[48px]">
            Installers
          </h1>
          <p className="mt-[21px] lg:max-w-[372px]">
            Find potential installers near you by searching your zip code and
            booking an installation.
          </p>
          <form className="flex flex-row w-full max-w-[500px]" onSubmit={handleZipSubmit}>
            <input
              type="text"
              id="zip"
              name="zip"
              placeholder="zip"
              value={zipcode}
              required
              minLength={5}
              maxLength={5}
              size={10}
              onChange={(event) => onZipChange(event.target.value)}
              className="w-full border-[#D0D0D0] rounded-[10px] border-2"
            />
            <input
              type="submit"
              className="bg-black text-white py-4 px-6 border-black rounded-[10px] ml-[20px]"
              value="Find Installers"
            />
          </form>
          <div className="h-[46px] w-full mt-1">
            {!validZip && (
              <p className="text-red-600">Please enter a valid zip code</p>
            )}
          </div>
        </div>
        <div className="w-full lg:w-7/12 lg:mb-0 max-h-[500px] overflow-auto overflow-x-hidden">
          {state && (
            <h3 className="text-2lg lg:text-4lg mb-5 font-black">{state}</h3>
          )}
          {installerList &&
            installerList.map((installer, index) => (
              <InstallerCard installer={installer} key={installer.id} />
            ))}
          {state && installerList?.length === 0 && (
            <p>Sorry, we could not find an installer in your area.</p>
          )}
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