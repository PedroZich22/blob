import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Rotas que não precisam de autenticação
const publicRoutes = ["/", "/login", "/register", "/api/auth", "/explore"];

// Rotas que sempre redirecionam para home se autenticado
const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;
  const path = request.nextUrl.pathname;

  // Redireciona usuários autenticados tentando acessar login/register
  if (isAuthenticated && authRoutes.some(route => path.startsWith(route))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Permite acesso a rotas públicas
  if (publicRoutes.some(route => path.startsWith(route))) {
    return NextResponse.next();
  }

  // Redireciona para login se tentar acessar rota protegida sem autenticação
  if (!isAuthenticated) {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodeURIComponent(path)}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
