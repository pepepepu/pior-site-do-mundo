import React from "react";
import { materialPalettes } from "../../theme/materialPalettes";
import { ToolShowcaseTemplate } from "./ToolShowcaseTemplate";

export const Tools05_Pinterest: React.FC = () => {
  return (
    <ToolShowcaseTemplate
      indexLabel="05 / 05"
      category="Clima, Estilo e Ideias"
      name="Pinterest"
      tagline="O ponto de partida mais rápido para explorar estilo, pôsteres e paletas"
      description="Vai muito além de telas de computador. No Pinterest você encontra design gráfico, capas de revistas, embalagens, arquitetura e tipografia, misturando referências do mundo real para criar sites que não parecem cópia de template."
      highlights={[
        "Ótimo para definir a personalidade visual e a paleta de cores do projeto",
        "Pastas colaborativas para a equipe inteira salvar referências juntas",
        "Traz referências de pôsteres e editorial que deixam o site muito mais original",
      ]}
      url="https://www.pinterest.com/"
      displayUrl="pinterest.com"
      iconSrc="/tools/pinterest-icon.jpg"
      screenshotSrc="/tools/pinterest-print.png"
      palette={materialPalettes.section2}
    />
  );
};
