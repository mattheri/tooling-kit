import ConvertPixel from "../../components/convert-pixel/ConvertPixel";
import ResponsiveFont from "../../components/responsive-font/ResponsiveFont";
import type { StatelessComponent } from "../../types";

const Page: StatelessComponent = () => {
  return (
    <>
      <ConvertPixel />
      <ResponsiveFont />
    </>
  );
};

export default Page;
