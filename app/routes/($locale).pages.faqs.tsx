import {json, defer, type LoaderArgs} from '@shopify/remix-oxygen';
import {Suspense, useState, useEffect} from 'react';
import {Await, useLoaderData} from '@remix-run/react';
import {AnalyticsPageType} from '@shopify/hydrogen';

import {ProductSwimlane, FeaturedCollections, Hero} from '~/components';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {getHeroPlaceholder} from '~/lib/placeholders';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';

import faqImage from '../images/faqImage.webp'



export const headers = routeHeaders;

export async function loader({request, params, context}: LoaderArgs) {
    const {page} = await context.storefront.query(PAGE_QUERY, {
      variables: {
        handle: 'faqs',
        language: context.storefront.i18n.language,
      },
    });
  
    if (!page) {
      throw new Response(null, {status: 404});
    }
  
    const seo = seoPayload.page({page, url: request.url});
  
    // return json({page, seo});

    return defer({
        page,
        seo,
        analytics: {
          pageType: 'faqs',
        },
      });
  }
  


export default function FAQs() {
    const {page} = useLoaderData<typeof loader>();
    const [activeAccordion, setActiveAccordion] = useState(0)

    const setIndex = (index: number) => {
      setActiveAccordion( index );
    }

    const accordionItems = [
        {
            title: "What if I already have a basketball hoop and want to replace it with the huupe?",
            content: "If you're looking to buy a basketball hoop to replace your existing one, then our installation partners will remove your current hoop and replace it with a huupe!"
        },
        {
            title: "Can I purchase the huupe if I live outside of the United States?",
            content: "Unfortunately, our installation partners do not have a working network outside of the U.S. so our basketball hoops aren't for sale outside of the U.S at the moment. We are working hard to offer the huupe for purchase outside of the U.S. as soon as possible. Please stay tuned. It won't be long."
        },
        {
            title: "Can I purchase the huupe if I live in Hawaii or Alaska?",
            content: "Yes, the huupe will be available for purchase in Hawaii and Alaska, our basketball hoop is for sale in all US states!<br/><br/>Once your order has been confirmed you will receive a pre-installation survey via email to confirm the placement of your huupe. After the necessary information has been collected, our professional installers deliver and install your huupe. Installation takes 24-72 hours."
        },
        {
            title: "How much space is required to install and use the huupe?",
            content: "For an optimal huupe experience, we recommend at least a half court to play on, which is typically 50' baseline by 42' sideline.<br/><br/>The smallest half court we've installed on is 16' x 20' ft.<br/><br/>This decision is up to the family. You do not need a full half court! Just enough room to play basketball as you like."
        },
        {
            title: "Can I install the huupe myself?",
            content: "For your safety, it is important that the huupe is installed by our professional installers. In addition to delivering and installing the huupe in your home or driveway, our delivery partners will connect the huupe to WiFi, pair your Bluetooth, and get your account set up so you can start training out right away. This way, you can safely slam dunk (or aspire to) and play with full intensity."
        },
        {
            title: "How do I contact the huupe?",
            content: "Please email us at <a href='mailto: media@huupe.co'>media@huupe.co</a>."
        },
        {
            title: "What is included with my huupe membership?",
            content: "Your huupe membership gives you unlimited access to our growing library of training sessions and workouts for you and your whole family. Plus, unlimited personalization features to help you track everything and help you see your improvement.<br/><br/>You can even create electronic basketball games to play against your friends.<br/><br/>Plus, huupe contains a network of college and pro scouts that will be paying attention to your huupe stats!"
        },
        {
            title: "How many accounts can I add to my huupe?",
            content: "Unlimited!"
        },
        {
            title: "Can my kids use the huupe?",
            content: "Yes! The huupe basketball system has training sessions and workouts for all ages. Ages 3-6 start with the fundamentals! Each training session and workout has a designated age/skill level associated with it."
        },
        {
            title: "What warranty coverage do I receive with my huupe purchase?",
            content: "We stand behind our product and will offer a selection of warranty options/extensions at final checkout when our huupe is ready to ship. This is a work in progress right now."
        },
        {
            title: "What is the return policy?",
            content: "We want you to be completely satisfied with your purchase. If for any reason you're not, we are happy to return your huupe and refund you within 30 days of installation."
        },
        {
            title: "What security measures do you have in place to make sure my huupe isn't stolen?",
            content: "We have several anti-theft mechanisms to make sure your huupe isn't stolen. First, the huupe will not work if the screen is not attached to the pole. Second, our special “huupe lock” makes it incredibly difficult to remove a huupe backboard without our special huupe lock tool. And last, but not least, our backboard is pretty heavy."
        },
        
    ]

    return (
        <>
            <section className="faq-page-title px-6 lg:px-12 2xl:px-24 relative h-[auto] lg:h-[500px] 2xl:h-[602px] flex pb-[143px] lg:pb-[180px] 2xl:pb-[143px] pt-[100px] lg:pt-0">
                <div className="mt-auto relative z-10 w-full basis-full">
                    <p className="text-[#000] font-[700] lg:text-[20px] 2xl:text-[22px] leading-none">Support & FAQ</p>
                    <div className="flex justify-between flex-wrap lg:flex-nowrap pt-[7px] lg:pt-[14px] flex-col lg:flex-row">
                        <h1 className="text-[#000] text-[40px] 2xl:text-[68px] lg:max-w-[780px] font-black leading-[100%] lg:leading-[100%] font-[Montserrat]">FREQUENTLY ASKED QUESTIONS</h1>
                        <p className="lg:max-w-[606px] text-[#000] text-[16px] lg:text-[22px] leading-[22px] lg:leading-none font-[400] lg:text-right mt-[25px] lg:mt-[0px]">Need some support or have questions about huupe? Here are our most frequently asked questions. </p>
                    </div>
                </div> 
            </section>

            <section className="px-6 lg:px-12 2xl:px-24 pt-0 lg:pt-[100px] bg-[#ffffff] relative z-10">
                <div className="flex flex-wrap">
                    <div className="faq-left w-full lg:w-6/12 basis-full lg:basis-6/12 pr-0">
                        
                        <img src={faqImage} className="rounded-[20px] lg:min-h-[830px] lg:rounded-[10px] block object-cover w-full" />
                    </div>
                    <div className="faq-right w-full lg:w-6/12 basis-full lg:basis-6/12 pl-0 lg:pl-16 2xl:pl-20 mt-[60px] lg:mt-[0px]">
                        <div className="faq-accordion">
                            {accordionItems.map((accordionItem, index) => (
                            <AccordionItem title={accordionItem.title} content={accordionItem.content} index={index} setIndex={setIndex} activeAccordion={activeAccordion} key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}


function AccordionItem({ title, content, index, setIndex, activeAccordion } : {
    title: string;
    content: string;
    index: number;
    setIndex: (index:number) => void;
    activeAccordion: number;
  }){
  
    const [isActive, setIsActive] = useState(false);
    
    return(
      <>
      <div className={`${activeAccordion === index ? 'active' : ''} mb-[30px] px-[20px] py-[15px] lg:px-[27px] lg:py-[22px] accordion-item-faq relative flex justify-between border-solid rounded-[10px] border-[2px] ${activeAccordion === index ? 'border-[#000000]' : 'border-[#d0d0d0]'} hover:border-[#000000]`}>
        <div className="accordion-title-faq max-w-[566px] pr-[20px] lg:pr-0">
          <div className="font-[700]">{title}</div>
          <div dangerouslySetInnerHTML={{__html:content}} className={`accordion-content pt-[8px] text-[14px] lg:text-[16px]${ activeAccordion === index ? '' : ' line-clamp-1'}`}></div>
        </div>
        <div className="accordion-toggle cursor-pointer" onClick={() => { setIsActive(!isActive); setIndex( activeAccordion === index ? 99999 : index ) } }>
            <svg className={`transition-all duration-300 origin-center ${ activeAccordion === index ? 'rotate-[45deg]' : 'rotate-[0deg]' }`}width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.2812 30.875V20.7188H8.125V18.2812H18.2812V8.125H20.7188V18.2812H30.875V20.7188H20.7188V30.875H18.2812Z" fill="black"/>
            </svg>
        </div>
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