"use client";

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

// Configuração do gráfico para uma única linha
const chartConfig = {
  attacks: {
    label: "Attacks",
    color: "#0075FF", // Cor ajustada para #0075FF
  },
} satisfies ChartConfig;

// Tipagem para os dados de ataque
interface AttackData {
  date: string;
  count: number;
}

// Componente que agora recebe os dados como prop
export function ChartDash({ data }: { data: AttackData[] }) {
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
          style={{ width: 900, height: 300 }}
        >
          <AreaChart
            data={data}
            margin={{
              left: 12,
              right: 12,
              top: 20,
              bottom: 20,
            }}
            style={{ width: "500", height: 300 }} // Ajuste a largura aqui
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
              fill="#0075FF" // Cor ajustada para #0075FF
              fillOpacity={0.4}
              stroke="#0075FF" // Cor ajustada para #0075FF
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
