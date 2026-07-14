"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";
import { FALLBACK_IMAGE } from "@/lib/images";

/**
 * next/image with a built-in fallback: if the remote photo fails to load,
 * swap to a clean local house graphic instead of a broken-image icon.
 */
export function SafeImage({ src, ...props }: ImageProps) {
  const [current, setCurrent] = useState(src);

  // Reset when the source prop changes (e.g. gallery thumbnail switch).
  useEffect(() => setCurrent(src), [src]);

  return (
    <Image
      {...props}
      src={current}
      onError={() => setCurrent(FALLBACK_IMAGE)}
    />
  );
}
