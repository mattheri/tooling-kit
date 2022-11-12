"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Auth from "../../auth/auth";
import ButtonLoadingController from "../button-loading-controller/ButtonLoadingController";
import Button from "../button/Button";
import Input from "../input/Input";

const signUp = async (values: any) => {
  return Auth.instance.signupWithPassword(values.email, values.password);
};

const initiateLoginWithGoogle = async () => {
  return Auth.instance.initiateLoginWithGoogle();
};

const SignupFormLocal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, getValues } = useForm();

  const onSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      await signUp(values);
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
            autoComplete="new-password"
            {...register("password", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <Input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            {...register("confirmPassword", {
              validate: (value) =>
                getValues().password === value || "Passwords does not match!",
            })}
          />
        </div>
        <ButtonLoadingController isLoading={isLoading} localizedLoading={false}>
          <Button type="submit">Signup</Button>
        </ButtonLoadingController>
      </form>
      <ButtonLoadingController isLoading={isLoading} localizedLoading={false}>
        <Button
          className="mt-4 bg-red-400 hover:bg-red-300"
          onClick={onLoginWithGoogle}
        >
          Signup with Google
        </Button>
      </ButtonLoadingController>
    </>
  );
};

export default SignupFormLocal;
