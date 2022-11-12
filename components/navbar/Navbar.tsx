import UserInputController from "../user-input-controller/UserInputController";
import NavItem from "./NavItem";

const Navbar = () => {
  return (
    <nav className="h-20 flex justify-center">
      <ul className="flex gap-6 items-center">
        <NavItem href="/">Home</NavItem>
        <NavItem href="/feeds">Feeds</NavItem>
        <NavItem href="/tools">Tools</NavItem>
      </ul>
      <UserInputController />
    </nav>
  );
};

export default Navbar;
