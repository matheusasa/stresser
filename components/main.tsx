const Main = () => {
  return (
    <div className="flex justify-center px-4 overflow-hidden">
      <div className="w-full max-w-[1440px] h-[1036px] bg-fundo bg-cover bg-no-repeat bg-center flex justify-center items-center relative">
        <div className="w-full max-w-[849px] flex flex-col gap-[32px] items-center flex-nowrap relative z-[22] px-4">
          <span className="w-full max-w-[849px] h-[184px] text-[61px] font-semibold leading-[91.5px] gradient-text text-center">
            VacStresser is the best way
            <br />
            to test your targets
          </span>
          <span className="w-full max-w-[563px] h-[48px] text-[16px] font-normal leading-[24px] text-[#8fa8c5] text-center">
            Beautifully designed, experience reliable and uninterrupted power
            that
            <br />
            enables you to easily launch powerful tests.
          </span>
          <button className="w-full max-w-[301px] h-[48px] flex justify-center items-center bg-[#4a9fff] rounded-[50px]">
            <span className="text-[16px] font-semibold leading-[24px] text-[#e2e2e2]">
              Get Started
            </span>
            <div className="w-[24px] h-[24px]">
              <div className="w-[18px] h-[15px] bg-arrow bg-[length:100%_100%] bg-no-repeat" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
