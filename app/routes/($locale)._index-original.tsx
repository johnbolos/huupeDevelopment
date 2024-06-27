import {defer, type LoaderArgs} from '@shopify/remix-oxygen';
import React, {Suspense, useState, useEffect} from 'react';
import {Await, useLoaderData} from '@remix-run/react';
import {AnalyticsPageType} from '@shopify/hydrogen';

import {
  ProductSwimlane,
  FeaturedCollections,
  Hero,
  Modal,
  SlideCarousel,
  Link,
} from '~/components';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {getHeroPlaceholder} from '~/lib/placeholders';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import LazyLoad from 'react-lazy-load';

import abc from '../images/abc.webp';
import hoh from '../images/hoh.webp';
import mensjournal from '../images/mens-journal.webp';
import themanual from '../images/the-manual.webp';
import weeklyus from '../images/weekly-us.webp';
import yahoo from '../images/yahoo.webp';
import youtube from '../images/youtube.webp';

import slider1 from '../images/slider1.webp';
import elevate from '../images/elevate.webp';
import elevateMobile from '../images/elevateMobile.webp';

import trackData from '../images/trackData.webp';
import nbalevel from '../images/nbalevel.webp';
import liveCoaching from '../images/liveCoaching.webp';
import groupTournaments from '../images/groupTournaments.webp';
import homepagebanner from '../images/homepagebanner.webp';
import ctabg from '../images/cta-bg.webp';
import ctaBGMobile from '../images/ctaBGMobile.webp';

import installGuide from '../images/installGuide.webp';
import deliveryInfo from '../images/deliveryInfo.webp';
import testimonyImage from '../images/testimonyImage.webp';

import epicMobile from '../images/epicMobile.webp';

// VIdeos
import homeBanner from '../videos/homeBanner.mp4';
import homeBannerMobile from '../videos/homeBannerMobile.mp4';
import trackDataVideo from '../videos/trackData.webm';
import nbaLevelVideo from '../videos/nbaLevel.mp4';
import liveCoachingVideo from '../videos/liveCoachingVideo.mp4';

// Testimonial Videos
import jahzere from '../videos/testimonials/jahzere.webm';
import john from '../videos/testimonials/john.webm';
import matteo from '../videos/testimonials/matteo.webm';
import aauteam from '../videos/testimonials/aauteam.webm';
import austin from '../videos/testimonials/austin.webm';
import dyson from '../videos/testimonials/dyson.webm';
import anosike from '../videos/testimonials/anosike.webm';
import tsineke from '../videos/testimonials/tsineke.webm';
import fafalu from '../videos/testimonials/fafalu.webm';
import jackson from '../videos/testimonials/jackson.webm';
import stefan from '../videos/testimonials/stefan.webm';
// Testimonial Images
import jahzereImg from '../images/testimonials/jahzere.webp';
import johnImg from '../images/testimonials/john.jpeg';
import matteoImg from '../images/testimonials/matteo.webp';
import aauteamImg from '../images/testimonials/aauteam.webp';
import austinImg from '../images/testimonials/austin.webp';
import dysonImg from '../images/testimonials/dyson.webp';
import anosikeImg from '../images/testimonials/anosike.webp';
import tsinekeImg from '../images/testimonials/tsineke.webp';
import fafaluImg from '../images/testimonials/fafalu.webp';
import jacksonImg from '../images/testimonials/jackson.webp';
import stefanImg from '../images/testimonials/stefan.webp';

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
          /**
           * Country and language properties are automatically injected
           * into all queries. Passing them is unnecessary unless you
           * want to override them from the following default:
           */
          country,
          language,
        },
      },
    ),
    secondaryHero: context.storefront.query(COLLECTION_HERO_QUERY, {
      variables: {
        handle: 'backcountry',
        country,
        language,
      },
    }),
    featuredCollections: context.storefront.query(FEATURED_COLLECTIONS_QUERY, {
      variables: {
        country,
        language,
      },
    }),
    tertiaryHero: context.storefront.query(COLLECTION_HERO_QUERY, {
      variables: {
        handle: 'winter-2022',
        country,
        language,
      },
    }),
    analytics: {
      pageType: AnalyticsPageType.home,
    },
    seo,
  });
}

