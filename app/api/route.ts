export const dynamic = 'force-dynamic'; // static by default, unless reading the request
// import { sql } from '@vercel/postgres';

export function GET(request: Request) {
  return new Response(`Hello from ${process.env.VERCEL_REGION}`);
}