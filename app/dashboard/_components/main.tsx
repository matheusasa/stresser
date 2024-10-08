"use client";
import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { ChartDash } from "./chartt";
import useAttacksData from "@/hooks/useAttacksData";
import { fetchUserData } from "@/utils/auth";
import { AttackData, Attack } from "@/types";

const MainDash: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const { attacks, loading, error } = useAttacksData(userId ?? "");

  useEffect(() => {
    const getUserId = async () => {
      const id = await fetchUserData();
      if (id) {
        setUserId(id);
      } else {
        console.error("Usuário não autenticado.");
      }
    };

    getUserId();
  }, []);

  if (!userId) {
    return <div className="text-white">Fetching user data...</div>;
  }

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-white">Error: {error}</div>;

  const totalAttacks = attacks.length;

  // Contar IPs únicos
  const uniqueIPv4s = new Set(attacks.map((attack) => attack.ipv4));
  const distinctIPv4Count = uniqueIPv4s.size;

  // Filtrar ataques em andamento
  const runningAttacks = attacks.filter((attack) => attack.running).length;

  const transformData = (attacks: Attack[]): AttackData[] => {
    const dataMap: { [key: string]: number } = {};

    attacks.forEach((attack) => {
      // Garantir que ipRange seja string | null
      const ipRange = attack.ipRange ?? null;

      // Verificar e converter createdAt para um objeto Date se necessário
      const date =
        typeof attack.createdAt === "string"
          ? new Date(attack.createdAt).toISOString().slice(0, 10)
          : attack.createdAt.toISOString().slice(0, 10);

      if (dataMap[date]) {
        dataMap[date] += 1;
      } else {
        dataMap[date] = 1;
      }
    });

    // Transformar o mapa em array de objetos e ordenar por data
    return Object.keys(dataMap)
      .map((date) => ({
        date,
        count: dataMap[date],
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const chartData = transformData(attacks);

  return (
    <div className="flex justify-center items-center text-white">
      <div className="max-w-[1140px]">
        <div className="text-white text-4xl font-bold px-10 pt-[64px]">
          Dashboard
        </div>
        <Separator className="w-full my-4" />
        <div className="grid grid-cols-2 lg:flex w-full justify-between text-white lg:px-5">
          <div className="px-5 flex flex-col justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="70"
              viewBox="0 0 37 36"
              fill="none"
            >
              <g filter="url(#filter0_d_78_174)">
                <rect
                  x="6"
                  y="2"
                  width="25"
                  height="25"
                  rx="6"
                  fill="#0075FF"
                />
              </g>
              <path
                d="M24.75 15.6364H12.25C11.9185 15.6364 11.6005 15.7705 11.3661 16.0091C11.1317 16.2478 11 16.5715 11 16.9091V20.7273C11 21.0648 11.1317 21.3885 11.3661 21.6272C11.6005 21.8659 11.9185 22 12.25 22H24.75C25.0815 22 25.3995 21.8659 25.6339 21.6272C25.8683 21.3885 26 21.0648 26 20.7273V16.9091C26 16.5715 25.8683 16.2478 25.6339 16.0091C25.3995 15.7705 25.0815 15.6364 24.75 15.6364ZM24.75 20.7273H12.25V16.9091H24.75V20.7273ZM24.75 8H12.25C11.9185 8 11.6005 8.13409 11.3661 8.37277C11.1317 8.61146 11 8.93518 11 9.27273V13.0909C11 13.4285 11.1317 13.7522 11.3661 13.9909C11.6005 14.2295 11.9185 14.3636 12.25 14.3636H24.75C25.0815 14.3636 25.3995 14.2295 25.6339 13.9909C25.8683 13.7522 26 13.4285 26 13.0909V9.27273C26 8.93518 25.8683 8.61146 25.6339 8.37277C25.3995 8.13409 25.0815 8 24.75 8ZM24.75 13.0909H12.25V9.27273H24.75V13.0909ZM23.5 11.1818C23.5 11.3706 23.445 11.5552 23.342 11.7121C23.239 11.8691 23.0926 11.9915 22.9213 12.0637C22.75 12.136 22.5615 12.1549 22.3796 12.118C22.1977 12.0812 22.0307 11.9903 21.8996 11.8568C21.7685 11.7233 21.6792 11.5532 21.643 11.368C21.6068 11.1829 21.6254 10.9909 21.6964 10.8165C21.7673 10.6421 21.8875 10.493 22.0417 10.3881C22.1958 10.2833 22.3771 10.2273 22.5625 10.2273C22.8111 10.2273 23.0496 10.3278 23.2254 10.5069C23.4012 10.6859 23.5 10.9287 23.5 11.1818ZM23.5 18.8182C23.5 19.007 23.445 19.1915 23.342 19.3485C23.239 19.5055 23.0926 19.6278 22.9213 19.7001C22.75 19.7723 22.5615 19.7912 22.3796 19.7544C22.1977 19.7176 22.0307 19.6266 21.8996 19.4931C21.7685 19.3597 21.6792 19.1896 21.643 19.0044C21.6068 18.8192 21.6254 18.6273 21.6964 18.4529C21.7673 18.2785 21.8875 18.1294 22.0417 18.0245C22.1958 17.9196 22.3771 17.8636 22.5625 17.8636C22.8111 17.8636 23.0496 17.9642 23.2254 18.1432C23.4012 18.3222 23.5 18.565 23.5 18.8182Z"
                fill="white"
              />
              <defs>
                <filter
                  id="filter0_d_78_174"
                  x="0.5"
                  y="-2.38419e-07"
                  width="36"
                  height="36"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="3.5" />
                  <feGaussianBlur stdDeviation="2.75" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_78_174"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_78_174"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
            <div className="flex">Servers</div>
            <div className="text-xl py-5 font-bold px-2">
              22
            </div>
          </div>
          <div className=" flex flex-col justify-center px-5 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="70"
              viewBox="0 0 37 36"
              fill="none"
            >
              <g filter="url(#filter0_d_78_194)">
                <rect
                  x="5.99907"
                  y="2"
                  width="25"
                  height="25"
                  rx="6"
                  fill="#0075FF"
                />
              </g>
              <path
                d="M21.2248 15.7778C21.2248 15.9251 21.1673 16.0664 21.065 16.1706C20.9627 16.2748 20.824 16.3333 20.6793 16.3333H16.3157C16.171 16.3333 16.0323 16.2748 15.93 16.1706C15.8277 16.0664 15.7702 15.9251 15.7702 15.7778C15.7702 15.6304 15.8277 15.4891 15.93 15.3849C16.0323 15.2808 16.171 15.2222 16.3157 15.2222H20.6793C20.824 15.2222 20.9627 15.2808 21.065 15.3849C21.1673 15.4891 21.2248 15.6304 21.2248 15.7778ZM20.6793 17.4444H16.3157C16.171 17.4444 16.0323 17.503 15.93 17.6072C15.8277 17.7113 15.7702 17.8527 15.7702 18C15.7702 18.1473 15.8277 18.2887 15.93 18.3928C16.0323 18.497 16.171 18.5556 16.3157 18.5556H20.6793C20.824 18.5556 20.9627 18.497 21.065 18.3928C21.1673 18.2887 21.2248 18.1473 21.2248 18C21.2248 17.8527 21.1673 17.7113 21.065 17.6072C20.9627 17.503 20.824 17.4444 20.6793 17.4444ZM24.4975 9.66667V20.7778C24.4975 21.3671 24.2676 21.9324 23.8584 22.3491C23.4493 22.7659 22.8943 23 22.3157 23H14.6793C14.1006 23 13.5457 22.7659 13.1365 22.3491C12.7274 21.9324 12.4975 21.3671 12.4975 20.7778V9.66667C12.4975 9.51932 12.5549 9.37802 12.6572 9.27383C12.7595 9.16964 12.8983 9.11111 13.0429 9.11111H14.6793V8.55556C14.6793 8.40821 14.7368 8.26691 14.8391 8.16272C14.9414 8.05853 15.0801 8 15.2248 8C15.3694 8 15.5082 8.05853 15.6104 8.16272C15.7127 8.26691 15.7702 8.40821 15.7702 8.55556V9.11111H17.952V8.55556C17.952 8.40821 18.0095 8.26691 18.1118 8.16272C18.2141 8.05853 18.3528 8 18.4975 8C18.6421 8 18.7809 8.05853 18.8832 8.16272C18.9855 8.26691 19.0429 8.40821 19.0429 8.55556V9.11111H21.2248V8.55556C21.2248 8.40821 21.2822 8.26691 21.3845 8.16272C21.4868 8.05853 21.6255 8 21.7702 8C21.9149 8 22.0536 8.05853 22.1559 8.16272C22.2582 8.26691 22.3157 8.40821 22.3157 8.55556V9.11111H23.952C24.0967 9.11111 24.2354 9.16964 24.3377 9.27383C24.44 9.37802 24.4975 9.51932 24.4975 9.66667ZM23.4066 10.2222H22.3157V10.7778C22.3157 10.9251 22.2582 11.0664 22.1559 11.1706C22.0536 11.2748 21.9149 11.3333 21.7702 11.3333C21.6255 11.3333 21.4868 11.2748 21.3845 11.1706C21.2822 11.0664 21.2248 10.9251 21.2248 10.7778V10.2222H19.0429V10.7778C19.0429 10.9251 18.9855 11.0664 18.8832 11.1706C18.7809 11.2748 18.6421 11.3333 18.4975 11.3333C18.3528 11.3333 18.2141 11.2748 18.1118 11.1706C18.0095 11.0664 17.952 10.9251 17.952 10.7778V10.2222H15.7702V10.7778C15.7702 10.9251 15.7127 11.0664 15.6104 11.1706C15.5082 11.2748 15.3694 11.3333 15.2248 11.3333C15.0801 11.3333 14.9414 11.2748 14.8391 11.1706C14.7368 11.0664 14.6793 10.9251 14.6793 10.7778V10.2222H13.5884V20.7778C13.5884 21.0725 13.7033 21.3551 13.9079 21.5635C14.1125 21.7718 14.39 21.8889 14.6793 21.8889H22.3157C22.605 21.8889 22.8825 21.7718 23.0871 21.5635C23.2916 21.3551 23.4066 21.0725 23.4066 20.7778V10.2222Z"
                fill="white"
              />
              <defs>
                <filter
                  id="filter0_d_78_194"
                  x="0.499069"
                  y="-2.38419e-07"
                  width="36"
                  height="36"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="3.5" />
                  <feGaussianBlur stdDeviation="2.75" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_78_194"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_78_194"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
            <div className="">Running attacks</div>
            <div className="px-10 py-5 text-xl font-bold">{runningAttacks*3}</div>
          </div>
          <div className="flex flex-col px-5 justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="70"
              viewBox="0 0 37 37"
              fill="none"
            >
              <g filter="url(#filter0_d_78_184)">
                <rect
                  x="6"
                  y="2.5"
                  width="25"
                  height="25"
                  rx="6"
                  fill="#0075FF"
                />
              </g>
              <path
                d="M25.9477 8.60345C25.8014 8.60345 25.6611 8.66158 25.5576 8.76504C25.4542 8.86851 25.3961 9.00885 25.3961 9.15517C25.3825 9.56599 25.2992 9.97153 25.1499 10.3545C24.8707 11.0324 24.4101 11.3621 23.7413 11.3621C22.9787 11.3621 22.4416 10.689 21.7079 9.66207C20.9833 8.64897 20.1641 7.5 18.7769 7.5C17.6468 7.5 16.7773 8.1131 16.3339 9.22414C16.204 9.55722 16.1138 9.90443 16.065 10.2586H14.9156C14.6231 10.2586 14.3425 10.3749 14.1356 10.5818C13.9287 10.7887 13.8124 11.0694 13.8124 11.3621V12.0234C12.5978 12.6424 11.6269 13.6525 11.0563 14.8909C10.4857 16.1292 10.3487 17.5237 10.6673 18.8494C10.9859 20.1752 11.7416 21.355 12.8125 22.1987C13.8834 23.0424 15.2072 23.5008 16.5704 23.5H16.6801C18.034 23.4767 19.3413 23.0011 20.3937 22.1488C21.4462 21.2965 22.1834 20.1166 22.4879 18.7969C22.7925 17.4771 22.6469 16.0934 22.0744 14.8659C21.5018 13.6385 20.5352 12.6379 19.3285 12.0234V11.3621C19.3285 11.0694 19.2122 10.7887 19.0053 10.5818C18.7984 10.3749 18.5178 10.2586 18.2253 10.2586H17.1827C17.2219 10.0373 17.284 9.82076 17.3682 9.61241C17.6474 8.9331 18.108 8.60345 18.7769 8.60345C19.5394 8.60345 20.0766 9.27655 20.8102 10.3034C21.5349 11.3166 22.354 12.4655 23.7413 12.4655C24.8714 12.4655 25.7408 11.8524 26.1842 10.7414C26.3793 10.2346 26.4859 9.69806 26.4993 9.15517C26.4993 9.00885 26.4412 8.86851 26.3377 8.76504C26.2343 8.66158 26.094 8.60345 25.9477 8.60345ZM18.5562 12.8793C19.6015 13.3356 20.4579 14.138 20.9813 15.1516C21.5046 16.1652 21.6632 17.3281 21.4301 18.4448C21.1971 19.5615 20.5868 20.5639 19.7017 21.2835C18.8167 22.003 17.711 22.3958 16.5704 22.3958C15.4299 22.3958 14.3242 22.003 13.4391 21.2835C12.5541 20.5639 11.9438 19.5615 11.7108 18.4448C11.4777 17.3281 11.6362 16.1652 12.1596 15.1516C12.683 14.138 13.5394 13.3356 14.5847 12.8793C14.6831 12.8363 14.7669 12.7655 14.8257 12.6756C14.8845 12.5857 14.9158 12.4805 14.9156 12.3731V11.3621H18.2253V12.3731C18.2251 12.4805 18.2564 12.5857 18.3152 12.6756C18.374 12.7655 18.4578 12.8363 18.5562 12.8793ZM16.5629 20.8324C16.5413 20.9612 16.4749 21.0781 16.3752 21.1625C16.2756 21.2468 16.1494 21.2931 16.0188 21.2931C15.9881 21.293 15.9575 21.2904 15.9271 21.2855C15.1275 21.1436 14.3907 20.7594 13.8164 20.185C13.2421 19.6106 12.858 18.8736 12.7161 18.0738C12.7034 18.002 12.7051 17.9284 12.721 17.8573C12.7369 17.7862 12.7667 17.7189 12.8088 17.6594C12.8508 17.5999 12.9042 17.5493 12.9659 17.5105C13.0276 17.4717 13.0964 17.4456 13.1683 17.4336C13.2402 17.4215 13.3137 17.4239 13.3847 17.4404C13.4556 17.457 13.5226 17.4874 13.5817 17.53C13.6408 17.5726 13.6909 17.6265 13.7291 17.6886C13.7673 17.7507 13.7928 17.8197 13.8042 17.8917C13.9062 18.4658 14.1819 18.9948 14.5941 19.4071C15.0063 19.8194 15.5352 20.0952 16.1092 20.1972C16.1807 20.2091 16.2491 20.235 16.3106 20.2733C16.3721 20.3117 16.4255 20.3618 16.4676 20.4208C16.5098 20.4798 16.5399 20.5465 16.5562 20.6171C16.5725 20.6877 16.5748 20.7609 16.5629 20.8324Z"
                fill="white"
              />
              <defs>
                <filter
                  id="filter0_d_78_184"
                  x="0.5"
                  y="0.5"
                  width="36"
                  height="36"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="3.5" />
                  <feGaussianBlur stdDeviation="2.75" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_78_184"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_78_184"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
            <div className="flex ">Total attacks</div>
            <div className="px-10 text-xl py-5 font-bold flex ">
              {totalAttacks *3}
            </div>
          </div>
        </div>
        <div className="hidden lg:block h-[500px] rounded-2xl w-full">
          <ChartDash data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default MainDash;
