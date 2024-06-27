
import { useState } from "react";
import MultiCarousel from "react-multi-carousel";
import abcNews from '../images/press/abc-news.png';
import houseOfHighlights from '../images/press/house-of-highlights.png';
import ktLa5 from '../images/press/ktla-5.png';
import mensJournal from '../images/press/mens-journal.png';
import theManual from '../images/press/the-manual.png';
import us from '../images/press/us.png';
import yahoo from '../images/press/yahoo.png';
import createTogether from '../images/press/create-together.png';

const responsive = {
  desktop: {
    breakpoint: { max: 2330, min: 1024 },
    items: 3,
    slidesToSlide: 1,
    partialVisibilityGutter: 36,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
    partialVisibilityGutter: 36,
  },
  mobile: {
    breakpoint: { max: 2330, min: 0 },
    items: 1,
    slidesToSlide: 1,
    partialVisibilityGutter: 36,
  }
};

export default function PressReviewCarousel() {
  const [additionalTransform, setAdditionalTransform] = useState<number>(0);
  const [selectedImageId, setSelectedId] = useState<number>(0);
  const [slide, setSlide] = useState(0)
  const reviewImages = [
    // {
    //   image: houseOfHighlights,
    //   title: 'How houseOfHighlights Is Transforming the At-Home Basketball Game With a Smart Basketball Hoop',
    //   description: 'Basketball hoops have been a staple of American driveways for decades. From in-ground hoops, to portable or wall-mounted hoops, traditional basketball hoops with tempered glass, acrylic, plastic and even wooden backboards have been fixtures in the American driveway for generations. Fast forward to 2022, and basketball hoops are starting to look a bit different than how we typically remember them.',
    //   ctaText: 'Read More',
    //   ctaLink: '/',
    // },
    {
      image: abcNews,
      title: `South Florida entrepreneurs create ‘smart basketball hoop’`,
      description: 'Many athletes trying to get whatever edge they can, as they train and play. Now, a pair of South Floridians are taking a technological twist to a classic piece of childhood equipment and are hoping it provides an added boost to athletes’ games. Co-founders Paul Anton and Lyth Saeed have created Huupe, billed as the world’s first “smart basketball hoop.”',
      ctaText: 'Read More',
      ctaLink: 'https://www.local10.com/news/local/2022/12/07/south-florida-entrepreneurs-create-smart-basketball-hoop/',
    },
    {
      image: mensJournal,
      title: 'How Huupe Is Transforming the At-Home Basketball Game With a Smart Basketball Hoop',
      description: 'Basketball hoops have been a staple of American driveways for decades. From in-ground hoops, to portable or wall-mounted hoops, traditional basketball hoops with tempered glass, acrylic, plastic and even wooden backboards have been fixtures in the American driveway for generations. Fast forward to 2022, and basketball hoops are starting to look a bit different than how we typically remember them.',
      ctaText: 'Read More',
      ctaLink: 'https://www.mensjournal.com/entertainment/how-huupe-is-transforming-the-at-home-basketball-game-with-a-smart-basketball-hoop',
    },
    {
      image: ktLa5,
      title: 'Basketball gets playful upgrade thanks to smart backboard',
      description: 'Huupe is the world’s first smart basketball hoop. Basketball is about to get a serious upgrade with a new smart digital hoop that can track your baskets, offer on demand training, and even let you play live with other people around the world.',
      ctaText: 'Read More',
      ctaLink: 'https://ktla.com/morning-news/huupe-smart-basketball-hoop-review-digital-backboard-richontech/',
    },
    {
      image: yahoo,
      title: `Huupe, a 'smart' basketball hoop startup, raises its game with $11M`,
      description: 'Basketball can be played just about anywhere and by anyone in the world, thanks to a confluence of factors that lower a lot of barriers: ubiquitous hoops set up in parks, schools, driveways and backyards. You can play with one or many, and the only other equipment needed is an inexpensive ball.',
      ctaText: 'Read More',
      ctaLink: 'https://www.yahoo.com/news/huupe-smart-basketball-hoop-startup-134306720.html',
    },
    {
      image: theManual,
      title: 'A Peloton-like hoop is coming for your driveway basketball game',
      description: `You've never played basketball like this. In 2023, the app fitness world will feature the digitally connected Huupe, adding one more sport to e-interactive workouts that include the Peloton app and Zwift e-cycling. This e-sport, however, required rigorous testing for the physical abuse that its smart backboard takes when in use.`,
      ctaText: 'Read More',
      ctaLink: 'https://www.themanual.com/fitness/huupe-peloton-like-smart-basketball-workout/',
    },
    {
      image: us,
      title: `Huupe, LIORE'e, Moxy Management and Ciro Jewelry Top the List of Today's Fastest Growing Early-Stage Brands`,
      description: `Huupe is the world's first-ever smart basketball hoop. Equipped with a high-definition screen as a backboard, huupe allows players to complete training drills or even play against other users no matter where they are.`,
      ctaText: 'Read More',
      ctaLink: 'https://www.usmagazine.com/celebrity-news/news/todays-fastest-growing-early-stage-brands/',
    },
  ];

  return (
    <>
      <div className="flex flex-col relative">
        <MultiCarousel
          ssr={false}
          swipeable={false}
          draggable={false}
          itemClass="image-item"
          itemAriaLabel="Image-aria-label"
          responsive={responsive}
          containerClass="carousel-container-with-scrollbar"
          additionalTransfrom={-additionalTransform * 7}
          afterChange={(nextSlide: number, { currentSlide }: any) => setSlide(currentSlide)}
          beforeChange={(nextSlide: number) => {
            if (nextSlide !== 0 && additionalTransform !== 150) {
              setAdditionalTransform(50)
            }
            if (nextSlide === 0 && additionalTransform === 150) {
              setAdditionalTransform(0)
            }
          }}
        >
          {reviewImages.map((item, index) => (
            <div className="image-container increase-size" onClick={() => { setSelectedId(index) }}>
              <img
                draggable={false}
                style={{ cursor: "pointer" }}
                src={item.image}
              />
              <div className={selectedImageId === index ? 'arrow-down' : 'hidden'} />
            </div>
          ))}
        </MultiCarousel>
      </div>
      <div className="flex flex-col xl:flex-row xl:pt-[136px] gap-[56px] xl:px-0">
        <div className="flex flex-col xl:max-w-[34.29vw] w-full px-[36px]">
          <img src={reviewImages[selectedImageId].image} alt={reviewImages[selectedImageId].toString()} className='w-max max-h-[92px] max-w-[152px] pb-[10px] xl:pb-[9px]' />
          <h3 className='text-[30px] leading-[1.067em] xl:text-[2.15vw] xl:leading-[1em] font-black pb-[16px] xl:pb-[32px]'>{reviewImages[selectedImageId].title}</h3>
          <p className='text-[14px] leading-[1.571em] font-normal pb-[10px] xl:pb-[9px]'>{reviewImages[selectedImageId].description}</p>
          <a className='text-left font-bold cursor-pointer' href={reviewImages[selectedImageId].ctaLink} target="_blank">{reviewImages[selectedImageId].ctaText}</a>
        </div>
        <div className="flex w-full h-[287px] xl:max-w-[45.92vw] xl:h-[25.83vw] bg-no-repeat bg-center bg-cover xl:rounded-[10px]" style={{ backgroundImage: `url(${createTogether})` }} />
      </div>
    </>
  );
}
