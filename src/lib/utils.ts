import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isAuthenticated() {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
}

export function getUser() {
  const accessToken = isAuthenticated();
  const user = jwtDecode(accessToken as string);
  return user;
}
