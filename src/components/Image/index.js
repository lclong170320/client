import { useState } from 'react';
import image from '../../assets/images';

function Image({ src, alt, ...props }) {
  const [fallback, setFallback] = useState('');

  const handleError = () => {
    setFallback(image.noImage);
  };

  return <img src={fallback || src} alt={alt} {...props} onError={handleError} />;
}

export default Image;
