import {useRef, Suspense, useState, useEffect} from 'react';
import {Disclosure, Listbox} from '@headlessui/react';
import {defer, redirect, type LoaderArgs} from '@shopify/remix-oxygen';
import {useLoaderData, Await, Form} from '@remix-run/react';
import type {ShopifyAnalyticsProduct, Image} from '@shopify/hydrogen';
import {
  AnalyticsPageType,
  Money,
  VariantSelector,
  getSelectedProductOptions,
} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';
import clsx from 'clsx';

import type {
  ProductQuery,
  ProductVariantFragmentFragment,
} from 'storefrontapi.generated';
import {
  Heading,
  IconCaret,
  IconCheck,
  IconClose,
  Text,
  Link,
  AddToCartButton,
  Button,
} from '~/components';
import {seoPayload} from '~/lib/seo.server';
import type {Storefront} from '~/lib/type';
import {routeHeaders} from '~/data/cache';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {huupes} from '~/data/huupes';

import subscription from '../images/products/subscription.webp';
import thumbsUp from '../images/products/thumbsUp.webp';
import premium from '../images/products/premium.webp';

export const headers = routeHeaders;

export async function loader({params, request, context}: LoaderArgs) {
  const {productHandle} = params;
  invariant(productHandle, 'Missing productHandle param, check route filename');

  const selectedOptions = getSelectedProductOptions(request);

  const {shop, product} = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle: productHandle,
      selectedOptions,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });

  // In order to show which variants are available in the UI, we need to query
  // all of them. But there might be a *lot*, so instead separate the variants
  // into it's own separate query that is deferred. So there's a brief moment
  // where variant options might show as available when they're not, but after
  // this deferred query resolves, the UI will update.
  const variants = context.storefront.query(VARIANTS_QUERY, {
    variables: {
      handle: productHandle,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });

  if (!product?.id) {
    throw new Response('product', {status: 404});
  }

  if (!product.selectedVariant) {
    return redirectToFirstVariant({product, request});
  }

  const recommended = getRecommendedProducts(context.storefront, product.id);
  const firstVariant = product.variants.nodes[0];
  const selectedVariant = product.selectedVariant ?? firstVariant;
  const isOutOfStock = !selectedVariant?.availableForSale;

  const productAnalytics: ShopifyAnalyticsProduct = {
    productGid: product.id,
    variantGid: selectedVariant.id,
    name: product.title,
    variantName: selectedVariant.title,
    brand: product.vendor,
    price: selectedVariant.price.amount,
  };

  const seo = seoPayload.product({
    product,
    selectedVariant,
    url: request.url,
  });

  return defer({
    variants,
    product,
    shop,
    storeDomain: shop.primaryDomain.url,
    recommended,
    analytics: {
      pageType: AnalyticsPageType.product,
      resourceId: product.id,
      products: [productAnalytics],
      totalValue: parseFloat(selectedVariant.price.amount),
    },
    seo,
  });
}

function redirectToFirstVariant({
  product,
  request,
}: {
  product: ProductQuery['product'];
  request: Request;
}) {
  const searchParams = new URLSearchParams(new URL(request.url).search);
  const firstVariant = product!.variants.nodes[0];
  for (const option of firstVariant.selectedOptions) {
    searchParams.set(option.name, option.value);
  }

  throw redirect(
    `/products/${product!.handle}?${searchParams.toString()}`,
    302,
  );
}

