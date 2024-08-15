// components/PlanCard.tsx

import Feature from "./Feature";

interface PlanCardProps {
  title: string;
  price: string;
  beforePrice: string;
  features: { icon: string; text: string; isEnabled: boolean }[];
}

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  price,
  beforePrice,
  features,
}) => (
  <div className="bg-gray-800 p-5 rounded-lg w-64 h-90">
    <div className="mb-4">
      <span className="block text-white text-xl font-medium">{title}</span>
      <div className="flex items-center mt-2">
        <span className="text-blue-400 text-2xl font-semibold">${price}</span>
        <span className="text-white text-base ml-2">/month</span>
      </div>
      <span className="block text-gray-400 text-xs mt-1">
        Before ${beforePrice} monthly
      </span>
    </div>
    <div className="mb-4">
      {features.map((feature, index) => (
        <Feature
          key={index}
          icon={feature.icon}
          text={feature.text}
          isEnabled={feature.isEnabled}
        />
      ))}
    </div>
    <button className="bg-custom-blue hover:bg-gradient-start text-white py-2 px-4 rounded-full w-full">
      Buy Now
    </button>
  </div>
);

export default PlanCard;
