"use client";

import React, { useState } from "react";
import Button from "../button/Button";
import DrawerController from "../drawer-controller/DrawerController";
import LoginForm from "../login-form/LoginForm";
import SignupFormLocal from "../signup-form-local/SignupFormLocal";

const LoginFormController = () => {
  const [onLoginDrawer, setOnLoginDrawer] = useState(true);

  const changeForm = () => setOnLoginDrawer(!onLoginDrawer);

  return (
    <DrawerController
      trigger={(props) => (
        <Button {...props} className="max-w-fit mt-2 ml-8">
          Login
        </Button>
      )}
      drawerOpenMethod="hover"
    >
      {onLoginDrawer ? <LoginForm /> : <SignupFormLocal />}
      <Button className="mt-4" type="button" onClick={changeForm}>
        {onLoginDrawer
          ? "I don't have an account"
          : "I already have an account"}
      </Button>
    </DrawerController>
  );
};

export default LoginFormController;
