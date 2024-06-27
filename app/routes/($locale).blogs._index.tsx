import { json, type LoaderArgs } from '@shopify/remix-oxygen';
import { useFetcher, useLoaderData, useSearchParams } from '@remix-run/react';
import { flattenConnection } from '@shopify/hydrogen';
import { seoPayload } from '~/lib/seo.server';
import { routeHeaders } from '~/data/cache';
import { Link } from '~/components';
import { useEffect, useState } from 'react';


const BLOG_HANDLE = 'huupe-blog';

export const headers = routeHeaders;

export const loader = async ({ request, context: { storefront } }: LoaderArgs) => {
  const { language, country } = storefront.i18n;
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  const { blog } = await storefront.query(BLOGS_QUERY, {
    variables: {
      blogHandle: BLOG_HANDLE,
      pageBy: Number(page) * 10 || 10,
      language,
    },
  });

  if (!blog?.articles) {
    throw new Response('Not found', { status: 404 });
  }

  const articles = flattenConnection(blog.articles).map((article) => {
    const { publishedAt } = article!;
    return {
      ...article,
      publishedAt: new Intl.DateTimeFormat(`${language}-${country}`, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(publishedAt!)),
    };
  });

  const seo = seoPayload.blog({ blog, url: request.url });

  return json({ articles, seo });
};
export default function Blog() {
  const { articles } = useLoaderData<typeof loader>();
  const [articleItems, setArticleItems] = useState(articles)
  let [searchParams, setSearchParams] = useSearchParams();
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState<boolean>(true);

  const fetcher = useFetcher();

  const handleLoadMore = () => {
    const getPage = Number(searchParams.get("page")) || 1
  
    fetcher.load(`?&page=${getPage + 1}`);
  }

  useEffect(() => {
    if (!fetcher.data || fetcher.state === "loading") {
      return;
    }
    if (fetcher.data) {
      const newItems = fetcher.data.articles;
      setArticleItems((prevAssets) => [...prevAssets, ...newItems]);
      if (newItems.length < Math.ceil(newItems?.length / 10) * 10) {
        setShowLoadMoreBtn(false)
      }
    }
  }, [fetcher.data]);
  return (
    <section className="blog-container px-[36px] pt-[150px] xl:px-[10.82vw] xl:pt-[252px] xl:mx-0 bg-white">
      <h1 className="font-bold text-[50px] leading-[1em] xl:text-[3.48vw] xl:leading-[3.39vw] xl:mb-[6.437vw]" style={{ fontFamily: 'General Sans' }}>THE HUUPE BLOG</h1>

      {articleItems.length &&
        <div className="flex flex-col mt-[70px] gap-[30px]">

          <div className='flex flex-col xl:flex-row gap-[30px] relative w-full h-full'>
            <div className="image-container rounded-[10px] w-full h-[50vw] xl:max-w-[50.5vw] xl:h-[38.112vw] relative">
              <Link to={`/blogs/${articleItems[0]?.handle}`}>
                <ImageCard title={articleItems[0]?.title} image={articleItems[0]?.image?.url || ''} />
              </Link>
            </div>
            <div className="flex flex-col relative w-full h-full gap-[30px] xl:max-w-[30.556vw]">
              <div className="image-container rounded-[10px] w-full h-[50vw] xl:h-[18.412vw] relative">
                <Link to={`/blogs/${articleItems[1]?.handle}`}>
                  <ImageCard title={articleItems[1]?.title} image={articleItems[1]?.image?.url || ''} smallCard />
                </Link>
              </div>
              <div className="image-container rounded-[10px] w-full h-[50vw] xl:h-[18.412vw] relative">
                <Link to={`/blogs/${articleItems[2]?.handle}`}>
                  <ImageCard title={articleItems[2]?.title} image={articleItems[2]?.image?.url || ''} smallCard />
                </Link>
              </div>
            </div>
          </div>
          <div className='flex flex-col xl:flex-row gap-[30px] relative w-full h-full'>
            <div className="flex flex-col relative w-full h-full gap-[30px] xl:max-w-[30.556vw]">
              <div className="image-container rounded-[10px] w-full h-[50vw] xl:h-[18.412vw] relative">
                <Link to={`/blogs/${articleItems[3]?.handle}`}>

                  <ImageCard title={articleItems[3]?.title} image={articleItems[3]?.image?.url || ''} smallCard />
                </Link>
              </div>
              <div className="image-container rounded-[10px] w-full h-[50vw] xl:h-[18.412vw] relative">
                <Link to={`/blogs/${articleItems[4]?.handle}`}>
                  <ImageCard title={articleItems[4]?.title} image={articleItems[4]?.image?.url || ''} smallCard />
                </Link>
              </div>
            </div>
            <div className="flex flex-col relative w-full h-full gap-[30px]">
              <div className="image-container rounded-[10px] w-full h-[50vw] xl:h-[18.412vw] relative">
                <Link to={`/blogs/${articleItems[5]?.handle}`}>
                  <ImageCard title={articleItems[5]?.title} image={articleItems[5]?.image?.url || ''} smallCard />
                </Link>
              </div>
              <div className="image-container rounded-[10px] w-full h-[50vw] xl:h-[18.412vw] relative">
                <Link to={`/blogs/${articleItems[6]?.handle}`}>
                  <ImageCard title={articleItems[6]?.title} image={articleItems[6]?.image?.url || ''} smallCard />
                </Link>
              </div>
            </div>
          </div>
          <div className='flex flex-col xl:flex-row gap-[30px] relative w-full h-full'>
            <div className="image-container rounded-[10px] w-full h-[50vw] xl:max-w-[50.5vw] xl:h-[38.112vw] relative">
              <Link to={`/blogs/${articleItems[7]?.handle}`}>
                <ImageCard title={articleItems[7]?.title} image={articleItems[7]?.image?.url || ''} />
              </Link>
            </div>
            <div className="flex flex-col relative w-full h-full gap-[30px] xl:max-w-[30.556vw]">
              <div className="image-container rounded-[10px] w-full h-[50vw] xl:h-[18.412vw] relative">
                <Link to={`/blogs/${articleItems[8]?.handle}`}>
                  <ImageCard title={articleItems[8]?.title} image={articleItems[8]?.image?.url || ''} smallCard />
                </Link>
              </div>
              <div className="image-container rounded-[10px] w-full h-[50vw] xl:h-[18.412vw] relative">
                <Link to={`/blogs/${articleItems[9]?.handle}`}>
                  <ImageCard title={articleItems[9]?.title} image={articleItems[9]?.image?.url || ''} smallCard />
                </Link>
              </div>
            </div>
          </div>
        </div>
      }
      {articleItems.length > 19 &&
        <div className="flex flex-col mt-[30px] gap-[30px]">
          {articleItems[20 + 0] && <div className='flex flex-col xl:flex-row gap-[30px] relative w-full h-full'>
            <div className="image-container rounded-[10px] w-full h-[50vw] xl:max-w-[50.5vw] xl:h-[38.112vw] relative">
              {articleItems[20 + 0] && <Link to={`/blogs/${articleItems[20 + 0]?.handle}`}>
                <ImageCard title={articleItems[20 + 0]?.title} image={articleItems[20 + 0]?.image?.url || ''} />
              </Link>}
            </div>
            <div className="flex flex-col relative w-full h-full gap-[30px] xl:max-w-[30.556vw]">
              <div className="image-container rounded-[10px] w-full h-[50vw] xl:h-[18.412vw] relative">
                {articleItems[20 + 1] && <Link to={`/blogs/${articleItems[20 + 1]?.handle}`}>
                  <ImageCard title={articleItems[20 + 1]?.title} image={articleItems[20 + 1]?.image?.url || ''} smallCard />
                </Link>}
              </div>
              <div className="image-container rounded-[10px] w-full h-[50vw] xl:h-[18.412vw] relative">
                {articleItems[20 + 2] && <Link to={`/blogs/${articleItems[20 + 2]?.handle}`}>
                  <ImageCard title={articleItems[20 + 2]?.title} image={articleItems[20 + 2]?.image?.url || ''} smallCard />
                </Link>}
              </div>
            </div>
          </div>}
          {articleItems[20 + 3] && <div className='flex flex-col xl:flex-row gap-[30px] relative w-full h-full'>
            {articleItems[20 + 3] && <div className="flex flex-col relative w-full h-full gap-[30px] xl:max-w-[30.556vw]">
              <div className="image-container rounded-[10px] w-full h-[50vw] xl:h-[18.412vw] relative">
                {articleItems[20 + 3] && <Link to={`/blogs/${articleItems[20 + 3]?.handle}`}>
                  <ImageCard title={articleItems[20 + 3]?.title} image={articleItems[20 + 3]?.image?.url || ''} smallCard />
                </Link>}
              </div>
              <div className="image-container rounded-[10px] w-full h-[50vw] xl:h-[18.412vw] relative">
                {articleItems[20 + 4] && <Link to={`/blogs/${articleItems[20 + 4]?.handle}`}>
                  <ImageCard title={articleItems[20 + 4]?.title} image={articleItems[20 + 4]?.image?.url || ''} smallCard />
                </Link>}
              </div>
            </div>}
            {articleItems[20 + 5] && <div className="flex flex-col relative w-full h-full gap-[30px]">
              <div className="image-container rounded-[10px] w-full h-[50vw] xl:h-[18.412vw] relative">
                {articleItems[20 + 5] && <Link to={`/blogs/${articleItems[20 + 5]?.handle}`}>
                  <ImageCard title={articleItems[20 + 5]?.title} image={articleItems[20 + 5]?.image?.url || ''} smallCard />
                </Link>}
              </div>
              <div className="image-container rounded-[10px] w-full h-[50vw] xl:h-[18.412vw] relative">
                {articleItems[20 + 6] && <Link to={`/blogs/${articleItems[20 + 6]?.handle}`}>
                  <ImageCard title={articleItems[20 + 6]?.title} image={articleItems[20 + 6]?.image?.url || ''} smallCard />
                </Link>}
              </div>
            </div>}
          </div>}
          {articleItems[20 + 7] && <div className='flex flex-col xl:flex-row gap-[30px] relative w-full h-full'>
            <div className="image-container rounded-[10px] w-full h-[50vw] xl:max-w-[50.5vw] xl:h-[38.112vw] relative">
              {articleItems[20 + 7] && <Link to={`/blogs/${articleItems[20 + 7]?.handle}`}>
                <ImageCard title={articleItems[20 + 7]?.title} image={articleItems[20 + 7]?.image?.url || ''} />
              </Link>}
            </div>
            <div className="flex flex-col relative w-full h-full gap-[30px] xl:max-w-[30.556vw]">
              <div className="image-container rounded-[10px] w-full h-[50vw] xl:h-[18.412vw] relative">
                {articleItems[20 + 8] && <Link to={`/blogs/${articleItems[20 + 8]?.handle}`}>
                  <ImageCard title={articleItems[20 + 8]?.title} image={articleItems[20 + 8]?.image?.url || ''} smallCard />
                </Link>}
              </div>
              <div className="image-container rounded-[10px] w-full h-[50vw] xl:h-[18.412vw] relative">
                {articleItems[20 + 9] && <Link to={`/blogs/${articleItems[20 + 9]?.handle}`}>
                  <ImageCard title={articleItems[20 + 9]?.title} image={articleItems[20 + 9]?.image?.url || ''} smallCard />
                </Link>}
              </div>
            </div>
          </div>}
        </div>

      }
      {showLoadMoreBtn &&
        <button
          onClick={handleLoadMore}
          className="w-[148px] h-[59px] xl:w-[7.38vw] xl:h-[2.53vw] bg-black text-white rounded-[10px] mx-auto mt-[30px] flex justify-center items-center">Load more</button>
      }
    </section >
  )
};

interface ImageCardProps {
  title?: string
  image?: string
  smallCard?: boolean
}

const ImageCard = ({ title, image, smallCard }: ImageCardProps) => {
  return (
    <div className="flex relative w-full h-full bg-center bg-no-repeat bg-cover aspect-auto rounded-[10px]" style={{
      backgroundImage: `url(${image})`, background: `${!image && '#00B8F2'}`
    }}>
      <div className="overlay bg-black opacity-10 absolute w-full h-full rounded-[10px]"></div>
      {smallCard ?
        <p className={`font-bold bottom-[20px] left-[20px] text-[20px] leading-[1em] max-w-[63.95vw] xl:text-[2.23vw] xl:leading-[1em] absolute xl:bottom-[40px] xl:left-[40px] xl:max-w-[24vw] w-full text-white uppercase`}
        >{title}</p>
        : <p className={`font-bold bottom-[20px] left-[20px] text-[20px] leading-[1em] max-w-[63.95vw] xl:text-[3.476vw] xl:leading-[.975em] absolute xl:bottom-[70px] xl:left-[70px] xl:max-w-[33.39vw] w-full text-white uppercase`}
        >{title}</p>
      }
    </div>
  )
}


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
