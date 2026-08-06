import axios from 'axios';
export const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000' });
api.interceptors.request.use((config) => { const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null; if (token) config.headers.Authorization = `Bearer ${token}`; return config; });
export type Tokens = { accessToken: string; refreshToken: string };
export function saveTokens(tokens: Tokens) { localStorage.setItem('accessToken', tokens.accessToken); localStorage.setItem('refreshToken', tokens.refreshToken); }
