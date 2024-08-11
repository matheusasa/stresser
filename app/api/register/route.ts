import { NextResponse } from "next/server";
import { hash } from "bcryptjs"; // Para hash da senha
import { db } from "@/lib/db";


export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const body = await req.json();
      const { name, user, email, password, image } = body;
      

      // Validação básica dos campos
      if (!user || !email || !password) {
        return new NextResponse("Missing fields", { status: 400 });
      }

      // Verificar se o usuário ou email já existe
      const existingUser = await db.user.findFirst({
        where: {
          OR: [
            { email: email },
            { user: user },
          ],
        },
      });

      if (existingUser) {
        return new NextResponse("User or email already exists", { status: 409 });
      }

      // Hash da senha
      const hashedPassword = await hash(password, 10);

      // Criação do novo usuário
      const newUser = await db.user.create({
        data: {
          name: name || null,
          user: user,
          email: email,
          password: hashedPassword,
          image: image || null, // Define `null` se a imagem não for fornecida
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      return NextResponse.json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      console.error("[REGISTER]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  } else {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }
}
