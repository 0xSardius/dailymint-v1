import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { APP_NAME, APP_DESCRIPTION, APP_URL } from "./constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFarcasterMetadata() {
  return {
    name: APP_NAME,
    description: APP_DESCRIPTION,
    icon: `${APP_URL}/icon.png`,
    url: APP_URL,
  }
}

export function getFrameEmbedMetadata() {
  return {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    image: `${APP_URL}/api/opengraph-image`,
    url: APP_URL,
  }
}
