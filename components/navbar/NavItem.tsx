"use client";

import type { StatelessComponentWithChildren } from "../../types";
import type { AnchorHTMLAttributes } from "react";

import Link, { LinkProps } from "next/link";

import { usePathname } from "next/navigation";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps;

const NavItem: StatelessComponentWithChildren<Props> = ({
  href,
  children,
  ...rest
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const fontSize = isActive ? "text-4xl" : "text-3xl";
  const fontWeight = isActive ? "font-black" : "font-bold";
  const color = isActive ? "text-sky-800" : "text-slate-500";

  const classnames = [fontSize, fontWeight, color, "underline-offset-4"];

  return (
    <li className={classnames.join(" ")}>
      <Link href={href} rel="noreferrer noopener" {...rest}>
        {children}
      </Link>
    </li>
  );
};

export default NavItem;
