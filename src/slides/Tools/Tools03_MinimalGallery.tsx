import React from "react";
import { materialPalettes } from "../../theme/materialPalettes";
import { ToolShowcaseTemplate } from "./ToolShowcaseTemplate";

export const Tools03_MinimalGallery: React.FC = () => {
  return (
    <ToolShowcaseTemplate
      indexLabel="03 / 05"
      category="Sites Reais no Ar"
      name="Minimal Gallery"
      tagline="Curadoria rigorosa de sites reais limpos, claros e bem feitos"
      description="Diferente de rascunhos conceituais, aqui entram apenas sites publicados de verdade, escolhidos a dedo desde 2013. É a melhor escola visual para aprender a usar espaço em branco, tipografia forte e simplicidade."
      highlights={[
        "Você abre o site real no navegador e sente a rolagem e as animações ao vivo",
        "Prova prática de que menos elementos na tela deixam a mensagem muito mais forte",
        "Ideal para estudar portfólios, páginas de produto e ritmo de leitura real",
      ]}
      url="https://minimal.gallery/"
      displayUrl="minimal.gallery"
      iconSrc="/tools/minimal-gallery-icon.png"
      screenshotSrc="/tools/minimal-gallery-print.png"
      palette={materialPalettes.section5}
    />
  );
};
