import {Fragment, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {
  useIsHomePath,
} from '~/lib/utils';
import {Heading, Link,  IconClose} from '~/components';

import logoImage from '../images/logo.webp';
// import huupeNewLogo from '../images/huupeMiniHeading.webp';
// import logoImage2 from '../images/huupeNewLogo.webp';

import logoImage2 from '../images/huupeLogoSVG.svg';
import huupeNewLogo from '../images/huupeLogoSVG.svg';

/**
 * Drawer component that opens on user click.
 * @param heading - string. Shown at the top of the drawer.
 * @param open - boolean state. if true opens the drawer.
 * @param onClose - function should set the open state.
 * @param openFrom - right, left
 * @param children - react children node.
 */
export function Drawer({
  heading,
  open,
  onClose,
  openFrom = 'right',
  children,
}: {
  heading?: string;
  open: boolean;
  onClose: () => void;
  openFrom: 'right' | 'left' | 'top';
  children: React.ReactNode;
}) {
  const offScreen = {
    top: '-translate-y-full',
    right: 'translate-x-full',
    left: '-translate-x-full',
  };

  const currentURL = useIsHomePath(true);
  const headerMenuItems = [
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
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50 maindrawer" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 left-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={`fixed inset-y-0 block max-w-full overflow-y-auto ${
                openFrom === 'right' ? 'right-0' : ''
              }`}
            >
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom={offScreen[openFrom]}
                enterTo={`${openFrom === 'top' ? 'translate-y-0' : 'translate-x-0'}`}
                leave="transform transition ease-in-out duration-300"
                leaveFrom={`${openFrom === 'top' ? 'translate-y-0' : 'translate-x-0'}`}
                leaveTo={offScreen[openFrom]}
              >
                <Dialog.Panel className="w-screen text-left align-middle transition-all transform shadow-xl h-auto bg-[#ffffff]">
                  <header
                    className={`px-6 lg:px-12 2xl:px-24 pt-7 lg:pt-12 sticky top-0 flex items-center ${
                      heading ? 'justify-between' : 'justify-end'
                    }`}
                  >
                    {heading !== null && (
                      <Dialog.Title className="block lg:hidden">
                        <Heading as="span" size="lead" id="cart-contents">
                          <img src={logoImage} />
                        </Heading>
                      </Dialog.Title>
                    )}
                    <button
                      type="button"
                      className="text-primary"
                      onClick={onClose}
                      data-test="close-cart"
                    >
                      {/* <IconClose aria-label="Close panel" /> */}
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.1 37.3L10 35.2L21.55 23.65L10 12.1L12.1 10L23.65 21.55L35.2 10L37.3 12.1L25.75 23.65L37.3 35.2L35.2 37.3L23.65 25.75L12.1 37.3Z" fill="black"/>
                      </svg>
                    </button>
                    <nav className={`header-nav-items hidden lg:flex`} >
                      <Link to="/" prefetch="intent">
                        <img
                          src={logoImage2}
                          height="1008px"
                          width="3334px"
                          className="w-full max-w-[124px]"
                          alt="huupe logo"
                        />
                      </Link>
                      {/* Top level menu items */}
                      {(headerMenuItems || []).map((item, index) => (
                        <Link
                          key={item.url}
                          to={item.url}
                          target={item.target}
                          prefetch="intent"
                          className={`pb-1 ${currentURL.indexOf('/products/') >= 0 ? 'hidden' : ''}`}
                          onClick={() => onClose()}
                        >
                          {index == 0 || index == 1 ? <img className="h-[26px] inline-block" src={huupeNewLogo} /> : null}
                          {index == 1 ? <span className="font-bold font-[League Spartan]">{item.name}</span> : item.name}
                        </Link>
                      ))}
                    </nav>
                  </header>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

/* Use for associating arialabelledby with the title*/
Drawer.Title = Dialog.Title;

export function useDrawer(openDefault = false) {
  const [isOpen, setIsOpen] = useState(openDefault);

  function openDrawer() {
    setIsOpen(true);
  }

  function closeDrawer() {
    setIsOpen(false);
  }

  return {
    isOpen,
    openDrawer,
    closeDrawer,
  };
}
