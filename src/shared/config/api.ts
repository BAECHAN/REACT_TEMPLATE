const API_BASE_URL: string =
  (import.meta.env.VITE_API_BASE_URL as string) || 'https://jsonplaceholder.typicode.com';

const API_ENDPOINTS: Record<string, string> = {
  POSTS: '/posts',
  USERS: '/users',
} as const;

export { API_BASE_URL, API_ENDPOINTS };
