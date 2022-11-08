import { useMemo, useState, DependencyList, useEffect } from "react";
import PixelConverter from "../tools/pixel-converter";

type Unit = "em" | "rem";

interface Props {
  rootEm?: string;
  to?: Unit;
}

interface ReturnType {
  convertedValue: number;
  to: string;
}

type PixelConverterHook = (
  valueToConvert: string,
  deps?: DependencyList,
  props?: Props
) => ReturnType;

const DEFAULT_PROPS: Props = {
  rootEm: "16px",
  to: "rem",
};

const usePixelConverter: PixelConverterHook = (
  valueToConvert,
  deps,
  props = DEFAULT_PROPS
) => {
  const { rootEm, to } = props;
  const [convertedValue, setConvertedValue] = useState<number | null>(null);

  const rootEmValue = parseFloat(rootEm?.trim() ?? "16px");

  const pixelConverter = useMemo(
    () => new PixelConverter(rootEmValue),
    [rootEmValue]
  );

  useEffect(() => {
    const convertedValue = pixelConverter.pxToRem(
      parseFloat(valueToConvert) || 0
    );

    setConvertedValue(convertedValue);
  }, [deps || [], rootEmValue, to]);

  return {
    convertedValue: convertedValue ?? parseFloat(valueToConvert),
    to: to ?? "rem",
  };
};

export default usePixelConverter;
