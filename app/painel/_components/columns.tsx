import { Button } from "@/components/ui/button";
import { Attack } from "@/types";
import { fetchUserData } from "@/utils/auth";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

const handleButtonClick = async (data: Attack) => {
  const userId = await fetchUserData(); // Obtemos o ID do usuário aqui

  if (!userId) {
    console.error("Usuário não autenticado.");
    return;
  }
  try {
    const response = await fetch("/api/stop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Enviando os dados do formulário no corpo da solicitação
      body: JSON.stringify({
        id: data.id,
        ipv4: data.ipv4,
        iprange: data.ipRange,
        port: data.port,
        concurrents: data.concurrents,
        method: data.method,
        protocol: data.protocol,
        time: data.time,
        userId: userId,
        get: data.geo,
      }),
    });

    if (!response.ok) {
      throw new Error("Falha ao criar o Ataque!");
    }

    const createAttack = await response.json();
    console.log("Ataque parado com sucesso", createAttack);
  } catch (error) {
    console.error("Erro ao parar o attack:", error);
  }
};

export type OrderColumn = {
  Target: number;
  Port: number;
  Method: string;
  Running: boolean;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "ipv4",
    header: "Target",
  },
  {
    accessorKey: "port",
    header: "Port",
  },
  {
    accessorKey: "method",
    header: "Method",
  },
  {
    accessorKey: "running",
    header: "Running",
    cell: ({ row }) => (
      row.original.running ? (
        <Button
          onClick={() => handleButtonClick(row.original)}
          variant="destructive"
        >
          STOP
        </Button>
      ) : (
        <span>Parado</span>
      )
    ),
  },
];
