import type {SeoHandleFunction} from '@shopify/hydrogen';
import {useLoaderData} from '@remix-run/react';
import {json, type LoaderArgs} from '@shopify/remix-oxygen';

import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';

export const headers = routeHeaders;

const seo: SeoHandleFunction<typeof loader> = ({data}) => ({
  title: 'huupe Email Confirmed',
});

export const handle = {
  seo,
};

export async function loader({request, params, context}: LoaderArgs) {
  const {page} = await context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: 'press',
      language: context.storefront.i18n.language,
    },
  });

  if (!page) {
    throw new Response(null, {status: 404});
  }

  const seo = seoPayload.page({page, url: request.url});

  return json({page, seo});
}

export default function PressPage() {
  const {page} = useLoaderData<typeof loader>();

  return (
    <section className="relative py-[98px] lg:py-28 mx-6 lg:mx-24 flex justify-center">
      <div className="flex flex-col gap-5 w-full max-w-[1920px]">
        <h1 className="!text-[36px] pt-10 text-heading">Email Confirmed</h1>
        <p>Your email has successfully been confirmed by huupe.</p>
      </div>
    </section>
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
