import { StatelessComponentWithChildren } from "../../types";

const Layout: StatelessComponentWithChildren = ({ children }) => {
  return (
    <section className="flex flex-col lg:flex-row lg:flex-nowrap">
      {children}
    </section>
  );
};

export default Layout;
