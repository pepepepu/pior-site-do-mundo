import React from "react";
import { materialPalettes } from "../../theme/materialPalettes";
import { ToolShowcaseTemplate } from "./ToolShowcaseTemplate";

export const Tools04_Cosmos: React.FC = () => {
  return (
    <ToolShowcaseTemplate
      indexLabel="04 / 05"
      category="Curadoria Visual Limpa"
      name="Cosmos"
      tagline="Referências visuais sem anúncios, sem poluição e com alto nível estético"
      description="Plataforma criada para colecionar imagens, sites, cores e tipografias em pastas visuais chamadas clusters. Funciona como um estúdio silencioso onde o algoritmo sugere referências realmente próximas da direção de arte que você procura."
      highlights={[
        "Feed limpo, sem propagandas disputando espaço com as referências",
        "Busca inteligente que encontra imagens com a mesma paleta, textura ou composição",
        "Perfeito para montar o painel de referências antes de desenhar a primeira tela",
      ]}
      url="https://www.cosmos.so/"
      displayUrl="cosmos.so"
      iconSrc="/tools/cosmos-icon.jpg"
      screenshotSrc="/tools/cosmos-print.png"
      palette={materialPalettes.section1}
    />
  );
};
