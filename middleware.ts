import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token'); // Obtém o token dos cookies

  // Redireciona para a página de login se não houver token
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next(); // Permite o acesso se o token estiver presente
}

// Aplica o middleware para todas as rotas sob `/painel`
export const config = {
  matcher: ['/painel/:path*'],
};
