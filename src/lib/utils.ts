import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function splitTags(tags: string | null) {
  if (tags === null) {
    return [];
  }
  return tags.split(",").map(tag => tag.trim());
}


