import {useParams, Form, Await, useMatches} from '@remix-run/react';
import React, {useWindowScroll} from 'react-use';
import {Disclosure} from '@headlessui/react';
import {Suspense, useEffect, useMemo, useState, useRef} from 'react';
import emailjs from '@emailjs/browser';
import {CartForm} from '@shopify/hydrogen';

// import logoImage from '../images/huupeNewLogo.webp';
import logoImage from '../images/huupeLogoSVG.svg';

import huupeNewLogo from '../images/huupeMiniHeading.webp';

import type {LayoutQuery} from 'storefrontapi.generated';
import {
  Drawer,
  useDrawer,
  Text,
  Input,
  IconLogin,
  IconAccount,
  IconBag,
  IconSearch,
  Heading,
  IconMenu,
  IconCaret,
  Section,
  CountrySelector,
  Cart,
  CartLoading,
  Link,
} from '~/components';
import {
  type EnhancedMenu,
  type ChildEnhancedMenuItem,
  useIsHomePath,
} from '~/lib/utils';
import {useIsHydrated} from '~/hooks/useIsHydrated';
import {useCartFetchers} from '~/hooks/useCartFetchers';

import beforeFooter from '../images/beforeFooterHuupe.webp';
import beforeFooter2 from '../images/beforeFooterPRO.webp';
import beforeFooterMobile from '../images/beforeFooterMobile.webp';

import footerLogo from '../images/huupeNewLogo.webp';
import instagram from '../images/instagramDark.png';
import tiktok from '../images/tiktokDark.png';
import twitter from '../images/twitterDark.png';
import fb from '../images/facebookDark.png';
import youtube from '../images/youtubeDark.png';

type LayoutProps = {
  children: React.ReactNode;
  layout: LayoutQuery & {
    headerMenu?: EnhancedMenu | null;
    footerMenu?: EnhancedMenu | null;
  };
};

export function Layout({children, layout}: LayoutProps) {
  const {headerMenu, footerMenu} = layout;
  const isHome = useIsHomePath(false);

  const currentURL = useIsHomePath(true);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>
        {headerMenu && <Header title={layout.shop.name} menu={headerMenu} />}
        <main
          role="main"
          id="mainContent"
          className={`${
            isHome ? '' : 'headerOverlap'
          } flex-grow overflow-hidden`}
        >
          {children}
        </main>
      </div>

      {footerMenu && currentURL.indexOf('/products/') === -1 && (
        <Footer menu={footerMenu} />
      )}
    </>
  );
}

function Header({title, menu}: {title: string; menu?: EnhancedMenu}) {
  const isHome = useIsHomePath(false);

  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  const addToCartFetchers = useCartFetchers(CartForm.ACTIONS.LinesAdd);

  // toggle cart drawer when adding to cart
  useEffect(() => {
    if (isCartOpen || !addToCartFetchers.length) return;
    openCart();
  }, [addToCartFetchers, isCartOpen, openCart]);

  const headerMenuItems = [
    // {
    //   name: 'home page',
    //   url: '/',
    //   target: '_self',
    //   title: 'home page',
    // },
    {
      name: 'mini',
      url: '/pages/huupe-mini',
      target: '_self',
      title: 'huupe mini',
    },
    {
      name: 'PRO',
      url: '/pages/huupe-pro',
      target: '_self',
      title: 'huupe PRO',
    },
    {
      name: 'Shop Now',
      url: '/pages/buy',
      target: '_self',
      title: 'Shop Now',
    },
  ];

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      {menu && (
        <MenuDrawer
          isOpen={isMenuOpen}
          onClose={closeMenu}
          menu={headerMenuItems}
        />
      )}
      <DesktopHeader
        isHome={isHome}
        title={title}
        menu={headerMenuItems}
        openCart={openCart}
        openMenu={openMenu}
      />
      <MobileHeader
        isHome={isHome}
        title={title}
        openCart={openCart}
        openMenu={openMenu}
      />
    </>
  );
}

