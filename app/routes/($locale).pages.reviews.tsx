import {json, defer, type LoaderArgs} from '@shopify/remix-oxygen';
import React, {Suspense, useState} from 'react';
import {Await, useLoaderData} from '@remix-run/react';
import {AnalyticsPageType} from '@shopify/hydrogen';

import {ProductSwimlane, FeaturedCollections, Hero, Modal} from '~/components';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {getHeroPlaceholder} from '~/lib/placeholders';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import LazyLoad from 'react-lazy-load';
import {SlideCarousel} from '~/components';

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
// articles images
import dribbleDrill from '../images/reviews/Basketball-player-Dribble-Drill.jpeg';
import dexterCamera from '../images/reviews/Dexter-looking-at-camera.jpeg';
import dexterLayup from '../images/reviews/Dexter-layup.jpeg';
import dunking from '../images/reviews/Dunking.webp';
import familyBasketball from '../images/reviews/Family-enjoying-basketball.jpeg';
import fatherSon from '../images/reviews/Father-Son-selfie.jpeg';
import huupeHouse from '../images/reviews/huupe-at-house.jpeg';
import playerRim from '../images/reviews/Player-hanging-on-the-rim.webp';
import youngPlayer from '../images/reviews/Young-athlete-shooting-a-free-throw.webp';
import paulLyth from '../images/reviews/paulAndLyth.webp'
// articles logos
import accesswireLogo from '../images/reviews/Accesswire.webp';
import digitalJournalLogo from '../images/reviews/DigitalJournalLogo.webp';
import fittInsiderLogo from '../images/reviews/Fitt-Insider.webp';
import fosLogo from '../images/reviews/Front-Office-Sports-logo.webp';
import marketInsiderLogo from '../images/reviews/MarketsInsiderLogo.webp';
import mashableLogo from '../images/reviews/Mashable_Logo_(2021).svg.webp';
import modernLuxuryLogo from '../images/reviews/ModernLuxuryLogo.webp';
import okLogo from '../images/reviews/ok_logo_black.webp';
import proMediaLogo from '../images/reviews/SportsProMediaLogo.webp';
import techCrunchLogo from '../images/reviews/TechCrunchLogo.webp';

export const headers = routeHeaders;

export async function loader({request, params, context}: LoaderArgs) {
  const {page} = await context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: 'reviews',
      language: context.storefront.i18n.language,
    },
  });

  if (!page) {
    throw new Response(null, {status: 404});
  }

  const seo = seoPayload.page({page, url: request.url});

  return json({page, seo});
}

