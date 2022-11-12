"use client";

import useUser from "../../hooks/useUser";
import LoginFormController from "../login-form-controller/LoginFormController";
import UserProfileDrawer from "../user-profile-drawer/UserProfileDrawer";

const UserInputController = () => {
  const user = useUser();

  return user ? <UserProfileDrawer /> : <LoginFormController />;
};

export default UserInputController;
