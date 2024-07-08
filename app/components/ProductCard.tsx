import clsx from 'clsx';
import type {ShopifyAnalyticsProduct} from '@shopify/hydrogen';
import {flattenConnection, Image, Money, useMoney} from '@shopify/hydrogen';
import type {MoneyV2, Product} from '@shopify/hydrogen/storefront-api-types';

import type {ProductCardFragment} from 'storefrontapi.generated';
import {Text, Link, AddToCartButton, Button} from '~/components';
import {isDiscounted, isNewArrival} from '~/lib/utils';
import {getProductPlaceholder} from '~/lib/placeholders';
import huupeNewLogo from '../images/huupeLogoSVG.svg';


export function ProductCard({
  product,
  label,
  className,
  loading,
  onClick,
  quickAdd,
  count,
  showDetails = false
}: {
  product: ProductCardFragment;
  label?: string;
  className?: string;
  loading?: HTMLImageElement['loading'];
  onClick?: () => void;
  quickAdd?: boolean;
  count?: number;
  showDetails?: boolean;
}) {
  let cardLabel;

  const cardProduct: Product = product?.variants
    ? (product as Product)
    : getProductPlaceholder();
  if (!cardProduct?.variants?.nodes?.length) return null;

  const firstVariant = flattenConnection(cardProduct.variants)[0];

  if (!firstVariant) return null;
  const {image, price, compareAtPrice} = firstVariant;

  if (label) {
    cardLabel = label;
  } else if (isDiscounted(price as MoneyV2, compareAtPrice as MoneyV2)) {
    cardLabel = 'Sale';
  } else if (isNewArrival(product.publishedAt)) {
    cardLabel = 'New';
  }

  const productAnalytics: ShopifyAnalyticsProduct = {
    productGid: product.id,
    variantGid: firstVariant.id,
    name: product.title,
    variantName: firstVariant.title,
    brand: product.vendor,
    price: firstVariant.price.amount,
    quantity: 1,
  };

  const columnWidth = count && count >= 4 ? '3/12' : '4/12';

  return (
    <div className={`w-full items-center justify-start text-center lg:w-${columnWidth} flex flex-col gap-2 bg-[#FBF9F8] rounded-[20px] p-[30px]`}>
      <Link
        onClick={onClick}
        to={`/products/${product.handle}`}
        prefetch="intent"
        className="text-center"
      >
        <div className={clsx('grid gap-4 text-center w-full justify-center', className)}>
          <div className="card-image aspect-[4/5] bg-primary/5">
            {image && (
              <Image
                className={`object-cover w-full fadeIn ${showDetails ? 'lg:h-[441px] object-contain object-bottom' : ''} `}
                sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
                aspectRatio="4/5"
                data={image}
                alt={image.altText || `Picture of ${product.title}`}
                loading={loading}
              />
            )}
            <Text
              as="label"
              size="fine"
              className="absolute top-0 right-0 m-4 text-right text-notice"
            >
              {cardLabel}
            </Text>
          </div>
          <div className="grid gap-1">
            <Text
              className="w-full overflow-hidden whitespace-nowrap text-ellipsis "
              as="h3"
            >
              {product.handle == 'huupe-pro' && <><img className="h-[20px] inline-block mb-[4px]" src={huupeNewLogo} /> PRO</>}
              {product.handle == 'huupe-classic' && <><img className="h-[20px] inline-block mb-[4px]" src={huupeNewLogo} /> Classic</>}
              {product.handle != 'huupe-pro' && product.handle != 'huupe-classic' && <>{product.title}</>}
              
              {firstVariant.quantityAvailable && firstVariant.quantityAvailable > 0 ?  <>
                &nbsp;- <span className="available">Now available</span>
              </> 
              : <>
               &nbsp;- <span className="notavailable text-[#FE5100] font-[700]">SOLD OUT</span>
              </> }
              
            </Text>
            <div className="flex gap-4 justify-center">
              <Text className="flex gap-4">
                <Money withoutTrailingZeros data={price!} />
                {isDiscounted(price as MoneyV2, compareAtPrice as MoneyV2) && (
                  <CompareAtPrice
                    className={'opacity-50'}
                    data={compareAtPrice as MoneyV2}
                  />
                )}
              </Text>
            </div>
          </div>
        </div>
      </Link>
      {quickAdd && firstVariant.availableForSale && (
        <div className="text-center">
          <Link
            onClick={onClick}
            to={`/products/${product.handle}`}
            prefetch="intent"
            className="text-center mt-2 main-button w-[auto] normal-case"
          >
            {firstVariant.quantityAvailable && firstVariant.quantityAvailable > 0 ? 'Buy now' : 'Reserve Now' }
          </Link>
          {/* <AddToCartButton
            lines={[
              {
                quantity: 1,
                merchandiseId: firstVariant.id,
              },
            ]}
            variant="secondary"
            className="mt-2 main-button w-[auto] normal-case"
            analytics={{
              products: [productAnalytics],
              totalValue: parseFloat(productAnalytics.price),
            }}
          >
            <Text as="span" className="flex items-center justify-center gap-2">
            {firstVariant.quantityAvailable && firstVariant.quantityAvailable > 0 ? 'Buy now' : 'Reserve Now' }
            </Text>
          </AddToCartButton> */}
        </div>
      )}
      {quickAdd && !firstVariant.availableForSale && (
        <Button variant="secondary" className="mt-2" disabled>
          <Text as="span" className="flex items-center justify-center gap-2">
            Sold out
          </Text>
        </Button>
      )}

      {firstVariant.quantityAvailable && firstVariant.quantityAvailable > 0 ? 
       <span className="instock text-center mt-3">In Stock</span>
      :
      <span className="text-center mt-3">$100 down payment to reserve</span>
      }

      {showDetails &&
        <>
          {product.handle == 'huupe-pro' && <>
            <div className="text-center mt-[40px]">
              <p>Full Size Regulation Basketball Hoop (60")</p>
              <p>Pole or Wall Mount Version</p>
              <p>Full Smart TV</p>
              <p>Indoor + Outdoor (fully weatherproof)</p>
              <p>Shot Tracking Technology</p>
              <p>Advanced Analytics</p>
              <p>On-Demand Training</p>
              <p>huupe to huupe gaming</p>
              <p>Optional Premium Membership Subscription - Free Access As Well for All Users</p>
            </div>
          </>}

          {product.handle == 'huupe-classic' && <>
            <div className="text-center mt-[40px]">
              <p>Full mini hoop game console</p>
              <p>Over the door or wall mount installation (wall mount sold separately)</p>
              <p>Full Smart TV</p>
              <p>Indoor use</p>
              <p>Shot Tracking Technology</p>
              <p>No Camera</p>
              <p>No Subscription</p>
              <p>huupe to huupe gaming</p>
              <p>Daily Challenges - Free to Enter</p>
            </div>
          </>}
        </>
      }
    </div>
  );
}

function CompareAtPrice({
  data,
  className,
}: {
  data: MoneyV2;
  className?: string;
}) {
  const {currencyNarrowSymbol, withoutTrailingZerosAndCurrency} =
    useMoney(data);

  const styles = clsx('strike', className);

  return (
    <span className={styles}>
      {currencyNarrowSymbol}
      {withoutTrailingZerosAndCurrency}
    </span>
  );
}
