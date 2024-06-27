import { defer, json, type LinksFunction, type LoaderArgs } from '@shopify/remix-oxygen';
import { useLoaderData, useFetcher } from '@remix-run/react';
import { Image } from '@shopify/hydrogen';
import invariant from 'tiny-invariant';
import { flattenConnection } from '@shopify/hydrogen';
import { PageHeader, Section, Link } from '~/components';
import { seoPayload } from '~/lib/seo.server';
import { routeHeaders } from '~/data/cache';
import {usePrefixPathWithLocale} from '~/lib/utils';
import React, {Suspense, useState, useEffect} from 'react';
import type {BlogList} from '~/routes/($locale).blog-list-fetch';

import styles from '../styles/custom-font.css';

const BLOG_HANDLE = 'huupe-blog';

export const headers = routeHeaders;

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export async function loader({ request, params, context }: LoaderArgs) {
  const { language, country } = context.storefront.i18n;

  invariant(params.blogHandle, 'Missing journal handle');

  const { blog } = await context.storefront.query(ARTICLE_QUERY, {
    variables: {
      blogHandle: BLOG_HANDLE,
      articleHandle: params.blogHandle,
      language,
    },
  });


  if (!blog?.articleByHandle) {
    throw new Response(null, { status: 404 });
  }

  const article = blog.articleByHandle;

  const formattedDate = new Intl.DateTimeFormat(`${language}-${country}`, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article?.publishedAt!));

  const seo = seoPayload.article({ article, url: request.url });


  return json({ article, formattedDate, seo });
}

export default function Article() {
  const { article, formattedDate } = useLoaderData<typeof loader>();
  const { title, image, contentHtml, author } = article;

  const {load, data} = useFetcher<BlogList>();
  const path = usePrefixPathWithLocale('/blog-list-fetch');

  useEffect(() => {
    load(path);
  }, [load, path]);

  const blogs = data

  return (
    <>
      <section className="px-6 pt-[100px] lg:pt-[175px] lg:px-24 bg-[#ffffff]">
        <div className="flex gap-x-[92px] flex-wrap lg:flex-nowrap">
          <div className="w-full h-full basis-full lg:w-9/12 lg:basis-9/12">
            <img src={image?.url} alt={image?.altText || ''} className="object-cover w-full h-full max-h-[500px] lg:max-h-[758px] rounded-[20px] lg:rounded-[10px]" />
            <h1 className="mt-[40px] text-heading">{ title }</h1>
            <div
              dangerouslySetInnerHTML={{ __html: contentHtml }}
              className=""
            />
          </div>
          <div className="w-full basis-full lg:w-3/12 lg:basis-3/12 pt-[50px] lg:pt-0">
            <p className="text-[22px] text-[#000000] leading-[22px] !mb-[30px]">Recommended Blog Posts</p>
            <div className="gap-0 lg:gap-y-[23px] flex flex-row flex-wrap lg:flex-nowrap lg:flex-col -mx-[10px] lg:mx-0">
              {blogs?.map((article, index) => (
                  <div className="px-[10px] lg:px-0 pb-[20px] lg:pb-0 relative rounded-[20px] lg:rounded-[10px] w-full md:w-6/12 lg:w-full basis-full md:basis-6/12 lg:basis-full" key={index}>
                      <Link to={`/blogs/${article.handle}`}>
                          <ImageCard title={article.title} image={article?.image?.url || ''} />
                      </Link>
                  </div>
              ))}
          </div>
          </div>
        </div>
      </section>

      {/* <div className='mt-[100px]'>
        <PageHeader heading={title} variant="blogPost">
          <span>
            {formattedDate} &middot; {author?.name}
          </span>
        </PageHeader>
        <Section as="article" padding="x">
          {image && (
            <Image
              data={image}
              className="w-full mx-auto mt-8 md:mt-16 max-w-7xl"
              sizes="90vw"
              loading="eager"
            />
          )}
          <div
            dangerouslySetInnerHTML={{ __html: contentHtml }}
            className="article [&>*]:!text-black !text-black"
          />
        </Section>
      </div> */}
    </>
  );
}

interface ImageCardProps {
  title?: string
  image?: string
  smallCard?: boolean
}

const ImageCard = ({ title, image, smallCard }: ImageCardProps) => {
  return (
      <div className="flex relative w-full h-full bg-center bg-no-repeat bg-cover aspect-auto rounded-[10px] pb-[55.5%]" style={{
      backgroundImage: `url(${image})`, background: `${!image && '#00B8F2'}`
      }}>
      <div className="overlay bg-black opacity-10 absolute w-full h-full rounded-[10px]"></div>
      {smallCard ?
          <p className={`font-bold bottom-[20px] left-[20px] text-[34px] leading-[1em] max-w-[63.95vw] xl:text-[2.23vw] xl:leading-[1em] absolute xl:bottom-[40px] xl:left-[40px] xl:max-w-[24vw] w-full text-white uppercase`}
          >{title}</p>
          : <p className={`p-[31px] font-bold bottom-0 left-0 text-[20px] lg:text-[34px] leading-[1em] xl:text-[30px] xl:leading-[110%] absolute w-full text-white uppercase`}
          >{title}</p>
      }
      </div>
  )
}

const ARTICLE_QUERY = `#graphql
  query ArticleDetails(
    $language: LanguageCode
    $blogHandle: String!
    $articleHandle: String!
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        title
        contentHtml
        publishedAt
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
        seo {
          description
          title
        }
      }
    }
  }
`;


const BLOGS_QUERY = `#graphql
query Blog(
  $language: LanguageCode
  $blogHandle: String!
  $pageBy: Int!
  $cursor: String
) @inContext(language: $language) {
  blog(handle: $blogHandle) {
    title
    seo {
      title
      description
    }
    articles(first: $pageBy, after: $cursor) {
      edges {
        node {
          ...Article
        }
      }
    }
  }
}

fragment Article on Article {
  author: authorV2 {
    name
  }
  contentHtml
  handle
  id
  image {
    id
    altText
    url
    width
    height
  }
  publishedAt
  title
}
`;
