export const dynamic = 'force-dynamic'; // static by default, unless reading the request
import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT * FROM mashonka_todos;
    `;
    return NextResponse.json(rows)
  } catch (error) {
    console.log('Error querying the database:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, text, completed } = body;
    await sql`
      INSERT INTO mashonka_todos (id, text, completed)
      VALUES (${id}, ${text}, ${completed});
    `;
    return NextResponse.json({ message: 'Data inserted succesfully' })
  } catch (error) {
    console.log('Error querying the database:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body;
    await sql`
      DELETE FROM mashonka_todos
      WHERE id = ${id};
    `;
    return NextResponse.json({ message: 'Data inserted succesfully' })
  } catch (error) {
    console.log('Error querying the database:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}