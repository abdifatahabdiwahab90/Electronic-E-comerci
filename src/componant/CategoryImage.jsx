import { useState, useEffect } from "react";
import { fallbackImage } from "../data/productImages";

function CategoryImage({ src, alt, className = "" }) {
  const [imageSrc, setImageSrc] = useState(src || fallbackImage);

  useEffect(() => {
    setImageSrc(src || fallbackImage);
  }, [src]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setImageSrc(fallbackImage)}
      className={className}
    />
  );
}

export default CategoryImage;
