import { db } from "@/lib/db";
import { fetchUserData } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();
    const { ipv4, iprange, port, concurrents, method, protocol, time, userId } = body;
    // Verifique se todos os campos obrigatórios estão presentes
    if (!ipv4 || !port || !concurrents || !method || !protocol || !time || !userId) {
      return new NextResponse("Campos faltando", { status: 400 });
    }
    const portint = parseInt(port)
    const timeint = parseInt(time)
    // Cria o registro do ataque no banco de dados
    const attack = await db.attack.create({
      data: {
        ipv4,
        ipRange: iprange ,
        port:portint,
        concurrents,
        method,
        protocol,
        time:timeint,
        running: true,
        user: {
          connect: { id: userId },
        },
      },
    });

    // Retorna uma resposta de sucesso com os detalhes do ataque
    return NextResponse.json({
      message: "Ataque enviado com sucesso!",
      attack: attack,
    });
  } catch (error) {
    console.error("[CREATE ATTACK]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    // Obtendo a URL da requisição
    const url = new URL(req.url);
    
    // Extraindo o parâmetro `userId` da query string
    const userId = url.searchParams.get('userId');

    // Verificando se o `userId` é fornecido
    if (!userId) {
      return new NextResponse('User ID is required', { status: 400 });
    }

    // Buscando os ataques do usuário autenticado
    const attacks = await db.attack.findMany({
      where: {
        userId: userId, // Filtra pelo ID do usuário
      },
      include: {
        user: true, // Inclui os dados do usuário relacionado
      },
      orderBy: {
        createdAt: 'desc', // Ordena os ataques do mais recente para o mais antigo
      },
    });

    // Retorna os ataques em formato JSON
    return NextResponse.json(attacks);
  } catch (error) {
    console.error('[GET ATTACKS]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}