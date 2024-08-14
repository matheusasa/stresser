import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export async function POST(request: Request) {
  const { user, password } = await request.json();
  
  // Verifica o usuário
  const user1 = await db.user.findUnique({ where: { user } });
  if (!user1) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
  }

  // Verifica a senha
  const isMatch = await bcrypt.compare(password, user1.password);
  if (!isMatch) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
  }

  // Cria um token JWT
  const token = jwt.sign({ userId: user1.id }, JWT_SECRET, { expiresIn: '1h' });

  // Define o cookie no response
  const response = NextResponse.json({ message: 'Login successful' });
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Define como true em produção
    path: '/',
    maxAge: 3600, // 1 hour
  });

  return response;
}
