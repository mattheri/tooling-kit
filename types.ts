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
