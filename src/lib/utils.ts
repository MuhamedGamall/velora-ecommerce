import { urlFor } from "@/sanity/lib/image";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export function formatNumber(number: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    maximumFractionDigits: 2,
  });

  if (number >= 1e9) return formatter.format(number / 1e9) + "b";
  if (number >= 1e6) return formatter.format(number / 1e6) + "m";
  if (number >= 1e3) return formatter.format(number / 1e3) + "k";
  return formatter.format(number);
}
export function formatPrice(price: number) {
  const isIntegerPrice = Number.isInteger(price);
  const maximumFractionDigits = isIntegerPrice ? 0 : 1;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    maximumFractionDigits,
    currency: "EGP",
  });

  if (price >= 1e9) return formatter.format(price / 1e9) + "b";
  if (price >= 1e6) return formatter.format(price / 1e6) + "m";
  if (price >= 1e3) return formatter.format(price / 1e3) + "k";
  return formatter.format(price);
}
export const openPopup = (url: string) => {
  window.open(
    url,
    "popupWindow",
    "width=500,height=600,left=200,top=200,resizable=no,scrollbars=yes"
  );
};

export const truncateText = (text: string, limit: number) => {
  return text?.length > limit ? text?.substring(0, limit) + "..." : text;
};

export function isNewSeason(createdAt: string) {
  //  last 7 days products
  // const now = new Date();
  // const createdDate = new Date(createdAt);
  // const timeRange = 7 * 24 * 60 * 60 * 1000; // 15 days in milliseconds
  // return now.getTime() - createdDate.getTime() <= timeRange;
const currentYear = new Date().getFullYear();
return createdAt.includes(currentYear+'')
}
export const toUrl = (image: any) => urlFor(image).toString();
