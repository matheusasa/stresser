// pages/api/auth/signout.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; // Importe a função correta

export async function POST() {
  // Cria uma resposta JSON
  const response = NextResponse.json({ message: 'Logged out successfully' });

  // Acessa o cookie store
  const cookieStore = cookies(); 

  // Remove o cookie 'token'
  cookieStore.delete('token');

  return response;
}
