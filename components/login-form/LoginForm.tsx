"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Auth from "../../auth/auth";
import ButtonLoadingController from "../button-loading-controller/ButtonLoadingController";
import Button from "../button/Button";
import Input from "../input/Input";

const signInWithPassword = async (values: any) => {
  return Auth.instance.loginWithPassword(values.email, values.password);
};

const initiateLoginWithGoogle = async () => {
  return Auth.instance.initiateLoginWithGoogle();
};

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      await signInWithPassword(values);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onLoginWithGoogle = async () => {
    try {
      setIsLoading(true);
      await initiateLoginWithGoogle();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div>
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            autoComplete="username"
            {...register("email", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register("password", { required: true })}
          />
        </div>
        <ButtonLoadingController isLoading={isLoading} localizedLoading={false}>
          <Button type="submit">Login</Button>
        </ButtonLoadingController>
      </form>
      <ButtonLoadingController isLoading={isLoading} localizedLoading={false}>
        <Button
          className="mt-4 bg-red-400 hover:bg-red-300"
          onClick={onLoginWithGoogle}
        >
          Login with Google
        </Button>
      </ButtonLoadingController>
    </>
  );
};

export default LoginForm;
