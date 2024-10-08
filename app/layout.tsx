import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

// Configurando a fonte Poppins com pesos desejados e subsets
const poppins = Poppins({
  weight: ["400", "700"], // Adicione os pesos que você deseja usar
  subsets: ["latin"], // Subconjunto de caracteres, como "latin", "latin-ext", etc.
  display: "swap", // O display "swap" permite que a fonte seja exibida rapidamente enquanto carrega
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#0E0E0E]">
      <body className={poppins.className}>
        <div className="bg-[#0E0E0E]">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
