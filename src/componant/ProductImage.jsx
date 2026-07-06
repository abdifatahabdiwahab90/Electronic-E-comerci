import { useState } from "react";
import { fallbackImage } from "../data/productImages";

export function getBadgeStyle(product) {
  if (!product) return null;

  if (product.discount && !product.badge) {
    return { text: product.discount, color: "bg-orange-500" };
  }

  const badge = product.badge?.toUpperCase() || "";

  if (badge.includes("SALE") || badge === "HOT SALE") {
    return { text: product.badge, color: "bg-red-500" };
  }
  if (badge === "NEW") {
    return { text: product.badge, color: "bg-emerald-500" };
  }
  if (badge.includes("BEST") || badge === "POPULAR") {
    return { text: product.badge, color: "bg-purple-500" };
  }
  if (product.discount) {
    return { text: product.discount, color: "bg-orange-500" };
  }
  if (product.badge) {
    return { text: product.badge, color: "bg-cyan-500" };
  }

  return null;
}

export function getTagStyle(tag) {
  if (!tag) return null;

  const label = tag.toUpperCase();

  if (label.includes("SALE") || label.includes("DEAL") || label === "HOT DEAL") {
    return { text: tag, color: "bg-red-500" };
  }
  if (label.includes("NEW")) {
    return { text: tag, color: "bg-emerald-500" };
  }
  if (
    label.includes("BEST") ||
    label.includes("TRENDING") ||
    label.includes("POPULAR") ||
    label.includes("EDITOR")
  ) {
    return { text: tag, color: "bg-purple-500" };
  }

  return { text: tag, color: "bg-orange-500" };
}

function ProductImage({
  product,
  src,
  alt,
  tag,
  className = "",
  rounded = "rounded-2xl",
  aspect = "aspect-square",
  showBadge = true,
  hover = false,
  badgeClassName = "left-3 top-3",
}) {
  const initialSrc = src || product?.image || product?.images?.[0] || fallbackImage;
  const [imageSrc, setImageSrc] = useState(initialSrc);
  const altText = alt || product?.name || "Product";
  const badge = tag ? getTagStyle(tag) : getBadgeStyle(product);

  const hasFixedSize = /\bh-\S+/.test(className) && /\bw-\S+/.test(className);
  const aspectClass = hasFixedSize ? "" : aspect;

  return (
    <div
      className={`relative overflow-hidden ${aspectClass} ${rounded} ${className}`}
    >
      <img
        src={imageSrc}
        alt={altText}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setImageSrc(fallbackImage)}
        className={`h-full w-full object-cover ${hover ? "transition duration-500 group-hover:scale-105" : ""}`}
      />

      {showBadge && badge && (
        <span
          className={`product-badge ${badgeClassName} ${badge.color}`}
        >
          {badge.text}
        </span>
      )}
    </div>
  );
}

export default ProductImage;
