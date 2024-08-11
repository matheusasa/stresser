import PricingTitle from "./PricingTitle";
import PlanCard from "./PlanCard";

const plans = [
  {
    title: "Hydrogen",
    price: "11.00",
    beforePrice: "15.00",
    features: [
      { icon: "concurrents", text: "1 concurrent", isEnabled: true },
      { icon: "timer", text: "120 seconds", isEnabled: true },
      { icon: "premium", text: "Premium", isEnabled: false },
      { icon: "code", text: "API Access", isEnabled: false },
    ],
  },
  {
    title: "Oxygen",
    price: "16.00",
    beforePrice: "20.00",
    features: [
      { icon: "concurrents", text: "2 concurrents", isEnabled: true },
      { icon: "timer", text: "180 seconds", isEnabled: true },
      { icon: "premium", text: "Premium", isEnabled: true },
      { icon: "code", text: "API Access", isEnabled: false },
    ],
  },
  {
    title: "Oxygen",
    price: "20.00",
    beforePrice: "20.00",
    features: [
      { icon: "concurrents", text: "3 concurrents", isEnabled: true },
      { icon: "timer", text: "180 seconds", isEnabled: true },
      { icon: "premium", text: "Premium", isEnabled: true },
      { icon: "code", text: "API Access", isEnabled: true },
    ],
  },
];

const CardBuy: React.FC = () => (
  <div className="flex flex-col items-center w-full mb-10 px-4 lg:px-0">
    <PricingTitle />
    <div className="flex gap-8 flex-col lg:flex-row">
      {plans.map((plan, index) => (
        <PlanCard key={index} {...plan} />
      ))}
    </div>
  </div>
);

export default CardBuy;