export default function Reviews() {
  const {page} = useLoaderData<typeof loader>();
  const [activeTestimonial, setActiveTestimonial] = useState<string>(jahzere);
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
    setActiveTestimonial('');
  };

  const articles = [
    {
      img: dribbleDrill,
      imgAltTxt: 'basketball player practicing their dribbling skills by dribbling through tall yellow cones',
      logo: okLogo,
      logoAltText: 'OK magazine logo',
      link: 'https://okmagazine.com/p/huupe-paul-anton-lyth-saeed-disrupting-global-basketball-market/',
    },
    {
      img: huupeHouse,
      imgAltTxt: 'the huupe with the screen on the backboard tracking shots of a user at a home',
      logo: techCrunchLogo,
      logoAltText: 'TechCrunch logo',
      link: 'https://techcrunch.com/2023/03/24/huupe-a-smart-basketball-hoop-startup-raises-its-game-with-11m/',
    },
    {
      img: youngPlayer,
      imgAltTxt:
        ' player looking at the camera and holding a basketball. Behind him there is a hoop with basketball highlights playing on the backboard',
      logo: fittInsiderLogo,
      logoAltText: 'Fitt Insider logo',
      link: 'https://insider.fitt.co/smart-backboard-maker-huupe-scores-11m/',
    },
    {
      img: dexterLayup,
      imgAltTxt:
        'son making layup on a basketball hoop in their home’s driveway while his father watches',
      logo: fosLogo,
      logoAltText: 'Front Office Sports logo',
      link: 'https://frontofficesports.com/can-basketball-hoops-become-part-of-the-smart-gym-ecosystem/',
    },
    {
      img: dunking,
      imgAltTxt: 'basketball player dunking a basketball on a 10-foot hoop',
      logo: proMediaLogo,
      logoAltText: 'SportsPro Media logo',
      link: 'https://www.sportspromedia.com/news/huupe-basketball-backboard-digital-startup-investment-nba/?zephr_sso_ott=Y4jCUy',
    },
  ];

  const articles2 = [
    {
      img: familyBasketball,
      imgAltTxt: 'family enjoying playing basketball together',
      logo: accesswireLogo,
      logoAltText: 'Accesswire logo',
      link: 'https://www.accesswire.com/695440/How-Huupes-Innovative-Smart-Basketball-Hoop-uses-Machine-Learning-and-Advanced-Analytics-to-Revolutionize-How-Basketball-Enthusiasts-Play-the-Game',
    },
    {
      img: fatherSon,
      imgAltTxt: 'father and son taking a selfie in front of the huupe',
      logo: digitalJournalLogo,
      logoAltText: 'Digital Journal logo',
      link: 'https://www.digitaljournal.com/tech-science/innovation-and-basketball-how-paul-anton-and-lyth-saeed-started-huupe/article',
    },
    {
      img: paulLyth,
      imgAltTxt: 'The co-founders of huupe sitting down and smiling at the camera.',
      logo: mashableLogo,
      logoAltText: 'Mashable logo',
      link: 'https://nl.mashable.com/basketball/7475/huupe-rolls-out-worlds-first-smart-basketball-hoop',
    },
    {
      img: playerRim,
      imgAltTxt: 'Basketball player hanging on rim while pointing at camera',
      logo: marketInsiderLogo,
      logoAltText: 'Markets Insider logo',
      link: 'https://markets.businessinsider.com/news/stocks/global-sports-entertainment-agency-paradigm-sports-leads-initial-investment-round-in-revolutionary-basketball-technology-platform-huupe-1031640157',
    },
    {
      img: dexterCamera,
      imgAltTxt:
        'young player shooting a free throw. His training is standing under the rim waiting for the rebound.',
      logo: modernLuxuryLogo,
      logoAltText: 'Modern Luxury logo',
      link: 'https://editionml.com/huupe-app-basketball-smart-technology',
    },
  ];

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
            Your browser does not support the video tag.
          </video>
        </Modal>
      ) : (
        <></>
      )}

      <section className="pt-[170px] lg:pt-[335px] bg-[#ffffff]">
        <h2 className="text-heading px-6 lg:px-24">FEATURED IN</h2>
        <SlideCarousel
          containerStyles={
            'betatesters-slider h-[209px] mt-6 xl:h-[464px] xl:mt-[102px]'
          }
          trackStyles={
            'betatesters-slide-track w-[calc(342px*10)] xl:w-[calc(792px*10)]'
          }
        >
          {articles.map((article, index) => (
            <a
              className="betatesters-slide h-[209px] w-[306px] mx-[18px] xl:h-[464px] xl:w-[764px] xl:mx-[9px] cursor-pointer relative"
              key={`${article.img}-${index}`}
              href={article.link}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={article.img}
                alt={article.imgAltTxt}
                className="h-[209px] w-[306px] xl:h-[464px] xl:w-[764px] rounded-[20px]"
              />
              <div className="absolute bottom-0 left-0 flex flex-col justify-end p-[20px] xl:p-[40px] z-10">
                <img
                  className="h-[30px] xl:h-[50px]"
                  src={article.logo}
                  alt={article.logoAltText}
                />
              </div>
            </a>
          ))}
        </SlideCarousel>
        <SlideCarousel
          containerStyles={'betatesters-slider mt-9 xl:mt-[21px]'}
          trackStyles={
            'betatesters-slide-track w-[calc(342px*10)] xl:w-[calc(792px*12)]'
          }
          right
        >
          {articles2.map((article, index) => (
            <a
              className="betatesters-slide h-[209px] w-[306px] mx-[18px] xl:h-[464px] xl:w-[764px] xl:mx-[9px] cursor-pointer relative"
              key={`${article.img}-${index}`}
              href={article.link}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={article.img}
                alt={article.imgAltTxt}
                className="h-[209px] w-[306px] xl:h-[464px] xl:w-[764px] rounded-[20px]"
              />
              <div className="absolute bottom-0 left-0 flex flex-col justify-end p-[20px] xl:p-[40px] z-10">
                <img
                  className="h-[30px] xl:h-[50px]"
                  src={article.logo}
                  alt={article.logoAltText}
                />
              </div>
            </a>
          ))}
        </SlideCarousel>
      </section>

      <section className="pt-[70px] lg:pt-[150px]  bg-[#ffffff]">
        <h2 className="text-heading px-6 lg:px-24 text-center lg:text-left">
          OUR CUSTOMERS
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
              <div className="absolute bottom-0 left-0 flex flex-col justify-end p-[20px] lx:p-[40px] z-10">
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
              <div className="absolute bottom-0 left-0 flex flex-col justify-end p-[20px] lx:p-[40px] z-10">
                <h2 className="text-[20px] xl:text-[30px] font-[Radikal] text-[#ffffff] font-[900] leading-[100%] lg:leading-[117%]">
                  "{testimony.title}"
                </h2>
              </div>
            </div>
          ))}
        </SlideCarousel>
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
