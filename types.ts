export interface Attack {
  id: number;
  ipv4: string;
  ipRange: string | null; // De acordo com o Prisma schema
  port: number;
  time: number;
  protocol: string;
  method: string;
  concurrents: number;
  running: boolean;
  createdAt: Date;
  userId: string;
  geo:string
}
  export interface AttackData {
    date: string;
    count: number;
  }