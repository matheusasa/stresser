import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const MainPainel = () => {
  return (
    <div className="flex justify-center items-center text-white  ">
      <div className="max-w-[1140px]">
        <div className="text-white text-4xl px-10 pt-[64px] font-bold">
          Painel/Log
        </div>
        <div className="lg:flex lg:justify-between">
          <div className="lg:mr-[110px]  ">
            <div className="py-[32px] px-10">Attack Panel</div>
            <div className="px-10">
              {" "}
              <Tabs defaultValue="Layer4" className="w-[400px]  ">
                <TabsList className="grid w-full grid-cols-2 ">
                  <TabsTrigger value="Layer4">Layer4</TabsTrigger>
                  <TabsTrigger value="Layer7">Layer7</TabsTrigger>
                </TabsList>
                <TabsContent value="Layer4">
                  <div className="pt-[32px] flex">
                    <div>
                      <Label>IPV4</Label>
                      <Input className="bg-[#000] h-[50px] w-[300px] text-white border-[#343434]" />
                    </div>
                    <div className="px-5">
                      <Label>IP Range</Label>
                      <Select>
                        <SelectTrigger className="w-[80px] h-[50px] bg-black border-[#343434]">
                          <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent className="bg-black texxt-white">
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>{" "}
                    </div>
                  </div>
                  <div className="py-[20px]">
                    <Label>Port</Label>
                    <Input
                      type="number"
                      className="bg-[#000] h-[50px] w-full text-white border-[#343434]"
                    />
                  </div>
                  <div className=" flex">
                    <div>
                      <Label>Time</Label>
                      <Input
                        placeholder="30"
                        className="bg-[#000] h-[50px] w-[150px] text-white border-[#343434]"
                      />
                    </div>
                    <div className="px-5">
                      <Label>30 / 0 Protocol</Label>
                      <Select>
                        <SelectTrigger className="w-[180px] h-[50px] bg-black border-[#343434]">
                          <SelectValue placeholder="Amplification" />
                        </SelectTrigger>
                        <SelectContent className="bg-black texxt-white">
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>{" "}
                    </div>
                  </div>
                  <div className="py-[20px]">
                    <Label>Method</Label>
                    <Select>
                      <SelectTrigger className="w-full h-[50px] bg-black border-[#343434]">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent className="bg-black texxt-white">
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="pb-[32px]">
                    <Label>Concurrents</Label>
                    <Slider
                      className="pt-5"
                      defaultValue={[1]}
                      max={10}
                      step={1}
                    />
                  </div>
                  <div>
                    <Button className="w-full bg-[#4A9FFF] rounded-full">
                      Attack
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="Layer7">
                  <div className="pt-[32px] flex">
                    <div>
                      <Label>IPV4</Label>
                      <Input className="bg-[#000] h-[50px] w-[300px] text-white border-[#343434]" />
                    </div>
                    <div className="px-5">
                      <Label>IP Range</Label>
                      <Select>
                        <SelectTrigger className="w-[80px] h-[50px] bg-black border-[#343434]">
                          <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent className="bg-black texxt-white">
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>{" "}
                    </div>
                  </div>
                  <div className="py-[20px]">
                    <Label>Port</Label>
                    <Input
                      type="number"
                      className="bg-[#000] h-[50px] w-full text-white border-[#343434]"
                    />
                  </div>
                  <div className=" flex">
                    <div>
                      <Label>Time</Label>
                      <Input
                        placeholder="30"
                        className="bg-[#000] h-[50px] w-[150px] text-white border-[#343434]"
                      />
                    </div>
                    <div className="px-5">
                      <Label>30 / 0 Protocol</Label>
                      <Select>
                        <SelectTrigger className="w-[180px] h-[50px] bg-black border-[#343434]">
                          <SelectValue placeholder="Amplification" />
                        </SelectTrigger>
                        <SelectContent className="bg-black texxt-white">
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>{" "}
                    </div>
                  </div>
                  <div className="py-[20px]">
                    <Label>Method</Label>
                    <Select>
                      <SelectTrigger className="w-full h-[50px] bg-black border-[#343434]">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent className="bg-black texxt-white">
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="pb-[32px]">
                    <Label>Concurrents</Label>
                    <Slider
                      className="pt-5"
                      defaultValue={[1]}
                      max={10}
                      step={1}
                    />
                  </div>
                  <div>
                    <Button className="w-full bg-[#4A9FFF] rounded-full">
                      Attack
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <div className="">
            <div className="py-[32px] px-10">Attack Log</div>
            <div className="px-10">
              <div className="flex items-center">
                <Input
                  placeholder="Filter target"
                  className="bg-[#000] h-[50px] w-full lg:w-[306px] text-white border-[#343434]"
                />
                <div className="px-3">
                  <Button
                    variant={"destructive"}
                    className="w-[178px] rounded-xl"
                  >
                    {" "}
                    Stop All
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPainel;
