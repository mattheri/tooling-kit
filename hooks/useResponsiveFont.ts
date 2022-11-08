import ResponsiveFont from "../tools/responsive-font";

interface CreateProps {
  rootEm: string;
  minFontSize: string;
  maxFontSize: string;
  minWidth: string;
  maxWidth: string;
}

type CreateFn = (props: CreateProps) => string;

const DEFAULT_ROOT_EM = "16px";

const useResponsiveFont = () => {
  const create: CreateFn = ({
    rootEm = DEFAULT_ROOT_EM,
    minFontSize,
    maxFontSize,
    minWidth,
    maxWidth,
  }) => {
    const responsiveFont = new ResponsiveFont(
      rootEm,
      minFontSize,
      maxFontSize,
      minWidth,
      maxWidth
    );

    return responsiveFont.create();
  };

  return { create };
};

export default useResponsiveFont;
