import { useMemo, useRef } from "react";
import CssRules from "../tools/css-rules";

const useCssRules = (indent: boolean = true, selector: string = ":root") => {
  const declarations = useRef<string[]>([]);

  const cssRules = useMemo(() => new CssRules(indent), [indent]);

  const createDeclaration = (property: string, value: string) => {
    const declaration = cssRules.createDeclaration(property, value);
    declarations.current = [...new Set([...declarations.current, declaration])];
  };

  const createRule = () => {
    return cssRules.createRules(selector, declarations.current.join("\n"));
  };

  const resetDeclarations = () => (declarations.current = []);

  return {
    createDeclaration,
    createRule,
    resetDeclarations,
    declarations: declarations.current,
  };
};

export default useCssRules;
