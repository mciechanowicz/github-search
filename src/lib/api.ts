import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: process.env.NEXT_PUBLIC_GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}` }
    : {},
});
