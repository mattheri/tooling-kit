import type { StatelessComponentWithChildren } from "../types";

import "../styles/globals.css";
import Navbar from "../components/navbar/Navbar";

const RootLayout: StatelessComponentWithChildren = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
