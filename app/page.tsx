import Image from "next/image";
import Navbar from "./components/navbar";
import Main from "./components/main";
import CardBuy from "./components/buys";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Main />
      <CardBuy />
      <Footer />
    </div>
  );
}