function CartDrawer({isOpen, onClose}: {isOpen: boolean; onClose: () => void}) {
  const [root] = useMatches();

  return (
    <div className="hidden">
      <Suspense fallback={<CartLoading />}>
        <Await resolve={root.data?.cart}>
          {(cart) => (
            <Cart
              layout="drawer"
              onClose={onClose}
              cart={cart}
              added={isOpen}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
}

export function MenuDrawer({
  isOpen,
  onClose,
  menu,
}: {
  isOpen: boolean;
  onClose: () => void;
  menu: [];
}) {
  return (
    <Drawer open={isOpen} onClose={onClose} openFrom="top" heading="Menu">
      <div className="grid">
        <MenuMobileNav menu={menu} onClose={onClose} />
      </div>
    </Drawer>
  );
}

function MenuMobileNav({menu, onClose}: {menu: []; onClose: () => void}) {
  const currentURL = useIsHomePath(true);
  const socials = [
    {
      logo: tiktok,
      link: 'https://www.tiktok.com/@huupeofficial',
      alt: 'TikTok logo',
    },
    {
      logo: fb,
      link: 'https://www.facebook.com/huupeofficial/',
      alt: 'Facebook logo',
    },
    {
      logo: instagram,
      link: 'https://www.instagram.com/huupeofficial/',
      alt: 'Instagram logo',
    },
    {
      logo: twitter,
      link: 'https://twitter.com/huupeofficial/',
      alt: 'Twitter logo',
    },
    {
      logo: youtube,
      link: 'https://www.youtube.com/@huupeofficial',
      alt: 'YouTube logo',
    },
  ];

  return (
    <>
      <section className="main-footer main-footer-nav grayfooter px-6 lg:px-12 2xl:px-24 pb-12 lg:pb-24 pt-6 lg:pt-12">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-8/12 xl:w-7/12 p-0 lg:pr-4">
            <div className="flex footer-newsletter flex-wrap">
              <div className="w-full lg:w-6/12 pb-6 lg:pb-0 lg:pr-[30px]">
                <img
                  src={footerLogo}
                  className="footer-logo hidden lg:inline-block w-full max-w-[156px]"
                  alt="huupe logo"
                  height="1008px"
                  width="3334px"
                />
                <h3 className="mt-[20px]">THE WORLD'S FIRST SMART BASKETBALL HOOP</h3>
              </div>
              <div className="w-full lg:w-6/12 pb-6 lg:pb-0">
                <div className="flex flex-wrap">
                  <div className="footer-menu lg:hidden">
                    <h4>Menu</h4>
                    <ul>
                      
                        {(menu || []).map((item, index) => (
                          <li>
                            <Link
                              key={item.url}
                              to={item.url}
                              target={item.target}
                              prefetch="intent"
                              className={`pb-1 ${currentURL.indexOf('/products/') >= 0 ? 'hidden' : ''}`}
                              onClick={() => onClose()}
                            >
                              {index == 0 || index == 1 ? 'huupe ' : null}
                              {index == 0 || index == 1 ? <span className="font-bold font-[League Spartan]">{item.name}</span> : item.name}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="footer-menu">
                    <h4>Product</h4>
                    <ul>
                      <li>
                        <Link
                          key="/pages/how-it-works"
                          to="/pages/how-it-works"
                          target="_self"
                          prefetch="intent"
                          className={({isActive}) =>
                            isActive ? 'pb-1' : 'pb-1'
                          }
                          onClick={() => onClose()}
                        >
                          The Huupe
                        </Link>
                      </li>
                      <li>
                        <Link
                          key="/pages/our-trainers"
                          to="/pages/our-trainers"
                          target="_self"
                          prefetch="intent"
                          className={({isActive}) =>
                            isActive ? 'pb-1' : 'pb-1'
                          }
                          onClick={() => onClose()}
                        >
                          Our Trainers
                        </Link>
                      </li>
                      
                      <li>
                        <Link
                          key="/pages/memberships"
                          to="/pages/memberships"
                          target="_self"
                          prefetch="intent"
                          className={({isActive}) =>
                            isActive ? 'pb-1' : 'pb-1'
                          }
                          onClick={() => onClose()}
                        >
                          Membership
                        </Link>
                      </li>
                      <li>
                        <Link
                          key="/pages/reviews"
                          to="/pages/reviews"
                          target="_self"
                          prefetch="intent"
                          className={({isActive}) =>
                            isActive ? 'pb-1' : 'pb-1'
                          }
                          onClick={() => onClose()}
                        >
                          Reviews
                        </Link>
                      </li>
                      <li>
                        <Link
                          key="/pages/installation"
                          to="/pages/installation"
                          target="_self"
                          prefetch="intent"
                          className={({isActive}) =>
                            isActive ? 'pb-1' : 'pb-1'
                          }
                          onClick={() => onClose()}
                        >
                          Installation
                        </Link>
                      </li>
                      <li>
                        <Link
                          key="/pages/faqs"
                          to="/pages/faqs"
                          target="_self"
                          prefetch="intent"
                          className={({isActive}) =>
                            isActive ? 'pb-1' : 'pb-1'
                          }
                          onClick={() => onClose()}
                        >
                          FAQ
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-menu">
                    <h4>Company</h4>
                    <ul>
                      <li>
                        <Link
                          key="https://jobs.lever.co/huupe"
                          to="https://jobs.lever.co/huupe"
                          target="_blank"
                          prefetch="intent"
                          className={({isActive}) =>
                            isActive ? 'pb-1' : 'pb-1'
                          }
                          onClick={() => onClose()}
                        >
                          Careers
                        </Link>
                      </li>
                      <li>
                        <Link
                          key="/pages/press"
                          to="/pages/press"
                          target="_self"
                          prefetch="intent"
                          className={({isActive}) =>
                            isActive ? 'pb-1' : 'pb-1'
                          }
                          onClick={() => onClose()}
                        >
                          Press
                        </Link>
                      </li>
                      <li>
                        <Link
                          key="/policies/privacy-policy"
                          to="/policies/privacy-policy"
                          target="_self"
                          prefetch="intent"
                          className={({isActive}) =>
                            isActive ? 'pb-1 whitespace-nowrap' : 'pb-1 whitespace-nowrap'
                          }
                          onClick={() => onClose()}
                        >
                          Privacy Policy
                        </Link>
                      </li>
                      <li>
                        <Link
                          key="/policies/terms-of-service"
                          to="/policies/terms-of-service"
                          target="_self"
                          prefetch="intent"
                          className={({isActive}) =>
                            isActive ? 'pb-1 whitespace-nowrap' : 'pb-1 whitespace-nowrap'
                          }
                          onClick={() => onClose()}
                        >
                          Terms & Conditions
                        </Link>
                      </li>
                      
                      <li>
                      <Link
                          key="/policies/terms-of-service"
                          to="/policies/terms-of-service"
                          target="_self"
                          prefetch="intent"
                          className="opacity-0"
                        >
                          Terms & Conditions
                        </Link>
                      </li>
                      <li>
                        <p className="h-[31px] leading-[31px]">&copy; {new Date().getFullYear()} huupe</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-4/12 xl:w-5/12 p-0">
            <div className="flex flex-wrap gap-[25px] justify-between lg:justify-end footer-socials">
              {socials.map((social, index) => (
                <div
                  className="footer-social"
                  key={index}
                >
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noreferrer"
                    className=""
                  >
                    <img
                      src={social.logo}
                      className=""
                      alt={social.alt}
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>

    // <nav className="grid gap-4 p-6 sm:gap-6 sm:px-12 sm:py-8">
    //   {/* Top level menu items */}
    //   {(menu?.items || []).map((item) => (
    //     <span key={item.id} className="block">
    //       <Link
    //         to={item.to}
    //         target={item.target}
    //         onClick={onClose}
    //         className={({isActive}) =>
    //           isActive ? 'pb-1' : 'pb-1'
    //         }
    //       >
    //         <Text as="span" size="copy">
    //           {item.title}
    //         </Text>
    //       </Link>
    //     </span>
    //   ))}
    // </nav>
  );
}

function MobileHeader({
  title,
  isHome,
  openCart,
  openMenu,
}: {
  title: string;
  isHome: boolean;
  openCart: () => void;
  openMenu: () => void;
}) {
  // useHeaderStyleFix(containerStyle, setContainerStyle, isHome);
  const {y} = useWindowScroll();
  const params = useParams();

  const currentURL = useIsHomePath(true);

  const [scrollDir, setScrollDir] = useState('up');
  const [theScrollY, setTheScrollY] = useState(0);

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.scrollY;
      setTheScrollY(window.scrollY);
      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollDir]);

  return (
    <header
      role="banner"
      className={`${theScrollY > 50 ? 'shadow-lightHeader ' : ''}${
        currentURL.indexOf('/pages/our-trainers') >= 0 ||
        currentURL.indexOf('/pages/press') >= 0
          ? 'light-header '
          : ''
      } ${
        currentURL.indexOf('/pages/careers') >= 0
          ? ' light-header-desktop '
          : ''
      } lg:hidden items-center ${
        isHome ? 'sticky' : 'fixed'
      } main-header z-40 top-0 justify-between w-full leading-none p-6 lg:px-8 transition duration-300${
        scrollDir == 'down' ? ' translate-y-[-100%]' : ''
      }`}
    >
      <div className="w-full">
        <div className="header-logo-hamburger flex justify-between">
          <Link className="font-bold" to="/" prefetch="intent">
            <img
              src={logoImage}
              height="1008px"
              width="3334px"
              className="w-full max-w-[156px]"
              alt="huupe logo"
            />
          </Link>

          <span className="header-hamburger" onClick={openMenu}>
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.45837 37.3438V34.349H43.5677V37.3438H6.45837ZM6.45837 26.4844V23.4896H43.5677V26.4844H6.45837ZM6.45837 15.651V12.6562H43.5677V15.651H6.45837Z"
                fill="black"
              />
            </svg>
          </span>
        </div>
        {/* <button
          onClick={openMenu}
          className="relative flex items-center justify-center w-8 h-8"
        >
          <IconMenu />
        </button>
        <Form
          method="get"
          action={params.locale ? `/${params.locale}/search` : '/search'}
          className="items-center gap-2 sm:flex"
        >
          <button
            type="submit"
            className="relative flex items-center justify-center w-8 h-8"
          >
            <IconSearch />
          </button>
          <Input
            className={
              isHome
                ? 'focus:border-contrast/20 dark:focus:border-primary/20'
                : 'focus:border-primary/20'
            }
            type="search"
            variant="minisearch"
            placeholder="Search"
            name="q"
          />
        </Form> */}
      </div>

      {/* <Link
        className="flex items-center self-stretch leading-[3rem] lg:leading-[4rem] justify-center flex-grow w-full h-full"
        to="/"
      >
        <Heading
          className="font-bold text-center leading-none"
          as={isHome ? 'h1' : 'h2'}
        >
          {title}
        </Heading>
      </Link>

      <div className="flex items-center justify-end w-full gap-4">
        <AccountLink className="relative flex items-center justify-center w-8 h-8" />
        <CartCount isHome={isHome} openCart={openCart} />
      </div> */}
    </header>
  );
}

function DesktopHeader({
  isHome,
  menu,
  openCart,
  openMenu,
  title,
}: {
  isHome: boolean;
  openCart: () => void;
  openMenu: () => void;
  menu?: [];
  title: string;
}) {
  const params = useParams();
  const {y} = useWindowScroll();

  const currentURL = useIsHomePath(true);

  const [scrollDir, setScrollDir] = useState('up');
  const [theScrollY, setTheScrollY] = useState(0);

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.scrollY;
      setTheScrollY(window.scrollY);

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollDir]);

  return (
    <header
      role="banner"
      className={`text-primary${theScrollY > 50 ? ' shadow-lightHeader ' : ''}${
        isHome ? ' sticky ' : ' fixed '
      }${
        currentURL.indexOf('/pages/careers') >= 0 ? 'light-header-desktop ' : ''
      }${
        currentURL.indexOf('/pages/our-trainers') >= 0 ||
        currentURL.indexOf('/pages/press') >= 0
          ? ' light-header '
          : ''
      }hidden lg:flex items-center transition duration-300 z-40 top-0 justify-between w-full leading-none gap-8 lg:px-12 2xl:px-24 py-8 2xl:py-12 main-header${
        scrollDir == 'down' ? ' translate-y-[-100%]' : ''
      }`}
    >
      <div className="flex w-full ">
        <div className="header-logo-hamburger flex">
          <span className="header-hamburger" onClick={openMenu}>
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.45837 37.3438V34.349H43.5677V37.3438H6.45837ZM6.45837 26.4844V23.4896H43.5677V26.4844H6.45837ZM6.45837 15.651V12.6562H43.5677V15.651H6.45837Z"
                fill="black"
              />
            </svg>
          </span>
          
        </div>

        <nav
          className={`header-nav-items flex`}
        >
          <Link to="/" prefetch="intent">
            <img
              src={logoImage}
              height="1008px"
              width="3334px"
              className="w-full max-w-[124px]"
              alt="huupe logo"
            />
          </Link>
          {/* Top level menu items */}
          {(menu || []).map((item, index) => (
            <Link
              key={item.url}
              to={item.url}
              target={item.target}
              prefetch="intent"
              className={`pb-1 ${currentURL.indexOf('/products/') >= 0 ? 'hidden' : ''}`}
            >
              {index == 0 || index == 1 ? <img className="h-[26px] inline-block" src={logoImage} /> : null}
              {index == 1 ? <span className="font-bold font-[League Spartan]">{item.name}</span> : item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-1 hidden">
        <Form
          method="get"
          action={params.locale ? `/${params.locale}/search` : '/search'}
          className="flex items-center gap-2"
        >
          <Input
            className={
              isHome
                ? 'focus:border-contrast/20 dark:focus:border-primary/20'
                : 'focus:border-primary/20'
            }
            type="search"
            variant="minisearch"
            placeholder="Search"
            name="q"
          />
          <button
            type="submit"
            className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
          >
            <IconSearch />
          </button>
        </Form>
        <AccountLink className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5" />
        <CartCount isHome={isHome} openCart={openCart} />
      </div>
    </header>
  );
}

function AccountLink({className}: {className?: string}) {
  const [root] = useMatches();
  const isLoggedIn = root.data?.isLoggedIn;
  return isLoggedIn ? (
    <Link to="/account" className={className}>
      <IconAccount />
    </Link>
  ) : (
    <Link to="/account/login" className={className}>
      <IconLogin />
    </Link>
  );
}

function CartCount({
  isHome,
  openCart,
}: {
  isHome: boolean;
  openCart: () => void;
}) {
  const [root] = useMatches();

  return (
    <Suspense fallback={<Badge count={0} dark={isHome} openCart={openCart} />}>
      <Await resolve={root.data?.cart}>
        {(cart) => (
          <Badge
            dark={isHome}
            openCart={openCart}
            count={cart?.totalQuantity || 0}
          />
        )}
      </Await>
    </Suspense>
  );
}

function Badge({
  openCart,
  dark,
  count,
}: {
  count: number;
  dark: boolean;
  openCart: () => void;
}) {
  const isHydrated = useIsHydrated();

  const BadgeCounter = useMemo(
    () => (
      <>
        <IconBag />
        <div
          className={`${
            dark
              ? 'text-primary bg-contrast dark:text-contrast dark:bg-primary'
              : 'text-contrast bg-primary'
          } absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px`}
        >
          <span>{count || 0}</span>
        </div>
      </>
    ),
    [count, dark],
  );

  return isHydrated ? (
    <button
      onClick={openCart}
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
    >
      {BadgeCounter}
    </button>
  ) : (
    <Link
      to="/cart"
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
    >
      {BadgeCounter}
    </Link>
  );
}

function Footer({menu}: {menu?: EnhancedMenu}) {
  const currentURL = useIsHomePath(true);
  const isHome = useIsHomePath(false);
  const itemsCount = menu
    ? menu?.items?.length + 1 > 4
      ? 4
      : menu?.items?.length + 1
    : [];

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_5y6y1vt',
        'template_c4797bi',
        form.current,
        'aOT0o80bLHVB42TED',
      )
      .then(
        (result) => {
          form.current.reset();
        },
        (error) => {},
      );
  };

  const socials = [
    {
      logo: tiktok,
      link: 'https://www.tiktok.com/@huupeofficial',
      alt: 'TikTok logo',
      altBG: 'Tiktok account background',
    },
    {
      logo: fb,
      link: 'https://www.facebook.com/huupeofficial/',
      alt: 'Facebook logo',
    },
    {
      logo: instagram,
      link: 'https://www.instagram.com/huupeofficial/',
      alt: 'Instagram logo',
    },
    {
      logo: twitter,
      link: 'https://twitter.com/huupeofficial/',
      alt: 'Twitter logo',
    },
    
    {
      logo: youtube,
      link: 'https://www.youtube.com/@huupeofficial',
      alt: 'YouTube logo',
    },
  ];

  const klaviyoTrigger = () => {
    var _learnq = _learnq || [];

    _learnq.push(['openForm', 'XuDzpq']);
  };

  return (
    <>
      {currentURL.indexOf('/huupe-mini') >= 0 || currentURL.indexOf('/huupe-pro') >= 0 ||  isHome ? 
      <section className={`beforeFooter relative text-center mb-[80px] ${currentURL.indexOf('/huupe-pro') >= 0 ? '' : 'lg:-mb-[80px]'} z-20 px-[25px] lg:px-0`}>
        <img
          src={currentURL.indexOf('/huupe-pro') >= 0 ? beforeFooter2 : beforeFooter}
          className={`relative z-2 inline-block ${currentURL.indexOf('/huupe-pro') >= 0 ? 'h-[609px] lg:h-[700px] 2xl:h-auto object-cover' : 'lg:max-h-[700px] 2xl:max-h-[none]' }`}
          alt="Huupe Overlay"
        />
        <div className={`p-6 pb-0 lg:pr-24 lg:pl-24 ${ currentURL.indexOf('/huupe-pro') >= 0 ? '-mt-[300px] 2xl:-mt-[400px]' : '-mt-[60px] lg:-mt-[90px] 2xl:-mt-[120px]'}`}>
          <h2 className={`font-[Montserrat] mb-12 text-[#000] text-[${ currentURL.indexOf('/huupe-pro') >= 0 ? '34px' : '50px' }] lg:text-[101px] 2xl:text-[151px] font-black leading-[60px] lg:leading-[100%]`}>{ currentURL.indexOf('/huupe-pro') >= 0 ? 'RESERVE NOW' : 'GET STARTED' }</h2>
          { currentURL.indexOf('/huupe-pro') >= 0 ? 
          null
          :
          <Link
            key="/products/huupe-classic"
            to={`/products/huupe-classic`}
            target="_self"
            prefetch="intent"
            className="main-button normal-case "
          >
            Buy now
          </Link>
          }
        </div>
        <div className="text-center relative z-50">
        { currentURL.indexOf('/huupe-pro') >= 0 ? 
          <Link
            key="/products/the-huupe"
            to="/products/the-huupe"
            target="_self"
            prefetch="intent"
            className="main-button normal-case relative z-50"
          >
            Reserve Now
          </Link>
          : null
          }
        </div>
      </section>
      : null
      }

      <section
        className={`${
          isHome ? 'grayfooter' : ''
        } main-footer px-6 py-16 lg:px-12 2xl:px-24 lg:pb-24 lg:pt-48 bg-[#ffffff]`}
      >
        <div className="flex flex-wrap relative z-10">
          <div className="w-full lg:w-7/12 lg:pr-4">
            <div className="flex footer-newsletter flex-wrap">
              <div className="block w-full lg:w-5/12 mb-[40px] lg:mb-0">
                <img
                  src={footerLogo}
                  className="footer-logo w-full max-w-[156px]"
                  alt="huupe logo"
                  height="1008px"
                  width="3334px"
                />
                <h3 className="mt-[20px] text-[24px]">THE WORLD'S FIRST SMART BASKETBALL HOOP</h3>
              </div>
              <div className="w-full lg:w-7/12">
                <div className="flex flex-wrap">
                  <div className="footer-menu">
                    <h4>Product</h4>
                    <ul>
                      <li>
                        <Link
                          key="/pages/how-it-works"
                          to="/pages/how-it-works"
                          target="_self"
                          prefetch="intent"
                          className={({isActive}) =>
                            isActive ? 'pb-1' : 'pb-1'
                          }
                        >
                          The Huupe
                        </Link>
                      </li>
                      <li>
                        <Link
                          key="/pages/our-trainers"
                          to="/pages/our-trainers"
                          target="_self"
                          prefetch="intent"
                          className={({isActive}) =>
                            isActive ? 'pb-1' : 'pb-1'
                          }
                        >
                          Our Trainers
                        </Link>
                      </li>
                      <li>
                        <Link
                          key="/pages/memberships"
                          to="/pages/memberships"
                          target="_self"
                          prefetch="intent"
                          className={({isActive}) =>
                            isActive ? 'pb-1' : 'pb-1'
                          }
                        >
                          Membership
                        </Link>
                      </li>
                      <li>
                        <Link
                          key="/pages/reviews"
                          to="/pages/reviews"
                          target="_self"
                          prefetch="intent"
                          className={({isActive}) =>
                            isActive ? 'pb-1' : 'pb-1'
                          }
                        >
                          Reviews
                        </Link>
                      </li>
                      <li>
                        <Link
                          key="/pages/installation"
                          to="/pages/installation"
                          target="_self"
                          prefetch="intent"
                          className={({isActive}) =>
                            isActive ? 'pb-1' : 'pb-1'
                          }
                        >
                          Installation
                        </Link>
                      </li>
                      <li>
                        <Link
                          key="/pages/faqs"
                          to="/pages/faqs"
                          target="_self"
                          prefetch="intent"
                          className={({isActive}) =>
                            isActive ? 'pb-1' : 'pb-1'
                          }
                        >
                          FAQ
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-menu">
                    <h4>Company</h4>
                    <ul>
                      <li>
                        <Link
                          key="/pages/careers"
                          to="/pages/careers"
                          target="_self"
                          prefetch="intent"
                          className={({isActive}) =>
                            isActive ? 'pb-1' : 'pb-1'
                          }
                        >
                          Careers
                        </Link>
                      </li>
                      <li>
                        <Link
                          key="/pages/press"
                          to="/pages/press"
                          target="_self"
                          prefetch="intent"
                          className={({isActive}) =>
                            isActive ? 'pb-1' : 'pb-1'
                          }
                        >
                          Press
                        </Link>
                      </li>
                      <li>
                        <Link
                          key="/policies/privacy-policy"
                          to="/policies/privacy-policy"
                          target="_self"
                          prefetch="intent"
                          className={({isActive}) =>
                            isActive ? 'pb-1' : 'pb-1'
                          }
                        >
                          Privacy Policy
                        </Link>
                      </li>
                      <li>
                        <Link
                          key="/policies/terms-of-service"
                          to="/policies/terms-of-service"
                          target="_self"
                          prefetch="intent"
                          className={({isActive}) =>
                            isActive ? 'pb-1' : 'pb-1'
                          }
                        >
                          Terms & Conditions
                        </Link>
                      </li>
                      <li>
                      <Link
                          key="/policies/terms-of-service"
                          to="/policies/terms-of-service"
                          target="_self"
                          prefetch="intent"
                          className="opacity-0"
                        >
                          Terms & Conditions
                        </Link>
                      </li>
                      <li>
                        <p className="h-[31px] leading-[31px]">&copy; {new Date().getFullYear()} huupe</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-5/12 pl-0 pt-12 lg:pt-0 lg:pl-4">
            <div className="flex footer-newsletter flex-wrap">
              <div className="w-full">
                <h3 className="!text-[22px] !text-[Radikal] lg:!text-[Montserrat] lg:!text-[20px]">SIGN UP FOR OUR NEWSLETTER</h3>
                <p>
                  Stay up to date with our latest news, announcements, and
                  articles.
                </p>
              </div>
              <div className="w-full mt-0">
                <div
                  className="klaviyo-form-XuDzpq"
                  onClick={() => klaviyoTrigger()}
                ></div>
              </div>
            </div>
            <div className="flex flex-wrap justify-between lg:justify-start gap-[15px] lg:gap-[25px] footer-socials pt-[25px]">
              {socials.map((social, index) => (
                <div
                  className="footer-social"
                  key={index}
                >
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noreferrer"
                    className=""
                  >
                    <img
                      src={social.logo}
                      className=""
                      alt={social.alt}
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FooterLink({item}: {item: ChildEnhancedMenuItem}) {
  if (item.to.startsWith('http')) {
    return (
      <a href={item.to} target={item.target} rel="noopener noreferrer">
        {item.title}
      </a>
    );
  }

  return (
    <Link to={item.to} target={item.target} prefetch="intent">
      {item.title}
    </Link>
  );
}

function FooterMenu({menu}: {menu?: EnhancedMenu}) {
  const styles = {
    section: 'grid gap-4',
    nav: 'grid gap-2 pb-6',
  };

  return (
    <>
      {(menu?.items || []).map((item) => (
        <section key={item.id} className={styles.section}>
          <Disclosure>
            {({open}) => (
              <>
                <Disclosure.Button className="text-left lg:cursor-default">
                  <Heading className="flex justify-between" size="lead" as="h3">
                    {item.title}
                    {item?.items?.length > 0 && (
                      <span className="lg:hidden">
                        <IconCaret direction={open ? 'up' : 'down'} />
                      </span>
                    )}
                  </Heading>
                </Disclosure.Button>
                {item?.items?.length > 0 ? (
                  <div
                    className={`${
                      open ? `max-h-48 h-fit` : `max-h-0 lg:max-h-fit`
                    } overflow-hidden transition-all duration-300`}
                  >
                    <Suspense data-comment="This suspense fixes a hydration bug in Disclosure.Panel with static prop">
                      <Disclosure.Panel static>
                        <nav className={styles.nav}>
                          {item.items.map((subItem: ChildEnhancedMenuItem) => (
                            <FooterLink key={subItem.id} item={subItem} />
                          ))}
                        </nav>
                      </Disclosure.Panel>
                    </Suspense>
                  </div>
                ) : null}
              </>
            )}
          </Disclosure>
        </section>
      ))}
    </>
  );
}
