export const dynamic = 'force-dynamic'; // static by default, unless reading the request
import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, completed } = body;
    const result = await sql`
      UPDATE mashonka_todos
      SET completed = ${completed}
      WHERE id = ${id};
    `;

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Data to patch not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Data patched succesfully' })
  } catch (error) {
    console.log('Error querying the database:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}