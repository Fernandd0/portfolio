import { Buttom } from "../../../components/ui/Buttom";

export const HeroSection = () => {
  return (
    <section className="flex justify-between items-center h-[100vh] md:px-24">
      <div>
        <p className="mb-2">Hello there! Soy Fernando Solorzano</p>
        <p className="font-retro text-4xl mb-">Programador Junior</p>
        <p className="mb-4">
          Con vocación por convertir ideas en productos reales de la vida
          cotidiana.
        </p>
        <div className="flex gap-4">
          <Buttom>Contáctame</Buttom>
          <Buttom className="bg-red-500 text-white">Ver mi CV</Buttom>
        </div>
      </div>
      <div>
        <div className="relative">
          <div className="absolute top-0 left-0 w-1 h-1 bg-white z-[99]"></div>
          <div className="absolute top-0 right-0 w-1 h-1 bg-white z-[99]"></div>
          <div className="absolute bottom-0 left-0 w-1 h-1 bg-white z-[99]"></div>
          <div className="absolute bottom-0 right-0 w-1 h-1 bg-white z-[99]"></div>

          <div className="absolute top-0 left-1 right-1 border-t-4 border-black z-[99]"></div>
          <div className="absolute bottom-0 left-1 right-1 border-b-4 border-black z-[99]"></div>
          <div className="absolute left-0 top-1 bottom-1 border-l-4 border-black z-[99]"></div>
          <div className="absolute right-0 top-1 bottom-1 border-r-4 border-black z-[99]"></div>
          <img
            src="https://res.cloudinary.com/dexwdybrg/image/upload/v1719005051/me_1_qxgzeu.png"
            alt="me pixel"
            className="w-[180px] h-auto"
            width={100}
          />
        </div>
      </div>
    </section>
  );
};
