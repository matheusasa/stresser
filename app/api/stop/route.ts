import { db } from "@/lib/db";
import { fetchUserData } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      // Parse the request body
      const body = await req.json();
      const {id, ipv4, iprange, port, concurrents, method, protocol, time, userId, geo } = body;
      // Verifique se todos os campos obrigatórios estão presentes
      if (!ipv4 || !port || !concurrents || !method || !protocol || !time || !userId) {
        return new NextResponse("Campos faltando", { status: 400 });
      }
      const portint = parseInt(port)
      const timeint = parseInt(time)
      const newiprange = 32 
      if(geo){
        try {
        const response = await fetch(`https://api.vacstresser.ru/api?stop=2820f129-e51f-4121-8d41-c52d18a546dd&host=${ipv4}&port=${portint}&method=${method}&time=${timeint}&geo=${geo}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch attacks");
        }
        const data = await response.json()
        
      } catch (error) {
        console.error("Error fetching attacks:", error);
      }

    }
  
      // Cria o registro do ataque no banco de dados
      const attack = await db.attack.update({
        where:{
            id
        },
        data:{
            running:false
        }
      });
  
      // Retorna uma resposta de sucesso com os detalhes do ataque
      return NextResponse.json({
        message: "Ataque parado com sucesso!",
        attack: attack,
      });
    } catch (error) {
      console.error("[STOP ATTACK]", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }