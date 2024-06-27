import {json, defer, type LoaderArgs} from '@shopify/remix-oxygen';
import {Suspense, useState, useEffect} from 'react';
import {Await, useLoaderData} from '@remix-run/react';

import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import {ProductSwimlane, PageHeader, Section, ProductCard, Grid} from '~/components';



/* Accessories Images */
import miniWallMount from '~/images/buy/miniWallMount.webp';
import miniProGripBall from '~/images/buy/miniProGripBall.webp';
import miniOfficialNet from '~/images/buy/miniOfficialNet.webp';
import miniRemote from '~/images/buy/miniRemote.webp';
import cozySweatsuit from '~/images/buy/cozySweatsuit.webp';
import cozySweatsuit2 from '~/images/buy/cozySweatsuit2.webp';
import cozySweatsuit3 from '~/images/buy/cozySweatsuit3.webp';
import cozySweatsuit4 from '~/images/buy/cozySweatsuit4.webp';


export const headers = routeHeaders;

export async function loader({request, params, context:{storefront}}: LoaderArgs) {

    const data = await storefront.query(ALL_PRODUCTS_QUERY, {
        variables: {
          country: storefront.i18n.country,
          language: storefront.i18n.language,
        },
    });

    const {page} = await storefront.query(PAGE_QUERY, {
      variables: {
        handle: 'buy',
        language: storefront.i18n.language,
      },
    });
  
    if (!page) {
      throw new Response(null, {status: 404});
    }
  
    const seo = seoPayload.page({page, url: request.url});
  
    // return json({page, seo});

    return defer({
        products: data.products,
        page,
        seo,
        analytics: {
          pageType: 'buy',
        },
      });
  }
  


export default function BuyPage() {
    const {products, page} = useLoaderData<typeof loader>();
    
    const productAccessories = [
        {
            image: miniWallMount,
            title: 'huupe mini wall mount kit',
            price: '',
            link: '',
            description: ''
        },
        {
            image: miniProGripBall,
            title: 'huupe mini pro grip ball',
            price: '',
            link: '',
            description: ''
        },
        {
            image: miniOfficialNet,
            title: 'huupe mini official net',
            description: 'required for play on huupe mini',
            price: '',
            link: ''
        },
        {
            image: miniRemote,
            title: 'huupe mini remote control',
            price: '',
            link: '',
            description: ''
        },
        {
            image: cozySweatsuit,
            title: 'huupe coze sweatsuit',
            price: '',
            link: '',
            description: ''
        },
        {
            image: cozySweatsuit2,
            title: 'huupe coze sweatsuit',
            price: '',
            link: '',
            description: ''
        },
        {
            image: cozySweatsuit3,
            title: 'huupe coze sweatsuit',
            price: '',
            link: '',
            description: ''
        },
        {
            image: cozySweatsuit4,
            title: 'huupe coze sweatsuit',
            price: '',
            link: '',
            description: ''
        },
    ];

    return (
        <>
            <section className="px-6 lg:px-24 pt-[100px] lg:pt-[146px]">
                <h1 className="text-center font-[Montserrat] text-[28px] lg:text-[48px] leading-[100%] text-[#000] font-[400]">Compare huupe models</h1>

                <div className="flex flex-wrap justify-center gap-[20px] my-[20px] lg:my-[50px]">
                    <Suspense>
                        <Await resolve={products}>
                            {products?.nodes?.map((product) => (
                                <ProductCard
                                    product={product}
                                    key={product.id}
                                    className="snap-start w-80"
                                    quickAdd={true}
                                    count={2}
                                    showDetails={true}
                                />
                            ))}
                        </Await>
                    </Suspense>
                </div>
            </section>


            <section className="px-6 lg:px-24 mb-12 lg:mb-24">
                <h2 className="text-center font-[Montserrat] text-[28px] lg:text-[48px] leading-[100%] text-[#000] font-[400]">Shop accessories</h2>

                <div className="flex flex-wrap mt-[20px] lg:mt-[40px] -mx-[10px]">
                    {productAccessories?.map((accessory, index) => (
                        <div className="w-full lg:w-4/12 p-[10px]" key={index}>
                            <div>
                                <div className="bg-[#FBF9F8] rounded-[20px] overflow-hidden h-full text-center h-[280px] lg:h-[420px] flex flex-col align-center justify-center">
                                    <img src={accessory.image} alt={accessory.title} className={`w-auto ${index >= 4 ? 'h-full object-bottom' : 'h-auto object-center'} object-contain  block mx-auto`} width="300" height="300"/>
                                </div>
                                <div className="flex justify-between mt-[15px] lg:mb-[60px]">
                                    <p className="text-[#000] font-bold text-[14px] lg:text-[24px] leading-[100%]">{accessory.title}{accessory.description != '' && <span className="font-normal block">({accessory.description})</span>}</p>
                                    <p className="text-[#000] text-[14px] lg:text-[24px] leading-[100%]">{accessory.price ? '$' + accessory.price : '$TBD' }</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
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

//id:6926837842111 OR id:7758175371455

const ALL_PRODUCTS_QUERY = `#graphql
  query AllProducts(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(first: 10, query: "handle:huupe-classic OR handle:huupe-pro") {
        nodes {
            ...ProductCard
        }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;
