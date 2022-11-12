import { FC, PropsWithChildren } from "react";

type ComponentWithChildren<T extends object = {}> = FC<PropsWithChildren<T>>;

export type StatelessComponentWithChildren<T extends object = {}> =
  ComponentWithChildren<T>;

export type StatefulComponentWithChildren<T extends object = {}> =
  ComponentWithChildren<T>;

export type StatelessComponent<T extends object = {}> = FC<T>;

export type StatefulComponent<T extends object = {}> = FC<T>;

export function asyncComponent<T, R>(
  fn: (arg: T) => Promise<R>
): (arg: T) => R {
  return fn as (arg: T) => R;
}

interface DbBase {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDetails {
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

export interface User extends DbBase {
  email: string;
  authType: string;
  authId: string;
  authToken: string;
}

export enum ErrorMessage {
  InvalidEmail = "Invalid email",
  InvalidPassword = "Invalid password",
  InvalidToken = "Invalid token",
  UnknownError = "Unknown error",
  CannotFindCode = "Cannot find code",
  NoUserFound = "No user found",
}

export enum AuthType {
  Google = "GOOGLE",
}

export interface UserWithToken extends User {
  token: string;
}
