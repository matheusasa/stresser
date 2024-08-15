"use client";

import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormField,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUserData } from "@/utils/auth";

const formSchema = z.object({
  ipv4: z
    .string()
    .regex(
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
      "Invalid IPv4 address"
    ),
  iprange: z.string().min(2).max(50),
  port: z.string(), // Portas válidas de 1 a 65535
  time: z.string(), // Tempo mínimo de 1 segundo até 1 hora
  protocol: z.string().min(2).max(50),
  method: z.string().min(2).max(50),
  concurrents: z.number().min(1).max(10),
  geo: z.string().min(1)
});

const formSchema1 = z.object({
  url: z
    .string()
    .regex(
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
      "Invalid IPv4 address"
    ),
  iprange: z.string().min(2).max(50),
  port: z.string(),
  time: z.string(), // Tempo mínimo de 1 segundo até 1 hora
  concurrents: z.number().min(1).max(10),
  method: z.string().min(2).max(50),

});

const MainPainel = () => {
  const router = useRouter();
  const [attackData, setAttackData] = useState<any[]>([]); // Estado para armazenar os dados dos ataques
  const [concurrentsValue, setConcurrentsValue] = useState(1); // Estado para
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      concurrents:0
    }
  });
  const form1 = useForm<z.infer<typeof formSchema1>>({
    resolver: zodResolver(formSchema1),
  });
  const fetchAttacks = async () => {
    const userId = await fetchUserData(); // Obtém o ID do usuário

    if (!userId) {
      console.error("Usuário não autenticado.");
      return;
    }

    try {
      const response = await fetch(`/api/send?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch attacks");
      }

      const data = await response.json();
      setAttackData(data); // Atualiza o estado com os dados dos ataques
    } catch (error) {
      console.error("Error fetching attacks:", error);
    }
  };
  

  useEffect(() => {
    fetchAttacks(); // Busca os dados dos ataques ao montar o componente
  }, []);

  const onSubmit4 = async (data: z.infer<typeof formSchema>) => {
    const userId = await fetchUserData(); // Obtemos o ID do usuário aqui
    if (!userId) {
      console.error("Usuário não autenticado.");
      return;
    }
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Enviando os dados do formulário no corpo da solicitação
        body: JSON.stringify({
          ipv4: data.ipv4,
          iprange: data.iprange,
          port: data.port,
          concurrents: data.concurrents,
          method: data.method,
          protocol: data.protocol,
          time: data.time,
          userId: userId,
          geo:data.geo
        }),
      });

      if (!response.ok) {
        throw new Error("Falha ao criar o Ataque!");
      }

      const createAttack = await response.json();
      console.log("Ataque enviado com sucesso", createAttack);



      // Atualiza a página ou navega para outra página, se necessário
      router.refresh();
    } catch (error) {
      console.error("Erro ao enviar o attack:", error);
    }

  };
  const onSubmit7 = async (data: z.infer<typeof formSchema1>) => {
    const userId = await fetchUserData(); // Obtemos o ID do usuário aqui

    if (!userId) {
      console.error("Usuário não autenticado.");
      return;
    }
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Enviando os dados do formulário no corpo da solicitação
        body: JSON.stringify({
          url: data.url,
          iprange: data.iprange,
          port: data.port,
          method: data.method,
          userId: userId,

        }),
      });

      if (!response.ok) {
        throw new Error("Falha ao criar o Ataque!");
      }

      const createAttack = await response.json();
      console.log("Ataque enviado com sucesso", createAttack);

      // Limpa os dados do formulário
      form.reset();

      // Atualiza a página ou navega para outra página, se necessário
      router.refresh();
    } catch (error) {
      console.error("Erro ao enviar o attack:", error);
    }
  };

  return (
    <div className="flex justify-center items-center text-white">
      <div className="max-w-[1140px]">
        <div className="text-white text-4xl px-10 pt-[64px] font-bold">
          Painel/Log
        </div>
        <div className="lg:flex lg:justify-between">
          <div className="lg:mr-[110px]">
            <div className="py-[32px] px-10">Attack Panel</div>
            <div className="px-10 lg:pb-[80px]">
              <Tabs defaultValue="Layer4" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="Layer4">Layer4</TabsTrigger>
                  <TabsTrigger value="Layer7">Layer7</TabsTrigger>
                </TabsList>
                <TabsContent value="Layer4">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit4)}>
                      <div className="pt-[32px] flex">
                        <FormField
                          control={form.control}
                          name="ipv4"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>IPV4</FormLabel>
                              <FormControl>
                                <Input
                                  className=" h-[50px] w-[300px] text-white border-[#343434]"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <div className="px-5">
                          <FormField
                            control={form.control}
                            name="iprange"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>IP Range</FormLabel>
                                <FormControl>
                                  <Select
                                    onValueChange={(value) =>
                                      field.onChange(value)
                                    }
                                    value={field.value}
                                  >
                                    <SelectTrigger className="w-[80px] h-[50px] bg-transparent border-[#343434]">
                                      <SelectValue placeholder="32" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-black text-white">
                                      <SelectItem value="range1">
                                        Range 1
                                      </SelectItem>
                                      <SelectItem value="range2">
                                        Range 2
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="py-[20px]">
                        <FormField
                          control={form.control}
                          name="port"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Port</FormLabel>
                              <FormControl>
                                <Input
                                  type="string"
                                  className=" h-[50px] w-full text-white border-[#343434]"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex">
                        <div>
                          <FormField
                            control={form.control}
                            name="time"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Time</FormLabel>
                                <FormControl>
                                  <Input
                                    type="string"
                                    className=" h-[50px] w-[150px] text-white border-[#343434]"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="px-5">
                          <FormField
                            control={form.control}
                            name="protocol"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Protocol</FormLabel>
                                <FormControl>
                                  <Select
                                    onValueChange={(value) =>
                                      field.onChange(value)
                                    }
                                    value={field.value}
                                  >
                                    <SelectTrigger className="w-[180px] h-[50px] bg-transparent border-[#343434]">
                                      <SelectValue placeholder="Select Protocol" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-black text-white">
                                      <SelectItem value="tcp">TCP</SelectItem>
                                      <SelectItem value="udp">UDP</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="py-[20px]">
                        <FormField
                          control={form.control}
                          name="method"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Method</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={(value) =>
                                    field.onChange(value)
                                  }
                                  value={field.value}
                                >
                                  <SelectTrigger className="w-full h-[50px] bg-transparent border-[#343434]">
                                    <SelectValue placeholder="Select Method" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-black text-white">
                                  <SelectItem value="SOCKET">SOCKET</SelectItem>
                                    <SelectItem value="FASTSOCKET">FASTSOCKET</SelectItem>
                                    <SelectItem value="TFO">TFO</SelectItem>
                                    <SelectItem value="TCP-TLS">TCP-TLS</SelectItem>
                                    <SelectItem value="FIVEM">FIVEM</SelectItem>
                                    <SelectItem value="DNS">DNS</SelectItem>
                                    <SelectItem value="OVH">OVH</SelectItem>
                                    <SelectItem value="PAPING">PAPING</SelectItem>
                                    <SelectItem value="TCPLEGIT">TCPLEGIT</SelectItem>
                                    <SelectItem value="SYNBYPASS">SYNBYPASS</SelectItem>
                                    <SelectItem value="TCPAMP">TCPAMP</SelectItem>
                                    <SelectItem value="MTA">MTA</SelectItem>
                                    <SelectItem value="TCPSIG">TCPSIG</SelectItem>
                                    <SelectItem value="ARD">ARD</SelectItem>
                                    <SelectItem value="DNP">DNP</SelectItem>
                                    <SelectItem value="WRABOTNET">WRABOTNET</SelectItem>
                                    <SelectItem value="TS3">TS3</SelectItem>
                                    <SelectItem value="UDPBYPASS">UDPBYPASS</SelectItem>
                                    <SelectItem value="UDPCUSTOM">UDPCUSTOM</SelectItem>
                                    <SelectItem value="FIVEMV2">FIVEMV2</SelectItem>
                                    <SelectItem value="GRE">GRE</SelectItem>
                                    <SelectItem value="DIV">DIV</SelectItem>
                                    <SelectItem value="IPX">IPX</SelectItem>
                                    <SelectItem value="ICMP">ICMP</SelectItem>
                                    <SelectItem value="DOMINATE">DOMINATE</SelectItem>
                                    <SelectItem value="ESP">ESP</SelectItem>
                                    <SelectItem value="IPRAND">IPRAND</SelectItem>
                                    <SelectItem value="QOTD">QOTD</SelectItem>
                                    <SelectItem value="AMONGUS">AMONGUS</SelectItem>
                                    <SelectItem value="STUN">STUN</SelectItem>
                                    <SelectItem value="FIVEMPROXY">FIVEMPROXY</SelectItem>
                                    <SelectItem value="NTP">NTP</SelectItem>
                                    <SelectItem value="TCPKILLER">TCPKILLER</SelectItem>
                                    <SelectItem value="ping">ping</SelectItem>
                                    <SelectItem value="join">join</SelectItem>
                                    <SelectItem value="UDPA2S">UDPA2S</SelectItem>
                                    <SelectItem value="TCPMB">TCPMB</SelectItem>
                                    <SelectItem value="TCPBYPASSV2">TCPBYPASSV2</SelectItem>
                                    <SelectItem value="ICMPBOTNET">ICMPBOTNET</SelectItem>
                                    <SelectItem value="VSEBOTNET">VSEBOTNET</SelectItem>
                                    <SelectItem value="ACKBOTNET">ACKBOTNET</SelectItem>
                                    <SelectItem value="SYNBOTNET">SYNBOTNET</SelectItem>
                                    <SelectItem value="UDPPPSBOTNET">UDPPPSBOTNET</SelectItem>
                                    <SelectItem value="UDPBOTNET">UDPBOTNET</SelectItem>
                                    <SelectItem value="OVHTCP">OVHTCP</SelectItem>
                                    <SelectItem value="OVHUDP">OVHUDP</SelectItem>
                                    <SelectItem value="TCPSW">TCPSW</SelectItem>
                                    <SelectItem value="HANDSHAKE">HANDSHAKE</SelectItem>
                                    <SelectItem value="TCPOPTION">TCPOPTION</SelectItem>
                                    <SelectItem value="WRA">WRA</SelectItem>
                                    <SelectItem value="ACK">ACK</SelectItem>
                                    <SelectItem value="SYN">SYN</SelectItem>
                                    <SelectItem value="CS16">CS16</SelectItem>
                                    <SelectItem value="MCPE">MCPE</SelectItem>
                                    <SelectItem value="UDPRUST">UDPRUST</SelectItem>
                                    <SelectItem value="UDPGMOD">UDPGMOD</SelectItem>
                                    <SelectItem value="SAMP">SAMP</SelectItem>
                                    <SelectItem value="DISCORD">DISCORD</SelectItem>
                                    <SelectItem value="VALVE">VALVE</SelectItem>
                                    <SelectItem value="RAKNET">RAKNET</SelectItem>
                                    <SelectItem value="UDPPPS">UDPPPS</SelectItem>
                                    <SelectItem value="MIXAMP">MIXAMP</SelectItem>
                                    <SelectItem value="COAP">COAP</SelectItem>
                                    <SelectItem value="WSD">WSD</SelectItem>
                                    <SelectItem value="SNMP">SNMP</SelectItem>
                                    <SelectItem value="SSDP">SSDP</SelectItem>
                                    <SelectItem value="SADP">SADP</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="">
                        <FormField
                          control={form.control}
                          name="concurrents"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Concurrents</FormLabel>
                              <Slider
                                className="pt-5 bg-transparent"
                                defaultValue={[field.value]} // Inicializa com o valor do campo
                                max={10}
                                step={1}
                                onValueChange={(value) => {
                                  field.onChange(value[0]);
                                  setConcurrentsValue(value[0]);
                                }}
                              />
                              <div className="ml-4 text-lg">
                                {concurrentsValue}
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="py-[20px]">
                      <FormField
                          control={form.control}
                          name="geo"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Geolocalization</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={(value) => field.onChange(value)} // Atualiza o valor do campo
                                  value={field.value} // Define o valor atual
                                >
                                  <SelectTrigger className="w-full h-[50px] bg-transparent  border-[#343434]">
                                    <SelectValue placeholder="Select Geo" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-black text-white">
                                    <SelectItem value="World">World Wide</SelectItem>
                                    <SelectItem value="China">China</SelectItem>
                                    <SelectItem value="Brazil">Brazil</SelectItem>
                                    <SelectItem value="Russia">Russia</SelectItem>
                                    <SelectItem value="Japan">Japan</SelectItem>
                                    <SelectItem value="Thailand">Thailand</SelectItem>
                                    <SelectItem value="Korea">Korea</SelectItem>
                                    <SelectItem value="Vietnam">Vietnam</SelectItem>
                                    <SelectItem value="Indonesia">Indonesia</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div>
                        <Button
                          type="submit"
                          className="w-full bg-custom-blue hover:bg-gradient-start rounded-full"
                        >
                          Attack
                        </Button>
                      </div>
                    </form>
                  </Form>
                </TabsContent>
                <TabsContent value="Layer7">
                  <Form {...form1}>
                    <form onSubmit={form1.handleSubmit(onSubmit7)}>
                      <div className="pt-[32px] flex">
                        <FormField
                          control={form1.control}
                          name="url"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>IPV4</FormLabel>
                              <FormControl>
                                <Input
                                  className="bg-[#000] h-[50px] w-[300px] text-white border-[#343434]"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <div className="px-5">
                          <FormField
                            control={form1.control}
                            name="iprange"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>IP Range</FormLabel>
                                <FormControl>
                                  <Select
                                    onValueChange={(value) =>
                                      field.onChange(value)
                                    }
                                    value={field.value}
                                  >
                                    <SelectTrigger className="w-[80px] h-[50px] bg-black border-[#343434]">
                                      <SelectValue placeholder="32" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-black text-white">
                                      <SelectItem value="range1">
                                        Range 1
                                      </SelectItem>
                                      <SelectItem value="range2">
                                        Range 2
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="py-[20px] flex">
                        <FormField
                          control={form1.control}
                          name="port"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Port</FormLabel>
                              <FormControl>
                                <Input
                                  type="string"
                                  className="bg-[#000] h-[50px] w-full text-white border-[#343434]"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        /><div className="pl-[44px]">
                        <FormField
                          control={form.control}
                          name="time"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Time</FormLabel>
                              <FormControl>
                                <Input
                                  type="string"
                                  className="bg-[#000] h-[50px] w-[150px] text-white border-[#343434]"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      </div>
                      <div className="pb-[20px]">
                        <FormField
                          control={form1.control}
                          name="method"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Method</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={(value) =>
                                    field.onChange(value)
                                  }
                                  value={field.value}
                                >
                                  <SelectTrigger className="w-full h-[50px] bg-black border-[#343434]">
                                    <SelectValue placeholder="Select Method" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-black text-white">
                                    <SelectItem value="BROWSER">BROWSER</SelectItem>
                                    <SelectItem value="COOKIE">COOKIE</SelectItem>
                                    <SelectItem value="HTTP1">HTTP1</SelectItem>
                                    <SelectItem value="HTTP2">HTTP2</SelectItem>
                                    <SelectItem value="HTTPPOST">HTTPPOST</SelectItem>
                                    <SelectItem value="HTTP-NODUS">HTTP-NODUS</SelectItem>
                                    <SelectItem value="HTTP2-RAW">HTTP2-RAW</SelectItem>
                                    <SelectItem value="HTTP1-RAW">HTTP1-RAW</SelectItem>
                                    <SelectItem value="HTTP-BYPASS">HTTP-BYPASS</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="">
                        <FormField
                          control={form.control}
                          name="concurrents"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Concurrents</FormLabel>
                              <Slider
                                className="pt-5"
                                defaultValue={[field.value]} // Inicializa com o valor do campo
                                max={10}
                                step={1}
                                onValueChange={(value) => {
                                  field.onChange(value[0]);
                                  setConcurrentsValue(value[0]);
                                }}
                              />
                              <div className="ml-4 text-lg">
                                {concurrentsValue}
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>                    
                      <div>
                        <Button
                          type="submit"
                          className="w-full bg-custom-blue hover:bg-gradient-start rounded-full"
                        >
                          Attack
                        </Button>
                      </div>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <div>
            <div className="py-[32px] px-10">Attack Log</div>
            <div className="px-10">
              <div className="">
                <DataTable
                  searchKey="ipv4"
                  columns={columns}
                  data={attackData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPainel;
