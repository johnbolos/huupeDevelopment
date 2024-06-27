import {json, defer, type LoaderArgs} from '@shopify/remix-oxygen';
import React, {Suspense, useState} from 'react';
import {Await, useLoaderData} from '@remix-run/react';
import {AnalyticsPageType} from '@shopify/hydrogen';

import {ProductSwimlane, FeaturedCollections, Hero, Link} from '~/components';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {getHeroPlaceholder} from '~/lib/placeholders';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import LazyLoad from 'react-lazy-load';

import huupeSpecs from '../images/ourtrainer/ourTrainerBanner.webp';
import trackData from '../images/trackData.webp';
import jordanLawley from '../images/ourtrainer/jordanLawley.webp';
import trainerRequirements from '../images/ourtrainer/trainerRequirements.webp';

// Trainers
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

//Videos
import trackDataVideo from '../videos/trackData.webm';

export const headers = routeHeaders;

export async function loader({request, params, context}: LoaderArgs) {
  const {page} = await context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: 'our-trainers',
      language: context.storefront.i18n.language,
    },
  });

  if (!page) {
    throw new Response(null, {status: 404});
  }

  const seo = seoPayload.page({page, url: request.url});

  return json({page, seo});
}

export default function OurTrainers() {
  const {page} = useLoaderData<typeof loader>();
  const [slideActive, setslideActive] = useState(0);

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

  return (
    <>
      <section className="our-trainer-banner relative">
        <LazyLoad>
          <video
            key={trackDataVideo}
            height="100%"
            autoPlay
            loop
            muted
            playsInline
            poster={trackData}
          >
            <source src={trackDataVideo} type="video/mp4" />
            <source src={trackDataVideo} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </LazyLoad>

        <div className="px-6 pb-24 lg:pb-36 lg:px-24 absolute bottom-0 left-0 w-full">
          <h1 className="mb-4">
            WORLD CLASS BASKETBALL <br className="hidden lg:inline-block" />
            TRAINERS
          </h1>
          <p>
            Our instructors are here to take your game to the next level and
            with the help of huupe's in-depth data, your training sessions will
            have even more impact.
          </p>
          <Link
            key="/products/the-huupe"
            to="/products/the-huupe"
            target="_self"
            prefetch="intent"
            className="main-button mt-6"
          >
            BUY
          </Link>
        </div>
      </section>

      <section className="the-trainer px-6 pt-24 lg:px-24 relative">
        <div className="the-trainer-background content-none absolute top-1/2 lg:top-0 left-[-20%] md:left-1/3 w-[793px] lg:w-[1965px] h-[793px] lg:h-[1965px]" />
        <div className="flex relative z-10 flex-wrap">
          <div className="w-full lg:w-5/12 basis-full lg:basis-5/12 pt-0 lg:pt-8 pb-8 lg:pb-24">
            <h2 className="mb-6 text-uppercase">{activeTrainer.name}</h2>
            <ul>
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
            <div className="slider-dots mb-8 absolute right-0 top-12 flex-col hidden lg:flex">
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
            <img src={activeTrainer.image} alt={activeTrainer.imgAlt} className="lg:h-full" />
            <span
              className="activeTrainerNext absolute bottom-6 left-3 block lg:hidden p-4 cursor-pointer"
              onClick={() => prevTrainer()}
            >
              <svg
                className="rotate-180"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.5 27.4375L7.75 25.6562L18.4688 14.9375L7.75 4.21875L9.5 2.4375L22 14.9375L9.5 27.4375Z"
                  fill="black"
                />
              </svg>
            </span>
            <span
              className="activeTrainerNext absolute bottom-6 right-3 block lg:hidden p-4 cursor-pointer"
              onClick={() => nextTrainer()}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.5 27.4375L7.75 25.6562L18.4688 14.9375L7.75 4.21875L9.5 2.4375L22 14.9375L9.5 27.4375Z"
                  fill="black"
                />
              </svg>
            </span>
          </div>
        </div>
      </section>

      <section className="our-trainer-text-image text-image pt-20 pb-12 lg:py-24 bg-[#ffffff]">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-7/12 px-6 lg:px-0 lg:pl-24 pb-8 lg:pb-0">
            <h2 className="text-heading mb-12 lg:mb-8">TRAINER REQUIREMENTS</h2>
            <h3 className="mb-3">BASKETBALL EXPERIENCE</h3>
            <p>
              Played two or more years of college basketball and/or played
              professional basketball for two or more years
            </p>
            <h3 className="mb-3 mt-10">COACHING / TRAINING EXPERIENCE</h3>
            <p>Four or more years of coaching/training experience</p>
            <h3 className="mb-3 mt-10">TEACHING EXPERIENCE</h3>
            <p>
              Four or more years of teaching experience, preferably in areas of
              physical education, kinesiology, or fitness
            </p>
            <h3 className="mb-3 mt-10">UNDERSTANDING OF THE GAME</h3>
            <p>
              Demonstrates a unique understanding of the game and basketball
              training. (Requires further interviewing to determine the extent
              of this unique circumstance)
            </p>
          </div>
          <div className="w-full lg:w-5/12">
            <img
              src={trainerRequirements}
              className="h-full object-cover w-full"
              alt="The Golden State Warriors game being played on the huupe backboard screen"
            />
          </div>
        </div>
      </section>
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
