// pages/api/user.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import { db } from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export async function GET(req: NextRequest) {
  const cookies = parse(req.headers.get('cookie') || '');
  const token = cookies.token;

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    // Obtém o usuário do banco de dados
    const user = await db.user.findUnique({ where: { id: decoded.userId } });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('[USER GET]', error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
