import { useState } from "react";
import useCssRules from "./useCssRules";
import useResponsiveFont from "./useResponsiveFont";

export interface IResponsiveFontProps {
  [key: string]: string;
  maxWidth: string;
  minWidth: string;
  maxFontSize: string;
  minFontSize: string;
  variableName: string;
  rootEm: string;
}

const useCreateResponsiveFonts = () => {
  const [responsiveFonts, setResponsiveFonts] = useState<string | null>(null);

  const { create } = useResponsiveFont();
  const { createDeclaration, createRule, resetDeclarations } = useCssRules();

  const createResponsiveFont = ({
    maxWidth,
    minWidth,
    maxFontSize,
    minFontSize,
    variableName,
    rootEm,
  }: IResponsiveFontProps) => {
    const responsiveFont = create({
      maxWidth,
      minWidth,
      maxFontSize,
      minFontSize,
      rootEm,
    });
    createDeclaration(variableName, responsiveFont);
  };

  const createResponsiveFontsRule = () => {
    const rule = createRule();
    setResponsiveFonts(rule);
  };

  const resetResponsiveFonts = () => {
    resetDeclarations();
    setResponsiveFonts(null);
  };

  return {
    createResponsiveFont,
    createResponsiveFontsRule,
    resetResponsiveFonts,
    responsiveFonts,
  };
};

export default useCreateResponsiveFonts;