export default function Product() {
  const {product, shop, recommended, variants} = useLoaderData<typeof loader>();
  const {media, title, vendor, descriptionHtml} = product;
  const {shippingPolicy, refundPolicy} = shop;
  const [quantity, setQuantity] = useState(1);
  const [huupeVariants, setHuupeVariants] = useState();
  const productSpecs = huupes.find((huupe) => huupe.product === product.handle);

  const selectedVariant = product.selectedVariant!;
  // const isOutOfStock = !selectedVariant?.availableForSale;
  const isOutOfStock = true;
  // const huupeImages = media.nodes.splice(2, media.nodes.length);

  const isOnSale =
    selectedVariant?.price?.amount &&
    selectedVariant?.compareAtPrice?.amount &&
    selectedVariant?.price?.amount < selectedVariant?.compareAtPrice?.amount;

  const [displayImage, setDisplayImage] = useState(null);
  const [huupeImages, setHuupeImages] = useState();

  const [variantData, setVariantData] = useState(selectedVariant?.price!);
  const [monthlyData, setMonthlyData] = useState({
    amount: ((parseFloat(selectedVariant?.price?.amount) * quantity) / 12)
      .toFixed(2)
      .toString(),
    currencyCode: selectedVariant?.price?.currencyCode
      ? selectedVariant?.price?.currencyCode
      : 'USD',
  });

  const isPoleMounted = product.selectedVariant?.title
    .toLowerCase()
    .includes('pole');

  const iconBadges = [
    {
      title: 'Money Back Guarantee',
      icon: premium,
      iconHeight: '48',
      iconWidth: '48',
      altText: 'a screen with a play arrow icon',
    },
    {
      title: 'Satisfaction Guaranteed',
      icon: thumbsUp,
      iconHeight: '48',
      iconWidth: '48',
      altText: 'thumbs up icon',
    },
    {
      title: 'Free Video Training Updates',
      icon: subscription,
      iconHeight: '48',
      iconWidth: '48',
      altText: 'ribbon with a dark star in the center icon',
    },
  ];

  useEffect(() => {
    media.nodes.map((mediaImage, index) => {
      if (
        index === (isPoleMounted ? 0 : 3) &&
        mediaImage.__typename === 'MediaImage'
      ) {
        const image =
          mediaImage.__typename === 'MediaImage'
            ? {...mediaImage.image, altText: mediaImage.alt || 'Product image'}
            : null;
        setDisplayImage(image);
      }
    });
  }, [media]);

  useEffect(() => {
    if (media.nodes.length > 0) {
      setHuupeImages(media.nodes);
    }
  }, [media.nodes, media.nodes.length]);

  const adjustQuantityPrice = (qty) => {
    setQuantity(qty);
    setVariantData({
      amount: (parseFloat(selectedVariant?.price?.amount) * qty).toString(),
      currencyCode: selectedVariant?.price?.currencyCode
        ? selectedVariant?.price?.currencyCode
        : 'USD',
    });

    setMonthlyData({
      amount: ((parseFloat(selectedVariant?.price?.amount) * qty) / 12)
        .toFixed(2)
        .toString(),
      currencyCode: selectedVariant?.price?.currencyCode
        ? selectedVariant?.price?.currencyCode
        : 'USD',
    });
  };

  const handleIconClick = (selectedImage) => {
    const image = {
      ...selectedImage.image,
      altText: selectedImage.alt || 'Product image',
    };
    setDisplayImage(image);
  };

  useEffect(() => {
    const getVariants = async () => {
      const myVariants = await variants;
      setHuupeVariants(myVariants.product?.variants);
    };
    getVariants();
  }, [variants]);

  const form = useRef();

  useEffect(() => {
    var _learnq = _learnq || [];

    _learnq.push(['openForm', 'VjN4UC']);
  }, []);

  return (
    <>
      <section className="flex flex-col lg:flex-row bg-gradient-to-b lg:bg-gradient-to-r bg-white lg:h-screen">
        <div className="w-full lg:w-7/12 basis-full lg:basis-7/12 relative flex flex-col justify-between h-screen">
          <div className="!mt-[100px] h-[calc(100vh-316px)] flex">
            {displayImage && (
              <img
                src={displayImage?.url}
                alt={
                  displayImage?.altText ||
                  'huupe backboard facing frontwards with the screen turned on with a mixture of bright color'
                }
                height={displayImage?.height}
                width={displayImage?.width}
                className={`w-full h-[calc(100vh-338px)] md:h-auto max-h-[calc(100vh-316px)] object-contain lg:max-w-[700px] 2xl:max-w-[700px] mx-auto`}
              />
            )}
          </div>

          <div className="relative flex flex-col w-full px-6 lg:pl-24 lg:pr-[50px] py-6 bg-white justify-between">
            <div className="w-full overflow-scroll">
              <div className="flex flex-row w-fit overflow-scroll mb-6">
                {huupeImages
                  ? huupeImages?.map((huupe) => (
                      <div
                        key={huupe.image.url}
                        onClick={() => handleIconClick(huupe)}
                        className={`h-24 w-24 ${
                          displayImage.url === huupe.image.url
                            ? ' border-[#0071E3] border-4 p-0 '
                            : ' border-black border-[1px] p-[3px] '
                        } ${
                          displayImage.url !== huupe.image.url &&
                          'hover:border-[#71b6fa] focus:border-[#71b6fa] hover:border-4 focus:border-4 focus:p-0 hover:p-0 '
                        } object-contain mr-4 bg-white rounded-[10px] flex justify-center items-center`}
                      >
                        <img
                          src={huupe.image.url}
                          alt={huupe.alt}
                          height={huupe.image.height}
                          width={huupe.image.width}
                          className=""
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div className="flex flex-row justify-between">
              {iconBadges.map((badge, index) => (
                <div
                  key={index}
                  className={`${
                    iconBadges.length - 1 === index ? '' : 'pr-[22px] '
                  }flex flex-col md:flex-row items-center`}
                >
                  <img
                    src={badge.icon}
                    alt={badge.title}
                    height={badge.iconHeight}
                    width={badge.iconWidth}
                    loading="lazy"
                    className="max-w-[30px] lg:max-w-[36px] xl:max-w-none object-contain"
                  />
                  <p className="ml-[4px] text-[#1a1a1a] text-center md:text-left">
                    {badge.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-5/12 basis-full lg:basis-5/12 flex flex-col bg-white lg:h-screen">
          <div className="pr-6 2xl:pr-24 pt-[30px] pb-[24px] pl-6 2xl:pl-[112px]">
            <p className="text-[#1a1a1a] text-[14px] mb-[30px] leading-[22px]">
              Pick your huupe.
            </p>
            <div className="flex rounded-[10px] border-[1px] border-[#000000] bg-white py-[14px] px-[19px] lg:p-[25px]">
              {huupeImages && (
                <img
                  src={huupeImages[4].image.url}
                  alt={huupeImages[4].altText}
                  height={huupeImages[4].image.height}
                  width={huupeImages[4].image.width}
                  loading="lazy"
                  className="hidden md:block max-w-[79px] lg:max-w-[107px] max-h-[79px] lg:max-h-[107px] object-cover"
                />
              )}
              <div className="pl-0 md:pl-[15px] lg:pl-[30px]">
                <h1 className="font-[Radikal] text-[24px] xl:text-[34px] font-[900] leading-[34px] text-[#000000] mb-[7px] lg:mb-[12px]">
                  {title}
                </h1>
                <div className="group">
                  <p className="underline text-[#8E8E8E] font-[14px] font-[General Sans] leading-[22px] cursor-pointer">
                    View huupe Specs
                  </p>
                  <div className="absolute hidden group-hover:flex flex-col left-0 mx-6 w-[calc(100vw-48px)] lg:w-[calc(41.6667%-48px)] 2xl:w-[calc(41.6667%-208px)] lg:left-auto lg:right-0 lg:mr-6 2xl:mr-[96px] rounded-[10px] border-[1px] border-[#000000] bg-white p-4 cursor-default z-50">
                    {productSpecs?.data.map((spec, index) => (
                      <div key={spec.name}>
                        <h3
                          className={`${
                            index !== 0 ? 'mt-4 ' : ''
                          } font-black text-[12px] leading-[120%]`}
                        >
                          {spec.name}
                        </h3>
                        <table className="table text-[12px] leading-[120%]">
                          <tbody>
                            {spec.details.map((item, i) => (
                              <tr className="pb-2" key={item.title}>
                                <td className="w-[60px] pr-6">{item.title}</td>
                                <td>{item.content}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="md:hidden">
                  <div className="flex quantitySelector items-center mt-[12px]">
                    <p className="text-[#000000] !mb-[0px] mr-[10px]">
                      Quantity:
                    </p>
                    <div className="flex items-center">
                      <span
                        className="cursor-pointer w-[20px] text-center"
                        onClick={() =>
                          adjustQuantityPrice(quantity > 1 ? quantity - 1 : 1)
                        }
                      >
                        -
                      </span>
                      <span className="w-[20px] text-center">{quantity}</span>
                      <span
                        className="cursor-pointer w-[20px] text-center"
                        onClick={() => adjustQuantityPrice(quantity + 1)}
                      >
                        +
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col pl-[10px] lg:pl-[0px] ml-auto">
                <Money
                  withoutTrailingZeros
                  data={variantData}
                  as="h2"
                  className="font-[Radikal] text-[24px] xl:text-[34px] font-[900] leading-[34px] text-[#000000] text-right"
                />
                <p className="text-[#1a1a1a] text-[14px] mb-[30px] leading-[22px] text-right">
                  Down Payment
                </p>

                <div className="hidden md:flex quantitySelector  items-center mt-auto">
                  <p className="text-[#000000] !mb-[0px] mr-[10px]">
                    Quantity:
                  </p>
                  <div className="flex items-center">
                    <span
                      className="cursor-pointer w-[20px] text-center"
                      onClick={() =>
                        adjustQuantityPrice(quantity > 1 ? quantity - 1 : 1)
                      }
                    >
                      -
                    </span>
                    <span className="w-[20px] text-center">{quantity}</span>
                    <span
                      className="cursor-pointer w-[20px] text-center"
                      onClick={() => adjustQuantityPrice(quantity + 1)}
                    >
                      +
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pr-6 2xl:pr-24 pl-6 2xl:pl-[112px] lg:overflow-y-auto">
            {huupeVariants && (
              <VariantSelector
                handle={product.handle}
                options={product.options}
                variants={huupeVariants}
              >
                {({option}) => {
                  return (
                    <div
                      key={option.name}
                      className="flex flex-col flex-wrap mb-4"
                    >
                      <p className="min-w-[4rem]">{option.name}</p>
                      <div className="flex flex-wrap flex-col items-baseline gap-4">
                        {option.values.map(
                          ({value, isAvailable, isActive, to}) => {
                            const huupeInfo = huupeVariants?.nodes.find(
                              (node) => node.title === value,
                            );
                            return (
                              <Link
                                key={option.name + value}
                                to={to}
                                preventScrollReset
                                prefetch="intent"
                                replace
                                className={
                                  'leading-none py-1 cursor-pointer transition-all duration-200 w-full'
                                }
                              >
                                <div
                                  className={`flex rounded-[10px] bg-white ${
                                    isActive
                                      ? 'border-4 border-[#0071E3] py-[11px] px-[16px]'
                                      : 'border-[1px] border-[#000000] py-[14px] px-[19px] '
                                  }
                                  ${
                                    !isActive &&
                                    ' focus:border-4 focus:border-[#71b6fa] focus:py-[11px] focus:px-[16px] hover:border-4 hover:border-[#71b6fa] hover:py-[11px] hover:px-[16px] '
                                  }
                                  `}
                                >
                                  <img
                                    src={huupeInfo.image.url}
                                    alt={
                                      huupeInfo.image.altText ?? 'product image'
                                    }
                                    height={huupeInfo.image.height}
                                    width={huupeInfo.image.width}
                                    loading="lazy"
                                    className="max-w-[60px] max-h-[60px] object-cover"
                                  />
                                  <div className="pl-0 md:pl-[15px] lg:pl-[30px] flex items-center">
                                    <h2 className="font-[Radikal] !text-[16px] sm:!text-[20px] !font-[400] leading-[20px] text-[#000000]">
                                      {value}
                                    </h2>
                                  </div>
                                </div>
                              </Link>
                            );
                          },
                        )}
                      </div>
                    </div>
                  );
                }}
              </VariantSelector>
            )}
            <p className="text-[#1a1a1a] text-center text-[11px] mb-4 leading-[120%]">
              For all inquiries, please reach out to media@huupe.com
            </p>
          </div>

          <div className="lg:mt-auto bg-white sticky bottom-0 right-0">
            <div className="flex justify-between pr-6 2xl:pr-24 pl-6 2xl:pl-[112px] pt-[21px]">
              <p className="font-[400] text-[19px] lg:text-[24px] leading-[34px] text-[#000000] !mb-0">
                <span className="lg:hidden">Sub-</span>Total
              </p>
              <div className="flex flex-col">
                <p className="font-[400] text-[19px] lg:text-[24px] leading-[34px] text-[#000000] !mb-0 text-right">
                  <Money
                    withoutTrailingZeros
                    data={variantData}
                    as="span"
                    className="font-[700]"
                  />
                </p>
                <p className="text-[#1a1a1a] font-[14px] mb-[30px] leading-[22px] text-right">
                  Down Payment
                </p>
              </div>
            </div>
            <div className="pb-[29px] flex justify-end items-center pr-6 2xl:pr-24 pl-6 2xl:pl-[112px]">
              <Suspense fallback={<ProductForm variants={[]} />}>
                <Await
                  errorElement="There was a problem loading related products"
                  resolve={variants}
                >
                  {(resp) => (
                    <>
                      <ProductForm
                        variants={resp.product?.variants.nodes || []}
                        quantity={quantity}
                      />
                    </>
                  )}
                </Await>
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function ProductForm({
  variants,
  quantity,
}: {
  variants: ProductVariantFragmentFragment[];
  quantity: number;
}) {
  const {product, analytics, storeDomain} = useLoaderData<typeof loader>();

  const closeRef = useRef<HTMLButtonElement>(null);

  /**
   * Likewise, we're defaulting to the first variant for purposes
   * of add to cart if there is none returned from the loader.
   * A developer can opt out of this, too.
   */
  const selectedVariant = product.selectedVariant!;
  const isOutOfStock = !selectedVariant?.availableForSale;

  const isOnSale =
    selectedVariant?.price?.amount &&
    selectedVariant?.compareAtPrice?.amount &&
    selectedVariant?.price?.amount < selectedVariant?.compareAtPrice?.amount;

  const productAnalytics: ShopifyAnalyticsProduct = {
    ...analytics.products[0],
    quantity,
  };

  return (
    <div className="grid gap-10">
      <div className="grid gap-4">
        {selectedVariant && (
          <div className="grid items-stretch gap-4">
            {isOutOfStock ? (
              <Button variant="secondary" disabled>
                <Text>Sold out</Text>
              </Button>
            ) : (
              <AddToCartButton
                lines={[
                  {
                    merchandiseId: selectedVariant.id!,
                    quantity,
                  },
                ]}
                variant="primary"
                data-test="add-to-cart"
                className="main-button"
                analytics={{
                  products: [productAnalytics],
                  totalValue: parseFloat(productAnalytics.price) * quantity,
                }}
              >
                Next
              </AddToCartButton>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductDetail({
  title,
  content,
  learnMore,
}: {
  title: string;
  content: string;
  learnMore?: string;
}) {
  return (
    <Disclosure key={title} as="div" className="grid w-full gap-2">
      {({open}) => (
        <>
          <Disclosure.Button className="text-left">
            <div className="flex justify-between">
              <Text size="lead" as="h4">
                {title}
              </Text>
              <IconClose
                className={clsx(
                  'transition-transform transform-gpu duration-200',
                  !open && 'rotate-[45deg]',
                )}
              />
            </div>
          </Disclosure.Button>

          <Disclosure.Panel className={'pb-4 pt-2 grid gap-2'}>
            <div
              className="prose dark:prose-invert"
              dangerouslySetInnerHTML={{__html: content}}
            />
            {learnMore && (
              <div className="">
                <Link
                  className="pb-px border-b border-primary/30 text-primary/50"
                  to={learnMore}
                >
                  Learn more
                </Link>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariantFragment on ProductVariant {
    id
    availableForSale
    selectedOptions {
      name
      value
    }
    image {
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    compareAtPrice {
      amount
      currencyCode
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
  }
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      vendor
      handle
      descriptionHtml
      description
      options {
        name
        values
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
        ...ProductVariantFragment
      }
      media(first: 9) {
        nodes {
          ...Media
        }
      }
      variants(first: 1) {
        nodes {
          ...ProductVariantFragment
        }
      }
      seo {
        description
        title
      }
    }
    shop {
      name
      primaryDomain {
        url
      }
      shippingPolicy {
        body
        handle
      }
      refundPolicy {
        body
        handle
      }
    }
  }
  ${MEDIA_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const VARIANTS_QUERY = `#graphql
  query variants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      variants(first: 250) {
        nodes {
          ...ProductVariantFragment
        }
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  query productRecommendations(
    $productId: ID!
    $count: Int
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    recommended: productRecommendations(productId: $productId) {
      ...ProductCard
    }
    additional: products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;

async function getRecommendedProducts(
  storefront: Storefront,
  productId: string,
) {
  const products = await storefront.query(RECOMMENDED_PRODUCTS_QUERY, {
    variables: {productId, count: 12},
  });

  invariant(products, 'No data returned from Shopify API');

  const mergedProducts = (products.recommended ?? [])
    .concat(products.additional.nodes)
    .filter(
      (value, index, array) =>
        array.findIndex((value2) => value2.id === value.id) === index,
    );

  const originalProduct = mergedProducts.findIndex(
    (item) => item.id === productId,
  );

  mergedProducts.splice(originalProduct, 1);

  return {nodes: mergedProducts};
}