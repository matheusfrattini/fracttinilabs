import { Hero } from "@/components/sections/Hero";
import { CardsTipos } from "@/components/sections/CardsTipos";
import { JornadaDor } from "@/components/sections/JornadaDor";
import { Destaques } from "@/components/sections/Destaques";
import { Local } from "@/components/sections/Local";
import { Depoimentos } from "@/components/sections/Depoimentos";
import { ChamadaFinal } from "@/components/sections/ChamadaFinal";

export default function Inicio() {
  return (
    <>
      <Hero />
      <CardsTipos />
      {/* dor -> custo -> saída, logo depois de dizer o que a gente faz */}
      <JornadaDor />
      <Destaques />
      <Local />
      <Depoimentos />
      <ChamadaFinal />
    </>
  );
}