export default function Homepage() {
  const {
    primaryHero,
    secondaryHero,
    tertiaryHero,
    featuredCollections,
    featuredProducts,
  } = useLoaderData<typeof loader>();

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

  const thelogos = [
    {
      image: abc,
      url: 'https://www.local10.com/news/local/2022/12/07/south-florida-entrepreneurs-create-smart-basketball-hoop/',
      altText: 'ABC News logo',
    },
    {
      image: hoh,
      url: 'https://www.youtube.com/watch?v=jaFTibH-kOY&ab_channel=HouseofHighlights',
      altText: 'house of highlights logo',
    },
    {
      image: mensjournal,
      url: 'https://www.mensjournal.com/entertainment/how-huupe-is-transforming-the-at-home-basketball-game-with-a-smart-basketball-hoop',
      altText: `Men's Journal logo`,
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
    {
      image: yahoo,
      url: 'https://www.yahoo.com/news/huupe-smart-basketball-hoop-startup-134306720.html',
      altText: 'Yahoo logo',
    },
    {
      image: youtube,
      url: 'https://www.youtube.com/embed/baiNSlsvl7w',
      altText: 'YouTube logo',
    },
  ];

  const [slideActive, setslideActive] = useState(0);
  const [slideActiveVideo, setSlideActiveVideo] =
    useState<string>(trackDataVideo);
  const [slideActiveImage, setSlideActiveImage] = useState<string>(trackData);
  const slideWithText = [
    {
      image: trackData,
      heading: 'track your data',
      description:
        '<p>Data is how we measure improvement - so we built the huupe basketball hoop to keep track of everything you do on the court. Using state-of-the-art technology, the huupe tracks your shooting percentage, position on the court, speed, agility, release time, and more while giving you real time feedback. Then we analyze that data, give it back to you, and show you how you can improve. The huupe is the first ever smart basketball hoop that can use data to deliver insights for continuous improvement.</p>',
      url: '/products/the-huupe',
      video: trackDataVideo,
    },
    {
      image: nbalevel,
      heading: 'nba level workouts',
      description:
        '<p>The huupe basketball hoop makes this possible. These workouts turn casual play to NBA game level. You can get access to targeted workouts and drills from NBA skills trainers, youth trainers, and everything in between.</p>',
      url: '/products/the-huupe',
      video: nbaLevelVideo,
    },
    {
      image: liveCoaching,
      heading: 'live coaching',
      description:
        '<p>Book a live session with certified trainers that work with your schedule. Learn the fundamentals, get taken through pro workouts and take your game to the next level. These training sessions are geared towards propelling your basketball skills forward. Live sessions work on your time and at your pace so you can get truly tailored advice.</p>',
      url: '/products/the-huupe',
      video: liveCoachingVideo,
    },
    {
      image: groupTournaments,
      heading: 'group tournaments',
      description:
        "<p>Get ready to break a sweat with your family and friends in a friendly group basketball competition using the huupe. Keeping track of scores and stats with the huupe is easy so you don't have to worry about it while you show off your skills.</p><p> The huupe allows you to create your own tournament. Invite your family and friends to see who the best shooter REALLY is.</p>",
      url: '/products/the-huupe',
    },
  ];

  const guideItems = [
    {
      image: installGuide,
      heading: 'INSTALL GUIDE',
      description: 'See what it takes to install your huupe.',
      url: '/pages/installation',
      alt: 'The installer putting in the rim',
    },
    {
      image: deliveryInfo,
      heading: 'DELIVERY INFO',
      description: 'See what to expect after you order your huupe.',
      url: '/pages/installation',
      alt: 'The back of a delivery truck',
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
      img: jahzereImg,
      rating: 5,
      title:
        'I think the huupe is dope. Something different. [I’m] always looking for different tools to get better, track my shots all types of stuff.',
      altText: 'A young man with dreadlocks smiling in a gym',
    },
    {
      video: john,
      img: johnImg,
      rating: 5,
      title:
        'It’s gonna help the next generation as they’re working on their game',
      altText: 'A man with dreadlocks standing in a gym smiling at the camera',
    },
    {
      video: matteo,
      img: matteoImg,
      rating: 5,
      title:
        'Every single person that has walked in there and used the huupe, have walked out and go ‘Damn, I would love one of these in my house',
      altText: 'Three men sitting on stools sitting in a boxing ring',
    },
    {
      video: aauteam,
      img: aauteamImg,
      rating: 5,
      title:
        'You can be watching a move, and learning a new move at the same time',
      altText:
        'a group of young men in basketball uniforms posing for a picture',
    },
    {
      video: austin,
      img: austinImg,
      rating: 5,
      title:
        'It felt like any other hoop. Outside. Inside. Just felt like a regular hoop',
      altText: 'A young man sitting in a boxing ring',
    },
  ];

  const testimonials2 = [
    {
      video: dyson,
      img: dysonImg,
      rating: 5,
      title: 'Man I love this huupe…',
      altText: 'A young man holding a basketball in a gym',
    },
    {
      video: anosike,
      img: anosikeImg,
      rating: 5,
      title: 'Great basketball tool for development',
      altText: 'A young man holding a basketball in front of a wall',
    },
    {
      video: tsineke,
      img: tsinekeImg,
      rating: 5,
      title:
        'It does everything… I’m definitely going to need to use that in the future',
      altText: 'A female basketball player smiling and pointing at the huupe',
    },
    {
      video: fafalu,
      img: fafaluImg,
      rating: 5,
      title:
        'It’s super cool! I’ve never seen anything like it. It makes basketball really fun!',
      altText: 'A young man smiling on a basketball court',
    },
    {
      video: jackson,
      img: jacksonImg,
      rating: 5,
      title:
        'This thing is the future for sure. I’m still kind of blown away by this… if you just have that workout there, you just follow moves, it tells you what to do. And it’s stable too!',
      altText: 'A young man smiling at a camera on a basketball court',
    },
    {
      video: stefan,
      img: stefanImg,
      rating: 5,
      title:
        'I liked it because it tracked how many shots I made and missed, and I like the games on the huupe',
      altText: 'A woman and young boy standing in front of a huupe',
    },
  ];

  const [homeBannerVideo, sethomeBannerVideo] = useState(homeBanner);

  function handleWindowSizeChange() {
    if (window.innerWidth < 768) {
      sethomeBannerVideo(homeBannerMobile);
    } else {
      sethomeBannerVideo(homeBanner);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

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

      <section className="homepage-banner px-6 lg:px-24 mb-12 lg:mb-36">
        <div className="relative">
          {/* <img src={homepagebanner} /> */}
          <LazyLoad>
            <video
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
            </video>
          </LazyLoad>
          <div className="absolute top-0 left-0 w-full h-full flex flex-col text-center items-center justify-center pt-20 md:px-8 lg:py-0">
            <h1 className="mb-2">THE WORLD'S FIRST SMART BASKETBALL HOOP</h1>
            <span>$4,995</span>
            <Link
              key="/products/the-huupe"
              to="/products/the-huupe"
              target="_self"
              prefetch="intent"
              className="main-button absolute bottom-24 left-1/2"
            >
              BUY
            </Link>
          </div>
        </div>
      </section>

      <section className="homepage-logo-showcase px-6 lg:px-24 mb-12 lg:mb-0">
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

      <section className="homepage-slider px-6 lg:px-24 mb-12 lg:mb-24">
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

      <section className="homepage-featured-product px-6 lg:px-24 mb-12 lg:mb-24">
        <div className="homepage-featured-product-wrapper">
          <div className="homepage-featured-product-item relative">
            <img
              src={elevate}
              className="hidden md:inline-block w-full object-cover"
              alt="Elevate your game"
            />
            <img
              src={elevateMobile}
              className="md:hidden w-full object-cover"
              alt="Elevate your game"
            />
            <h2 className="absolute xl:text-[230px] text-6xl">
              ELEVATE
              <br />
              YOUR
              <br />
              GAME
            </h2>
            <Link
              key="/products/the-huupe"
              to="/products/the-huupe"
              target="_self"
              prefetch="intent"
              className="main-button absolute"
            >
              BUY
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-24 mb-12 lg:mb-24 homepage-text-image-slider">
        <div className="homepage-text-image-slider-wrapper">
          {slideWithText.map((slider, index) => (
            <div
              className={`${slideActive == index ? 'block' : 'hidden'} ${
                index == 3 ? 'slideAutoWidth' : ''
              }`}
              key={index}
            >
              <div className="flex flex-col lg:flex-row homepage-text-image-slider-item items-center">
                <div className="w-full lg:w-2/5 p-0 lg:pr-16 xl:pr-36">
                  <div className="slider-dots flex mb-8">
                    {slideWithText.map((sliderDot, index2) => (
                      <div
                        className={`${
                          slideActive == index2 ? 'active' : ''
                        } slider-dots-item`}
                        key={index2}
                        onClick={() => {
                          setslideActive(index2);
                          setSlideActiveVideo(
                            sliderDot.video ? sliderDot.video : '',
                          );
                          setSlideActiveImage(sliderDot.image);
                        }}
                      ></div>
                    ))}
                  </div>
                  <h3 className="text-heading mb-4">{slider.heading}</h3>
                  <div
                    dangerouslySetInnerHTML={{__html: slider.description}}
                  ></div>
                  <a href={slider.url} className="main-button mt-8">
                    BUY
                  </a>
                </div>
                <div className="w-full lg:w-3/5 mt-12 lg:mt-0 slideMedia">
                  {slideActiveVideo !== '' ? (
                    <LazyLoad>
                      <video
                        key={slideActiveVideo}
                        height="100%"
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster={slideActiveImage}
                      >
                        <source src={slideActiveVideo} type="video/mp4" />
                        <source src={slideActiveVideo} type="video/webm" />
                        Your browser does not support the video tag.
                      </video>
                    </LazyLoad>
                  ) : (
                    <img src={slider.image} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-24 homepage-betatesters">
        <h2 className="text-center text-heading px-6 lg:px-0">
          WHAT THE BETA TESTERS SAY...
        </h2>
        <SlideCarousel
          containerStyles={
            'betatesters-slider h-[209px] mt-6 xl:h-[464px] xl:mt-[102px]'
          }
          trackStyles={
            'betatesters-slide-track w-[calc(342px*10)] xl:w-[calc(792px*10)]'
          }
        >
          {testimonials.map((testimony, index) => (
            <div
              className="betatesters-slide h-[209px] w-[306px] mx-[18px] xl:h-[464px] xl:w-[764px] xl:mx-[9px] cursor-pointer relative"
              key={`${testimony.img}-${index}`}
            >
              <img
                src={testimony.img}
                alt={testimony.altText}
                className="h-[209px] w-[306px] xl:h-[464px] xl:w-[764px] rounded-[20px]"
                onClick={() => {
                  setActiveTestimonial(testimony.video);
                  setModalOpen(true);
                }}
              />
              <div className="absolute bottom-0 left-0 flex flex-col justify-end p-[20px] xl:p-[40px] z-10">
                <h2 className="text-[20px] xl:text-[30px] font-[Radikal] text-[#ffffff] font-[900] leading-[100%] lg:leading-[117%]">
                  "{testimony.title}"
                </h2>
              </div>
            </div>
          ))}
        </SlideCarousel>
        <SlideCarousel
          containerStyles={'betatesters-slider mt-9 xl:mt-[21px]'}
          trackStyles={
            'betatesters-slide-track w-[calc(342px*12)] xl:w-[calc(792px*12)]'
          }
          right
        >
          {testimonials2.map((testimony, index) => (
            <div
              className="betatesters-slide h-[209px] w-[306px] mx-[18px] xl:h-[464px] xl:w-[764px] xl:mx-[9px] cursor-pointer relative"
              key={`${testimony.img}-${index}`}
            >
              <img
                src={testimony.img}
                alt={testimony.altText}
                className="h-[209px] w-[306px] xl:h-[464px] xl:w-[764px] rounded-[20px]"
                onClick={() => {
                  setActiveTestimonial(testimony.video);
                  setModalOpen(true);
                }}
              />
              <div className="absolute bottom-0 left-0 flex flex-col justify-end p-[20px] xl:p-[40px] z-10">
                <h2 className="text-[20px] xl:text-[30px] font-[Radikal] text-[#ffffff] font-[900] leading-[100%] lg:leading-[117%]">
                  "{testimony.title}"
                </h2>
              </div>
            </div>
          ))}
        </SlideCarousel>
      </section>

      <section className="homepage-cta-banner px-6 lg:px-24 mb-12 lg:mb-24">
        <div className="relative rounded-[20px] lg:rounded-[10px] overflow-hidden">
          <img
            src={ctabg}
            className="hidden md:block object-cover absolute w-full h-full top-0 left-0 "
            alt="A basketball player smiling while spinning a basketball on his finger"
          />
          <img
            src={ctaBGMobile}
            className="md:hidden w-full object-cover"
            alt="A basketball player smiling while spinning a basketball on his finger"
          />
          <div className="absolute w-full h-full lg:h-auto top-0 left-0 lg:relative px-12 py-16 cta-details flex flex-col justify-between align-center lg:block">
            <h2 className="mb-12 text-[40px] lg:text-[45px] xl:text-[100px] 2xl:text-[160px]">
              HAVE
              <br />
              QUESTIONS?
            </h2>
            <div className="text-center md:text-left">
              <Link
                key="/pages/faqs"
                to="/pages/faqs"
                target="_self"
                prefetch="intent"
                className="main-button normal-case"
              >
                View FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="homepage-guides px-6 lg:px-24 mb-12 lg:mb-24">
        <div className="flex flex-wrap lg:flex-nowrap gap-y-8 lg:gap-y-0 gap-x-12">
          {guideItems.map((guide, index) => (
            <div className="w-full lg:w-6/12" key={index}>
              <div className="item-wrapper relative">
                <img
                  src={guide.image}
                  className="rounded-[20px] lg:rounded-[10px]"
                  alt={guide.alt}
                />
                <div className="guide-details absolute lg:h-auto top-auto lg:top-auto bottom-0 left-0 p-6 lg:px-12 lg:pb-8 w-full">
                  <h3 className="mb-4">{guide.heading}</h3>
                  <div className="flex justify-between flex-col lg:flex-row">
                    <p>{guide.description}</p>
                    <Link
                      key={guide.url}
                      to={guide.url}
                      target="_self"
                      prefetch="intent"
                      className="text-left lg:text-right"
                    >
                      Learn more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* {primaryHero && (
        <Hero {...primaryHero} height="full" top loading="eager" />
      )} */}

      {/* {featuredProducts && (
        <Suspense>
          <Await resolve={featuredProducts}>
            {({products}) => {
              if (!products?.nodes) return <></>;
              return (
                <ProductSwimlane
                  products={products}
                  title="Featured Products"
                  count={4}
                />
              );
            }}
          </Await>
        </Suspense>
      )}

      {secondaryHero && (
        <Suspense fallback={<Hero {...skeletons[1]} />}>
          <Await resolve={secondaryHero}>
            {({hero}) => {
              if (!hero) return <></>;
              return <Hero {...hero} />;
            }}
          </Await>
        </Suspense>
      )}

      {featuredCollections && (
        <Suspense>
          <Await resolve={featuredCollections}>
            {({collections}) => {
              if (!collections?.nodes) return <></>;
              return (
                <FeaturedCollections
                  collections={collections}
                  title="Collections"
                />
              );
            }}
          </Await>
        </Suspense>
      )}

      {tertiaryHero && (
        <Suspense fallback={<Hero {...skeletons[2]} />}>
          <Await resolve={tertiaryHero}>
            {({hero}) => {
              if (!hero) return <></>;
              return <Hero {...hero} />;
            }}
          </Await>
        </Suspense>
      )} */}
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

const COLLECTION_HERO_QUERY = `#graphql
  query heroCollectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    hero: collection(handle: $handle) {
      ...CollectionContent
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

// @see: https://shopify.dev/api/storefront/2023-07/queries/collections
export const FEATURED_COLLECTIONS_QUERY = `#graphql
  query homepageFeaturedCollections($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collections(
      first: 4,
      sortKey: UPDATED_AT
    ) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
` as const;
