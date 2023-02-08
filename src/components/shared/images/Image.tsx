/* eslint-disable react/display-name */
import classNames from 'classnames';
import { forwardRef } from 'react';
import { useState } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  fallback?: any;
  className?: string;
}

const Image = forwardRef(
  ({ src, alt, fallback: customFallback = './assets/images/no-image.png', className }: ImageProps, ref: any) => {
    const [_fallback, setFallBack] = useState('');
    const handleError = () => {
      setFallBack(customFallback);
    };
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img className={classNames('', className)} ref={ref} src={_fallback || src} alt={alt} onError={handleError} />
    );
  }
);

export default Image;
