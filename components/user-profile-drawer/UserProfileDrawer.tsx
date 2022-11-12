import useSignOut from "../../hooks/useSignOut";
import Button from "../button/Button";
import DrawerController from "../drawer-controller/DrawerController";

const UserProfileDrawer = () => {
  const signOut = useSignOut();

  return (
    <DrawerController
      drawerOpenMethod="hover"
      trigger={(props) => (
        <Button {...props} className="max-w-fit mt-2 ml-8">
          Profile
        </Button>
      )}
    >
      <Button
        className="mt-4 bg-red-500 hover:bg-red-400"
        type="button"
        onClick={signOut}
      >
        Sign out
      </Button>
    </DrawerController>
  );
};

export default UserProfileDrawer;
