import React, {useRef, Suspense, useState, useEffect} from 'react';
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
  ProductGallery,
  ProductSwimlane,
  Section,
  Skeleton,
  Text,
  Link,
  AddToCartButton,
  Button,
} from '~/components';
import {getExcerpt} from '~/lib/utils';
import {seoPayload} from '~/lib/seo.server';
import type {Storefront} from '~/lib/type';
import {routeHeaders} from '~/data/cache';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
// import KlaviyoPublishProductView from '~/components/klaviyo/KlaviyoPublishProductView.client';

import productImage from '../images/products/productImage.webp';
import subscription from '../images/products/subscription.webp';
import thumbsUp from '../images/products/thumbsUp.webp';
import premium from '../images/products/premium.webp';
import comingSoon from '../images/comingSoon.webp';

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

  const selectedVariant = product.selectedVariant!;
  // const isOutOfStock = !selectedVariant?.availableForSale;
  const isOutOfStock = true;

  const isOnSale =
    selectedVariant?.price?.amount &&
    selectedVariant?.compareAtPrice?.amount &&
    selectedVariant?.price?.amount < selectedVariant?.compareAtPrice?.amount;

  const [firstImage, setFirstImage] = useState(null);

  const [variantData, setVariantData] = useState(selectedVariant?.price!);
  const [monthlyData, setMonthlyData] = useState({
    amount: ((parseFloat(selectedVariant?.price?.amount) * quantity) / 12)
      .toFixed(2)
      .toString(),
    currencyCode: selectedVariant?.price?.currencyCode
      ? selectedVariant?.price?.currencyCode
      : 'USD',
  });

  const iconBadges = [
    {
      title: 'Money Back Guarantee',
      icon: premium,
      altText: 'a screen with a play arrow icon',
    },
    {
      title: 'Satisfaction Guaranteed',
      icon: thumbsUp,
      altText: 'thumbs up icon',
    },
    {
      title: 'Free Video Training Updates',
      icon: subscription,
      altText: 'ribbon with a dark star in the center icon',
    },
  ];

  useEffect(() => {
    media.nodes.map((mediaImage, index) => {
      if (index === 0 && mediaImage.__typename === 'MediaImage') {
        const image =
          mediaImage.__typename === 'MediaImage'
            ? {...mediaImage.image, altText: mediaImage.alt || 'Product image'}
            : null;
        setFirstImage(image);
      }
    });
  }, [media]);

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

  const form = useRef();

  useEffect(() => {
    var _learnq = _learnq || [];

    _learnq.push(['openForm', 'VjN4UC']);
  }, []);

  return (
    <>
      <section className="flex flex-wrap bg-gradient-to-b lg:bg-gradient-to-r from-[#f7ece4] to-[#ececec] lg:h-[100vh]">
        <div className="w-full lg:w-7/12 basis-full lg:basis-7/12 relative lg:flex lg:flex-col">
          {firstImage && (
            <img
              src={firstImage?.url}
              alt={
                firstImage?.altText ||
                'huupe backboard facing frontwards with the screen turned on with a mixture of bright color'
              }
              loading="lazy"
              className="w-full my-[100px] lg:my-[auto] h-auto lg:max-w-[700px] 2xl:max-w-[700px] object-cover m-auto"
            />
          )}

          <div className="absolute left-0 bottom-0 flex w-full px-6 lg:pl-24 lg:pr-[50px] py-[30px] lg:py-[40px] bg-[#F1ECE8] overflow-x-auto">
            {iconBadges.map((badge, index) => (
              <div
                key={index}
                className={`${
                  iconBadges.length - 1 === index
                    ? ''
                    : 'pr-[22px] lg:pr-[60px] '
                }flex items-center`}
              >
                <img
                  src={badge.icon}
                  alt={badge.title}
                  loading="lazy"
                  className="max-w-[30px] lg:max-w-none object-contain"
                />
                <p className="ml-[4px] text-[#1a1a1a] whitespace-nowrap">
                  {badge.title}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-5/12 basis-full lg:basis-5/12 flex flex-col bg-[#ffffff]">
          <div className="pr-6 2xl:pr-24 pt-[40px] pb-[50px] lg:pt-[107px] pl-6 2xl:pl-[112px] singleProductDetails">
            <p className="text-[#1a1a1a] font-[14px] mb-[30px] leading-[22px]">
              Pick your huupe.
            </p>
            <div className="flex rounded-[10px] border-[1px] border-[#000000] bg-[#fff5ee] py-[14px] px-[19px] lg:p-[25px] cursor-pointer">
              {firstImage && (
                <img
                  src={firstImage.url}
                  alt={firstImage.altText}
                  loading="lazy"
                  className="hidden md:block max-w-[79px] lg:max-w-[107px] max-h-[79px] lg:max-h-[107px] object-cover"
                />
              )}
              <div className="pl-0 md:pl-[15px] lg:pl-[30px]">
                <h1 className="font-[Radikal] text-[24px] lg:text-[34px] font-[900] leading-[34px] text-[#000000] mb-[7px] lg:mb-[12px]">
                  {title}
                </h1>
                <Link
                  to="/pages/how-it-works"
                  className="underline text-[#8E8E8E] font-[14px] font-[General Sans] leading-[22px]"
                >
                  View Huupe Specs
                </Link>
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
                  className="font-[Radikal] text-[24px] lg:text-[34px] font-[900] leading-[34px] text-[#000000] text-right"
                />

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

            <div
              className={`flex rounded-[10px] border-[1px] border-[#D9D9D9] bg-[url('../images/comingSoon.webp')] bg-cover bg-scroll bg-center bg-no-repeat py-[14px] px-[19px] lg:p-[25px] cursor-pointer mt-[30px]`}
            >
              <div className="relative w-full h-full text-center">
                <p className="!mb-0 text-[14px] text-[#ffffff] font-[700] leading-[22px]">
                  NEW huupe Coming Soon!
                </p>
                <p className="text-[#ffffff]">
                  Notify me when this product is in stock
                </p>

                <div className="flex gap-x-[10px] justify-center">
                  <div className="klaviyo-form-VjN4UC"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto bg-[#F1ECE8]">
            <div className="flex justify-between pr-6 2xl:pr-24 pl-6 2xl:pl-[112px] pt-[21px] pb-[21px] border-b-[1px] border-[#d0d0d0]">
              <p className="font-[400] text-[19px] lg:text-[24px] leading-[34px] text-[#000000] !mb-0">
                <span className="lg:hidden">Sub-</span>Total
              </p>
              <p className="font-[400] text-[19px] lg:text-[24px] leading-[34px] text-[#000000] !mb-0">
                <Money
                  withoutTrailingZeros
                  data={variantData}
                  as="span"
                  className="font-[700]"
                />
              </p>
            </div>
            <div className="pt-[37px] pb-[29px] flex justify-end items-center pr-6 2xl:pr-24 pl-6 2xl:pl-[112px]">
              <Suspense fallback={<ProductForm variants={[]} />}>
                <Await
                  errorElement="There was a problem loading related products"
                  resolve={variants}
                >
                  {(resp) => (
                    <ProductForm
                      variants={resp.product?.variants.nodes || []}
                    />
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
  quantity: 1;
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
    quantity: quantity,
  };

  return (
    <div className="grid gap-10">
      <div className="grid gap-4">
        <VariantSelector
          handle={product.handle}
          options={product.options}
          variants={variants}
        >
          {({option}) => {
            return (
              <div
                key={option.name}
                className="flex flex-col flex-wrap mb-4 gap-y-2 last:mb-0"
              >
                <Heading as="legend" size="lead" className="min-w-[4rem]">
                  {option.name}
                </Heading>
                <div className="flex flex-wrap items-baseline gap-4">
                  {option.values.length > 7 ? (
                    <div className="relative w-full">
                      <Listbox>
                        {({open}) => (
                          <>
                            <Listbox.Button
                              ref={closeRef}
                              className={clsx(
                                'flex items-center justify-between w-full py-3 px-4 border border-primary',
                                open
                                  ? 'rounded-b md:rounded-t md:rounded-b-none'
                                  : 'rounded',
                              )}
                            >
                              <span>{option.value}</span>
                              <IconCaret direction={open ? 'up' : 'down'} />
                            </Listbox.Button>
                            <Listbox.Options
                              className={clsx(
                                'border-primary bg-contrast absolute bottom-12 z-30 grid h-48 w-full overflow-y-scroll rounded-t border px-2 py-2 transition-[max-height] duration-150 sm:bottom-auto md:rounded-b md:rounded-t-none md:border-t-0 md:border-b',
                                open ? 'max-h-48' : 'max-h-0',
                              )}
                            >
                              {option.values
                                .filter((value) => value.isAvailable)
                                .map(({value, to, isActive}) => (
                                  <Listbox.Option
                                    key={`option-${option.name}-${value}`}
                                    value={value}
                                  >
                                    {({active}) => (
                                      <Link
                                        to={to}
                                        className={clsx(
                                          'text-primary w-full p-2 transition rounded flex justify-start items-center text-left cursor-pointer',
                                          active && 'bg-primary/10',
                                        )}
                                        onClick={() => {
                                          if (!closeRef?.current) return;
                                          closeRef.current.click();
                                        }}
                                      >
                                        {value}
                                        {isActive && (
                                          <span className="ml-2">
                                            <IconCheck />
                                          </span>
                                        )}
                                      </Link>
                                    )}
                                  </Listbox.Option>
                                ))}
                            </Listbox.Options>
                          </>
                        )}
                      </Listbox>
                    </div>
                  ) : (
                    option.values.map(({value, isAvailable, isActive, to}) => (
                      <Link
                        key={option.name + value}
                        to={to}
                        preventScrollReset
                        prefetch="intent"
                        replace
                        className={clsx(
                          'leading-none py-1 border-b-[1.5px] cursor-pointer transition-all duration-200',
                          isActive ? 'border-primary/50' : 'border-primary/0',
                          isAvailable ? 'opacity-100' : 'opacity-50',
                        )}
                      >
                        {value}
                      </Link>
                    ))
                  )}
                </div>
              </div>
            );
          }}
        </VariantSelector>
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
                    quantity: quantity,
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
            {/* {!isOutOfStock && (
              <ShopPayButton
                width="100%"
                variantIds={[selectedVariant?.id!]}
                storeDomain={storeDomain}
              />
            )} */}
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
      media(first: 7) {
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
