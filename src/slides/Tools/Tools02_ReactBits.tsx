import React from "react";
import { materialPalettes } from "../../theme/materialPalettes";
import { ToolShowcaseTemplate } from "./ToolShowcaseTemplate";

export const Tools02_ReactBits: React.FC = () => {
  return (
    <ToolShowcaseTemplate
      indexLabel="02 / 05"
      category="Código & Movimento"
      name="React Bits"
      tagline="Biblioteca aberta de componentes animados prontos para copiar"
      description="Coleção gratuita e personalizável de animações de texto, fundos vivos e componentes interativos em React. Em vez de gastar horas programando um efeito do zero, você ajusta ao vivo e leva o código limpo para o seu projeto."
      highlights={[
        "Textos animados, fundos fluidos e efeitos de cursor prontos para uso",
        "Controles visuais no site para testar velocidade e estilo antes de copiar",
        "Código direto no seu projeto, sem travar você em bibliotecas pesadas",
      ]}
      url="https://reactbits.dev/"
      displayUrl="reactbits.dev"
      iconSrc="/tools/react-bits-icon.png"
      screenshotSrc="/tools/react-bits-print.png"
      palette={materialPalettes.section4}
    />
  );
};
