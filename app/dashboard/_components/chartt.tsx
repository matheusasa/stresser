"use client";

import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Função para buscar ataques dos últimos 7 dias
const fetchAttackData = async (userId: string) => {
  try {
    const response = await fetch(`/api/send?userId=${userId}`);
    console.log("Response Status:", response.status); // Verifique o status da resposta
    if (!response.ok) {
      throw new Error("Erro ao buscar dados dos ataques");
    }
    const data = await response.json();
    console.log("Dados da API:", data); // Verifique os dados recebidos
    return data;
  } catch (error) {
    console.error("Erro na função fetchAttackData:", error);
    throw error;
  }
};

// Configuração do gráfico para uma única linha
const chartConfig = {
  attacks: {
    label: "Attacks",
    color: "hsl(var(--chart-1))", // Ajuste a cor conforme necessário
  },
} satisfies ChartConfig;

export function ChartDash() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null); // Assume que você tem algum mecanismo para obter o userId

  useEffect(() => {
    console.log("userId:", userId); // Verifique se userId está definido
    if (userId) {
      fetchAttackData(userId)
        .then((data) => {
          console.log("Dados recebidos da API:", data);

          // Filtrar e contar ataques nos últimos 7 dias
          const today = new Date();
          const last7Days = Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(today.getDate() - i);
            return date.toISOString().split("T")[0]; // Obtém a data no formato YYYY-MM-DD
          }).reverse();

          // Contar ataques por data
          const attackCounts = last7Days.map((date) => ({
            date,
            count: data.filter((attack: any) => attack.date === date).length,
          }));

          console.log("Dados processados para o gráfico:", attackCounts);
          setChartData(attackCounts);
        })
        .catch((error) => {
          console.error("Erro ao carregar dados do gráfico:", error);
        });
    }
  }, [userId]);

  return (
    <Card className="bg-[#242424] border-[#242424]">
      <CardHeader>
        <CardTitle className="text-white">Attack Overview</CardTitle>
        <CardDescription>
          Últimos 7 dias mostrando o total de ataques
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-[#242424]">
        <ChartContainer
          config={chartConfig}
          style={{ width: "100%", height: "auto" }}
        >
          <AreaChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 20,
              bottom: 20,
            }}
            style={{ width: "100%", height: 300 }} // Ajuste a largura aqui
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: any) => value.slice(5)} // Mostra apenas o mês e o dia
            />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="count"
              type="monotone"
              fill="var(--color-attacks)"
              fillOpacity={0.4}
              stroke="var(--color-attacks)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
