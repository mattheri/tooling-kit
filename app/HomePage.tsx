"use client";

import Favorites from "../components/favorites/Favorites";
import WindowAvailable from "../components/window-available/WindowAvailable";
import type { StatelessComponent } from "../types";

const HomePage: StatelessComponent = () => {
  return (
    <WindowAvailable>
      <Favorites />
    </WindowAvailable>
  );
};

export default HomePage;
