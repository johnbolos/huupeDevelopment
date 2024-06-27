import { json, type LoaderArgs } from '@shopify/remix-oxygen';
import { useLoaderData } from '@remix-run/react';
import { flattenConnection } from '@shopify/hydrogen';
import { seoPayload } from '~/lib/seo.server';
import { routeHeaders } from '~/data/cache';
import { Link } from '~/components';


const BLOG_HANDLE = 'huupe-blog';

export const headers = routeHeaders;

export async function loader({context: {storefront}}: LoaderArgs) {
    return json(await getBlogList(storefront));
}

export async function getBlogList(
    storefront: LoaderArgs['context']['storefront'],
    variables: {pageBy?: number} = {},
  ) {
    const { language, country } = storefront.i18n;
    const { blog } = await storefront.query(BLOGS_QUERY, {
      variables: {
        blogHandle: BLOG_HANDLE,
        pageBy: 7,
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

    return articles;
}
    

export type BlogList = Awaited<ReturnType<typeof getBlogList>>;

// export function BlogList() {
//     const { articles } = useLoaderData<typeof loader>();

//     return (
//         <>
//             <div className="gap-y-[23px] flex flex-col">
//                 {articles?.map((article, index) => (
//                     <div className="relative rounded-[20px] lg:rounded-[10px]" key={index}>
//                         <Link to={`/blogs/${article.handle}`}>
//                             <ImageCard title={article.title} image={article?.image?.url || ''} />
//                         </Link>
//                     </div>
//                 ))}
//             </div>
//         </>
//     )
// }

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
        <p className={`font-bold bottom-[20px] left-[20px] text-[34px] leading-[1em] max-w-[63.95vw] xl:text-[2.23vw] xl:leading-[1em] absolute xl:bottom-[40px] xl:left-[40px] xl:max-w-[24vw] w-full text-white uppercase`}
        >{title}</p>
        : <p className={`font-bold bottom-[20px] left-[20px] text-[34px] leading-[1em] max-w-[63.95vw] xl:text-[3.476vw] xl:leading-[.975em] absolute xl:bottom-[70px] xl:left-[70px] xl:max-w-[33.39vw] w-full text-white uppercase`}
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
