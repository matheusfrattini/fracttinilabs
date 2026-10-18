import { Hero } from "@/components/sections/Hero";
import { CardsTipos } from "@/components/sections/CardsTipos";
import { Destaques } from "@/components/sections/Destaques";
import { ProblemaSistema } from "@/components/sections/ProblemaSistema";
import { Local } from "@/components/sections/Local";
import { Depoimentos } from "@/components/sections/Depoimentos";
import { ChamadaFinal } from "@/components/sections/ChamadaFinal";

export default function Inicio() {
  return (
    <>
      <Hero />
      <CardsTipos />
      <Destaques />
      <ProblemaSistema />
      <Local />
      <Depoimentos />
      <ChamadaFinal />
    </>
  );
}
