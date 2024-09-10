import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

export const openPopup = (url: string) => {
  window.open(
    url,
    "popupWindow",
    "width=500,height=600,left=200,top=200,resizable=no,scrollbars=yes"
    
  );
};