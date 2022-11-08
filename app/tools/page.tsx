import ConvertPixel from "../../components/convert-pixel/ConvertPixel";
import ResponsiveFont from "../../components/responsive-font/ResponsiveFont";
import WindowAvailable from "../../components/window-available/WindowAvailable";
import type { StatelessComponent } from "../../types";

const Page: StatelessComponent = () => {
  return (
    <WindowAvailable>
      <ConvertPixel />
      <ResponsiveFont />
    </WindowAvailable>
  );
};

export default Page;
