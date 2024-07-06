import { Buttom } from "../../../components/ui/Buttom";

export const HeroSection = () => {
  return (
    <section className="flex justify-between items-center h-[100vh] md:px-24">
      <div>
        <p className="mb-4 text-2xl font-normal">Hello there! Soy Fernando Solorzano</p>
        <p className="font-retro text-5xl mb-3 font-">Programador Junior</p>
        <p className="mb-8 text-2xl font-normal">
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
          <div className="absolute top-0 left-0 w-2 h-2 bg-white z-[99]"></div>
          <div className="absolute top-0 right-0 w-2 h-2 bg-white z-[99]"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-white z-[99]"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-white z-[99]"></div>

          <div className="absolute top-0 left-1 right-1 border-t-8 border-primary z-[]"></div>
          <div className="absolute bottom-0 left-1 right-1 border-b-8 border-primary z-[]"></div>
          <div className="absolute left-0 top-1 bottom-1 border-l-8 border-primary z-[]"></div>
          <div className="absolute right-0 top-1 bottom-1 border-r-8 border-primary z-[]"></div>
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
