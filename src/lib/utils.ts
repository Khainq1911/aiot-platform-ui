import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isAuthenticated() {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
}

export function getUser() {
  const accessToken = isAuthenticated();
  const user: { name: string } = jwtDecode(accessToken as string);
  return user;
}

export const formatDate = (date: string | Date, format = "YYYY-MM-DD HH:mm") =>
  dayjs(date).format(format);
