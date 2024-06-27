import type {ReactElement} from 'react';
import clsx from 'clsx';

export function SlideCarousel({
  right,
  children,
  containerStyles,
  trackStyles,
}: {
  right?: boolean;
  containerStyles?: string;
  trackStyles?: string;
  children: string | ReactElement | ReactElement[];
}) {
  return (
    <>
      <div className={containerStyles}>
        <div
          className={clsx(
            trackStyles,
            right ? 'slide-track-right ' : 'slide-track-left ',
          )}
        >
          {children}
          {children}
        </div>
      </div>
    </>
  );
}
