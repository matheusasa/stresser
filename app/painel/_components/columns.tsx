"use client";

import { ColumnDef } from "@tanstack/react-table";

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
  },
];
