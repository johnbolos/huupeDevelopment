import {json, defer, type LoaderArgs} from '@shopify/remix-oxygen';
import {Suspense, useState, useEffect} from 'react';
import {Await, useLoaderData} from '@remix-run/react';
import {AnalyticsPageType} from '@shopify/hydrogen';

import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import LazyLoad from 'react-lazy-load';

export const headers = routeHeaders;

export async function loader({request, params, context}: LoaderArgs) {
  const {page} = await context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: 'installation',
      language: context.storefront.i18n.language,
    },
  });

  if (!page) {
    throw new Response(null, {status: 404});
  }

  const seo = seoPayload.page({page, url: request.url});

  return json({page, seo});
}

export default function Installation() {
  const {page} = useLoaderData<typeof loader>();

  const [mobile, setMobile] = useState(false);

  function handleWindowSizeChange() {
    if (window.innerWidth < 768) {
      setMobile(true);
    } else {
      setMobile(false);
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
      <section className="px-6 pt-[98px] lg:pt-[146px] lg:px-24 bg-[#ffffff]">
        <div className="relative">
          {/* <img src={homepagebanner} /> */}
          <LazyLoad>
            <div className="relative pb-[56.3%]">
              <iframe
                className="h-full w-full absolute top-0 left-0 rounded-[20px] lg:rounded[10px]"
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/ozVW3sZ96J0?controls=1&mute=1&autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </LazyLoad>
        </div>
      </section>

      <section className="py-8 lg:py-24 px-6 lg:px-24 bg-[#ffffff]">
        <div className="flex justify-between flex-col lg:flex-row">
          <h1 className="text-heading">WE DO THE HEAVY LIFTING</h1>
          <p className="lg:max-w-[372px] ml-auto mt-[24px] lg:mt-0">
            Our team will deliver and set up your huupe for you so there's one
            less step between you and your first dunk.
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-24 bg-[#ffffff]">
        <div className="relative">
          <LazyLoad>
            <div className="relative pb-[56.3%]">
              <iframe
                className="h-full w-full absolute top-0 left-0 rounded-[20px] lg:rounded[10px]"
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/mm3Db3LMcdI?controls=1&mute=1&autoplay=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </LazyLoad>
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
