import {json, defer, type LoaderArgs} from '@shopify/remix-oxygen';
import {Suspense, useState, useEffect} from 'react';
import {Await, useLoaderData} from '@remix-run/react';
import {AnalyticsPageType} from '@shopify/hydrogen';

import {ProductSwimlane, FeaturedCollections, Hero} from '~/components';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {getHeroPlaceholder} from '~/lib/placeholders';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';

import careersBanner from '../images/careersBanner.webp'
import careerBannerMobile from '../images/careerBannerMobile.webp'

export const headers = routeHeaders;

export async function loader({request, params, context}: LoaderArgs) {
    const {page} = await context.storefront.query(PAGE_QUERY, {
      variables: {
        handle: 'career',
        language: context.storefront.i18n.language,
      },
    });
  
    if (!page) {
      throw new Response(null, {status: 404});
    }
  
    const seo = seoPayload.page({page, url: request.url});
  
    return json({page, seo});
  }
  

export default function Careers() {
    const {page} = useLoaderData<typeof loader>();
    const [careerBannerImage, setCareerBannerImage] = useState(careersBanner)

    function handleWindowSizeChange() {
        if( window.innerWidth < 768 ){
            setCareerBannerImage(careerBannerMobile)
        }else{
            setCareerBannerImage(careersBanner)
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
      }, [])

    return (
        <>
           <section className="careers-banner px-0 pb-6 pt-40 lg:pt-0 lg:px-0 lg:pb-0 relative">
                <div className="lg:absolute bottom-0 left-0 px-6 pb-6 lg:pb-24 lg:pl-24">
                    <h1 className="mb-4 lg:mb-6 text-heading">CAREERS</h1>
                    <p>Join our team and let's create the future of <br />basketball, today. </p>
                </div>
                <img src={careerBannerImage} className="w-full object-cover"/>
           </section>

           <section className="application-form p-24">
                {/* embed code here */}
           </section>
        </>
    )
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