import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  
  // Verifica o usuário
  const emails = await db.user.findUnique({ where: { email } });
  if (!emails) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
  }

  // Verifica a senha
  const isMatch = await bcrypt.compare(password, emails.password);
  if (!isMatch) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
  }

  // Cria um token JWT
  const token = jwt.sign({ userId: emails.id }, JWT_SECRET, { expiresIn: '1h' });
  
  

  return NextResponse.json({ token });
}
