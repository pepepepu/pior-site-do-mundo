import React from "react";
import { materialPalettes } from "../../theme/materialPalettes";
import { ToolShowcaseTemplate } from "./ToolShowcaseTemplate";

export const Tools01_Dribbble: React.FC = () => {
  return (
    <ToolShowcaseTemplate
      indexLabel="01 / 05"
      category="Vitrine de UI & Produto"
      name="Dribbble"
      tagline="Inspiração focada em telas, botões, cards e microinterações"
      description="Uma das maiores comunidades de designers digitais do mundo. Ótima para pesquisar rapidamente como outros criadores resolvem telas específicas, dashboards, aplicativos e páginas iniciais."
      highlights={[
        "Pesquise por tipo de tela, como tela de login, preço ou perfil",
        "Filtre por cor principal para testar combinações antes de abrir o Figma",
        "Excelente para observar detalhes de acabamento, ícones e estados de botão",
      ]}
      url="https://dribbble.com/"
      displayUrl="dribbble.com"
      iconSrc="/tools/dribbble-icon.png"
      screenshotSrc="/tools/dribbble-print.png"
      palette={materialPalettes.section2}
    />
  );
};
