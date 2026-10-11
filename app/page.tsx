import { Hero } from "@/components/sections/Hero";
import { Frentes } from "@/components/sections/Frentes";
import { Destaques } from "@/components/sections/Destaques";
import { Processo } from "@/components/sections/Processo";
import { Equipe } from "@/components/sections/Equipe";
import { Depoimentos } from "@/components/sections/Depoimentos";
import { ChamadaFinal } from "@/components/sections/ChamadaFinal";

export default function Inicio() {
  return (
    <>
      <Hero />
      <Frentes />
      <Destaques />
      <Processo />
      <Equipe />
      <Depoimentos />
      <ChamadaFinal />
    </>
  );
}
