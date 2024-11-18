export const dynamic = 'force-dynamic'; // static by default, unless reading the request
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT * FROM mashonka_todos
    `;
    return NextResponse.json(rows)
  } catch (error) {
    console.log('Error querying the database:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}