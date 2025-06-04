import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isAuthenticated() {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken !== null;
}
