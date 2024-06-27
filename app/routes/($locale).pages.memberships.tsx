import {json, defer, type LoaderArgs} from '@shopify/remix-oxygen';
import React, {Suspense, useState, useEffect, useCallback, useRef} from 'react';
import {Await, useLoaderData} from '@remix-run/react';
import {AnalyticsPageType} from '@shopify/hydrogen';
import {LayoutGroup, motion} from 'framer-motion';

import {ProductSwimlane, FeaturedCollections, Hero, Link} from '~/components';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {getHeroPlaceholder} from '~/lib/placeholders';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import Slideshow from '~/components/Slideshow';

import membershipBanner from '../images/memberships/membershipBanner.jpeg';
import featuredBenefits from '../images/memberships/featuredBenefits.webp';
import getStarted from '../images/memberships/getStarted.webp';

export const headers = routeHeaders;

export async function loader({request, params, context}: LoaderArgs) {
  const {page} = await context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: 'memberships',
      language: context.storefront.i18n.language,
    },
  });

  if (!page) {
    throw new Response(null, {status: 404});
  }

  const seo = seoPayload.page({page, url: request.url});

  return json({page, seo});
}

export default function Memberships() {
  const {page} = useLoaderData<typeof loader>();
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [activeAccordion, setActiveAccordion] = useState(0);

  const iconBlocks = [
    {
      icon: '<svg aria-labelledby="iconTitle" role="img  width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg"><title id="iconTitle">An icon of a house</title><path d="M12.604 44.6875H21.1978V30.3646H33.8019V44.6875H42.3957V22.3438L27.4998 11.1719L12.604 22.3438V44.6875ZM9.1665 48.125V20.625L27.4998 6.875L45.8332 20.625V48.125H30.3644V33.8021H24.6353V48.125H9.1665Z" fill="#FFEADB"/></svg>',
      ariaTxt: 'An icon of a house',
      heading: 'Play Anywhere',
      description:
        'The Huupe is a full-size basketball hoop that can be installed anywhere outside or inside.',
    },
    {
      icon: '<svg aria-labelledby="iconTitle" width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg"><title id="iconTitle">An icon of a video</title><path d="M8.021 50.4173C7.10433 50.4173 6.30225 50.0736 5.61475 49.3861C4.92725 48.6986 4.5835 47.8965 4.5835 46.9798V21.7715C4.5835 20.8548 4.92725 20.0527 5.61475 19.3652C6.30225 18.6777 7.10433 18.334 8.021 18.334H46.9793C47.896 18.334 48.6981 18.6777 49.3856 19.3652C50.0731 20.0527 50.4168 20.8548 50.4168 21.7715V46.9798C50.4168 47.8965 50.0731 48.6986 49.3856 49.3861C48.6981 50.0736 47.896 50.4173 46.9793 50.4173H8.021ZM8.021 46.9798H46.9793V21.7715H8.021V46.9798ZM23.3179 42.9121L35.9793 34.3756L23.3179 25.8965V42.9121ZM8.53662 14.8965V11.459H46.4637V14.8965H8.53662ZM16.0418 8.02148V4.58398H38.9585V8.02148H16.0418Z" fill="#FFEADB"/></svg>',
      ariaTxt: 'An icon of a video',
      heading: 'Live & On-demand Classes',
      description:
        'Stream on-demand training content tailored to what you want to work on. Find efficient, effective, and engaging training programs tailored to your skill level and training goals.',
    },
    {
      icon: '<svg aria-labelledby="iconTitle" width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg"><title id="iconTitle">An icon of a basketball</title><path d="M8.07829 25.7819H15.9272C15.6599 23.9486 15.1252 22.2203 14.3231 20.597C13.521 18.9737 12.5279 17.5701 11.3439 16.3861C10.4654 17.7229 9.72065 19.1743 9.10954 20.7402C8.49843 22.3062 8.15468 23.9868 8.07829 25.7819ZM39.0731 25.7819H46.922C46.8456 23.9868 46.5019 22.3062 45.8908 20.7402C45.2797 19.1743 44.5349 17.7229 43.6564 16.3861C42.3578 17.6847 41.3361 19.117 40.5913 20.6829C39.8465 22.2489 39.3404 23.9486 39.0731 25.7819ZM11.3439 38.5579C12.6425 37.2593 13.6642 35.8366 14.409 34.2897C15.1538 32.7428 15.6599 31.0527 15.9272 29.2194H8.07829C8.15468 31.0145 8.49843 32.6855 9.10954 34.2324C9.72065 35.7793 10.4654 37.2211 11.3439 38.5579ZM43.6564 38.5579C44.5349 37.2211 45.2797 35.7793 45.8908 34.2324C46.5019 32.6855 46.8456 31.0145 46.922 29.2194H39.0731C39.3404 31.0527 39.8465 32.7428 40.5913 34.2897C41.3361 35.8366 42.3578 37.2593 43.6564 38.5579ZM19.422 25.7819H25.7814V8.07878C23.4134 8.34614 21.2076 8.95725 19.1642 9.91211C17.1208 10.867 15.2779 12.1465 13.6356 13.7506C15.2015 15.3166 16.4811 17.1309 17.4741 19.1934C18.4672 21.2559 19.1165 23.452 19.422 25.7819ZM29.2189 25.7819H35.5783C35.8838 23.452 36.5427 21.2559 37.5548 19.1934C38.567 17.1309 39.8561 15.3166 41.422 13.7506C39.7797 12.1465 37.9272 10.867 35.8647 9.91211C33.8022 8.95725 31.587 8.34614 29.2189 8.07878V25.7819ZM25.7814 46.9225V29.2194H19.422C19.1165 31.5493 18.4672 33.7359 17.4741 35.7793C16.4811 37.8227 15.2015 39.6274 13.6356 41.1934C15.2779 42.7975 17.0731 44.0866 19.021 45.0605C20.9689 46.0345 23.2224 46.6552 25.7814 46.9225ZM29.2189 46.9225C31.7779 46.6552 34.041 46.0345 36.008 45.0605C37.975 44.0866 39.7797 42.7975 41.422 41.1934C39.8561 39.6274 38.567 37.8227 37.5548 35.7793C36.5427 33.7359 35.8838 31.5493 35.5783 29.2194H29.2189V46.9225ZM27.5002 50.4173C24.33 50.4173 21.3509 49.8157 18.5627 48.6126C15.7745 47.4095 13.3491 45.7767 11.2866 43.7142C9.22412 41.6517 7.59131 39.2263 6.38818 36.4381C5.18506 33.65 4.5835 30.6708 4.5835 27.5006C4.5835 24.3305 5.18506 21.3513 6.38818 18.5631C7.59131 15.775 9.22412 13.3496 11.2866 11.2871C13.3491 9.22461 15.7745 7.5918 18.5627 6.38867C21.3509 5.18555 24.33 4.58398 27.5002 4.58398C30.6703 4.58398 33.6495 5.18555 36.4377 6.38867C39.2259 7.5918 41.6512 9.22461 43.7137 11.2871C45.7762 13.3496 47.409 15.775 48.6121 18.5631C49.8153 21.3513 50.4168 24.3305 50.4168 27.5006C50.4168 30.6708 49.8153 33.65 48.6121 36.4381C47.409 39.2263 45.7762 41.6517 43.7137 43.7142C41.6512 45.7767 39.2259 47.4095 36.4377 48.6126C33.6495 49.8157 30.6703 50.4173 27.5002 50.4173Z" fill="#FFEADB"/></svg>',
      ariaTxt: 'An icon of a basketball',
      heading: '1:1 PERSONAL TRAINING',
      description:
        'Choose from hundreds of professionally led training programs to keep you motivated and help you reach your goals.',
    },
    {
      icon: '<svg aria-labelledby="iconTitle" width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg"><title id="iconTitle">A multi-user icon</title><path d="M2.17725 45.834V40.4486C2.17725 39.1118 2.521 37.8991 3.2085 36.8105C3.896 35.722 4.85086 34.9104 6.07308 34.3756C8.86127 33.1534 11.3726 32.275 13.6069 31.7402C15.8413 31.2055 18.1425 30.9381 20.5106 30.9381C22.8786 30.9381 25.1703 31.2055 27.3856 31.7402C29.6009 32.275 32.1026 33.1534 34.8908 34.3756C36.113 34.9104 37.0774 35.722 37.784 36.8105C38.4906 37.8991 38.8439 39.1118 38.8439 40.4486V45.834H2.17725ZM42.2814 45.834V40.4486C42.2814 38.0423 41.6703 36.0657 40.4481 34.5189C39.2259 32.972 37.6217 31.7211 35.6356 30.7663C38.271 31.0718 40.7536 31.5206 43.0835 32.1126C45.4134 32.7046 47.304 33.3826 48.7554 34.1465C50.0158 34.8722 51.0088 35.7697 51.7345 36.8392C52.4602 37.9086 52.8231 39.1118 52.8231 40.4486V45.834H42.2814ZM20.5106 27.4434C17.9897 27.4434 15.9272 26.6413 14.3231 25.0371C12.7189 23.4329 11.9168 21.3704 11.9168 18.8496C11.9168 16.3288 12.7189 14.2663 14.3231 12.6621C15.9272 11.0579 17.9897 10.2559 20.5106 10.2559C23.0314 10.2559 25.0939 11.0579 26.6981 12.6621C28.3022 14.2663 29.1043 16.3288 29.1043 18.8496C29.1043 21.3704 28.3022 23.4329 26.6981 25.0371C25.0939 26.6413 23.0314 27.4434 20.5106 27.4434ZM41.1356 18.8496C41.1356 21.3704 40.3335 23.4329 38.7293 25.0371C37.1252 26.6413 35.0627 27.4434 32.5418 27.4434C32.1217 27.4434 31.6538 27.4147 31.1382 27.3574C30.6226 27.3001 30.1547 27.1951 29.7345 27.0423C30.6512 26.0875 31.3483 24.913 31.8257 23.5189C32.3031 22.1248 32.5418 20.5684 32.5418 18.8496C32.5418 17.1309 32.3031 15.6126 31.8257 14.2949C31.3483 12.9772 30.6512 11.7645 29.7345 10.6569C30.1547 10.5423 30.6226 10.4468 31.1382 10.3704C31.6538 10.2941 32.1217 10.2559 32.5418 10.2559C35.0627 10.2559 37.1252 11.0579 38.7293 12.6621C40.3335 14.2663 41.1356 16.3288 41.1356 18.8496ZM5.61475 42.3965H35.4064V40.4486C35.4064 39.8375 35.225 39.2454 34.8621 38.6725C34.4993 38.0996 34.0505 37.6986 33.5158 37.4694C30.7658 36.2472 28.455 35.426 26.5835 35.0059C24.712 34.5857 22.6877 34.3756 20.5106 34.3756C18.3335 34.3756 16.2996 34.5857 14.409 35.0059C12.5184 35.426 10.1981 36.2472 7.44808 37.4694C6.91336 37.6986 6.47412 38.0996 6.13037 38.6725C5.78662 39.2454 5.61475 39.8375 5.61475 40.4486V42.3965ZM20.5106 24.0059C22.0002 24.0059 23.2319 23.5189 24.2059 22.5449C25.1799 21.571 25.6668 20.3392 25.6668 18.8496C25.6668 17.36 25.1799 16.1283 24.2059 15.1543C23.2319 14.1803 22.0002 13.6934 20.5106 13.6934C19.021 13.6934 17.7892 14.1803 16.8153 15.1543C15.8413 16.1283 15.3543 17.36 15.3543 18.8496C15.3543 20.3392 15.8413 21.571 16.8153 22.5449C17.7892 23.5189 19.021 24.0059 20.5106 24.0059Z" fill="#FFEADB"/></svg>',
      ariaTxt: 'A multi-user icon',
      heading: 'Full Family Fun',
      description:
        "Stream anything to the huupe! When you're not working on your game you can stream your favorite sporting events, shows and highlights. The huupe is a fully outdoor TV on a basketball hoop. Take full advantage.",
    },
  ];

  const accordionItems = [
    {
      title: 'UNLIMITED ACCESS',
      content:
        "The huupe membership offers unlimited access to huupe's growing library of training sessions and workouts for you and your whole family.",
    },
    {
      title: 'UNLIMITED PERSONALIZATION',
      content: "List a few personalization options. I'm not sure what the are.",
    },
    {
      title: 'TRACK YOUR STATS',
      content: 'List some of the stats they can track.',
    },
  ];

  const runTimer = useCallback(() => {
    timer.current = setTimeout(() => {
      if (activeAccordion === accordionItems.length - 1) {
        setActiveAccordion(0);
      } else {
        setActiveAccordion((prev) => prev + 1);
      }
    }, 3000);
  }, [accordionItems.length, activeAccordion]);

  const setIndex = (index: number) => {
    clearTimeout(timer.current);
    setActiveAccordion(index);
    runTimer();
  };

  useEffect(() => {
    runTimer();
    return () => clearTimeout(timer.current);
  }, [runTimer]);

  return (
    <>
      <section className="text-image membership-text-image px-0 lg:px-24 lg:pb-28 pt-40 lg:pt-48">
        <div className="flex gap-4 flex-wrap lg:flex-nowrap">
          <div className="w-full lg:w-6/12 px-6 pb-6 pt-18 lg:pr-36 lg:pt-8">
            <h1 className="text-heading mb-4">THE HUUPE MEMBERSHIP</h1>
            <p>None of the hassle, all of the benefits.</p>
          </div>

          <div className="w-full lg:w-6/12 lg:pr-4">
            <img
              src={membershipBanner}
              className="h-full w-full object-cover lg:rounded-tl-[10px]"
              alt="A young man is holding a basketball in front of the huupe"
            />
          </div>
        </div>
      </section>

      <section className="text-image membership-text-image-2  lg:p-24 lg:pb-6">
        <div className="flex flex-wrap-reverse lg:flex-wrap">
          <div className="w-full lg:w-6/12 basis-full lg:basis-6/12 ">
            <img
              src={featuredBenefits}
              className="h-full w-full object-cover lg:rounded-tl-[10px]"
              alt="The Golden State Warriors game playing on the huupe"
            />
          </div>

          <div className="w-full lg:w-6/12 basis-full lg:basis-6/12 px-6 py-12 lg:py-0 lg:pr-50 lg:pl-12 h-[619px] sm:h-[496px] md:h-[493px] lg:h-[461px]">
            <h2 className="text-heading mb-4">
              FEATURED <br />
              BENEFITS
            </h2>
            <div className="accordion-wrapper membership-accordion relative lg:max-w-[500px] flex flex-col">
              <LayoutGroup>
                {accordionItems.map((accordionItem, index) => (
                  <AccordionItem
                    title={accordionItem.title}
                    content={accordionItem.content}
                    index={index}
                    setIndex={setIndex}
                    activeAccordion={activeAccordion}
                    key={index}
                  />
                ))}
              </LayoutGroup>
            </div>
          </div>
        </div>
      </section>

      <section className="icon-blocks px-6 pt-24 pt-24 lg:px-24 pb-12 overflow-x-auto lg:overflow-hidden hidden lg:block">
        <div className="flex flex-nowrap lg:flex-wrap -mx-3">
          {iconBlocks.map((icon, index) => (
            <div
              className="w-full lg:w-3/12 grow-0 shrink-0 basis-full lg:basis-3/12 px-3 text-center iconBlock-item"
              key={index}
            >
              <span
                className="text-center"
                dangerouslySetInnerHTML={{__html: icon.icon}}
              ></span>
              <h4>{icon.heading}</h4>
              <p>{icon.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="icon-blocks pt-[70px] block lg:hidden">
        <Slideshow>
          {iconBlocks.map((icon, index) => (
            <div
              className="px-3 text-center icon-slide-item flex items-center justify-center flex-col h-full"
              key={index}
            >
              <div className={'max-w-[323px] flex items-center flex-col'}>
                <span
                  className="text-center w-[121px] h-[121px] bg-[#F26500] flex items-center justify-center"
                  dangerouslySetInnerHTML={{__html: icon.icon}}
                ></span>
                <h4>{icon.heading}</h4>
                <p>{icon.description}</p>
              </div>
            </div>
          ))}
        </Slideshow>
      </section>

      <section className="text-image membership-text-image-3 px-6 py-8 lg:p-24">
        <div className="flex flex-wrap flex-col lg:flex-row">
          <div className="w-full lg:w-6/12 basis-full lg:basis-6/12">
            <h2 className="text-heading mb-4">
              GET STARTED WITH HUUPE MEMBERSHIP
            </h2>
            <Link
              key="/products/the-huupe"
              to="/products/the-huupe"
              target="_self"
              prefetch="intent"
              className="main-button w-full md:w-auto mt-6 lg:mt-12"
            >
              BUY
            </Link>
          </div>
          <div className="w-full lg:w-6/12 basis-full lg:basis-6/12 hidden lg:block">
            <img
              src={getStarted}
              className="h-full w-full object-cover"
              alt="A male player blocking a basketball shot"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function AccordionItem({
  title,
  content,
  index,
  setIndex,
  activeAccordion,
}: {
  title: string;
  content: string;
  index: number;
  setIndex: (index: number) => void;
  activeAccordion: number;
}) {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div
        className={`${
          activeAccordion === index ? `active` : ''
        } accordion-item relative`}
      >
        <motion.div
          layout
          className="accordion-title flex justify-between"
          onClick={() => {
            setIsActive(!isActive);
            setIndex(index);
          }}
        >
          <div>{title}</div>
        </motion.div>
        {activeAccordion === index && (
          <motion.div className="accordion-content pt-2">{content}</motion.div>
        )}
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
