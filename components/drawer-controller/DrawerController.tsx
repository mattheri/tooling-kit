"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { StatefulComponentWithChildren } from "../../types";
import throttle from "lodash.throttle";
import Drawer from "../drawer/Drawer";

interface TriggerProps {
  onClick?: () => void;
  onMouseEnter?: () => void;
}

interface Props {
  trigger: FC<TriggerProps>;
  drawerOpenMethod?: "click" | "hover";
}

const noop = () => {};

const DrawerController: StatefulComponentWithChildren<Props> = ({
  trigger: Trigger,
  drawerOpenMethod = "click",
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [left, setLeft] = useState({});
  const ref = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const drawerTimeout = useRef<NodeJS.Timeout | null>(null);
  const drawerObserver = useRef<IntersectionObserver | null>(null);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  const clearDrawerTimeout = () => {
    if (drawerTimeout.current) {
      clearTimeout(drawerTimeout.current);
      drawerTimeout.current = null;
    }
  };

  const handleOutsideClick = useCallback(
    throttle((event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!ref.current?.contains(target)) {
        if (!drawerTimeout.current && isOpen) {
          drawerTimeout.current = setTimeout(() => {
            clearDrawerTimeout();
            onClose();
          }, 300);
        }
      } else {
        clearDrawerTimeout();
      }
    }, 100),
    [isOpen]
  );

  useEffect(() => {
    if (drawerRef.current) {
      if (drawerObserver.current) {
        drawerObserver.current.disconnect();
      }

      drawerObserver.current = new IntersectionObserver(([entry]) => {
        if (
          entry.isIntersecting &&
          entry.intersectionRect.width < entry.boundingClientRect.width
        ) {
          setLeft({
            right: `0`,
            left: "auto",
          });
        }
      });

      drawerObserver.current.observe(drawerRef.current);
    }

    return () => {
      if (drawerObserver.current) {
        drawerObserver.current.disconnect();
        setLeft({});
      }
    };
  }, [drawerRef, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousemove", handleOutsideClick);
      document.addEventListener("keydown", handleEscape);
    } else {
      document.removeEventListener("mousemove", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousemove", handleOutsideClick);
      clearDrawerTimeout();
    };
  }, [isOpen]);

  return (
    <div ref={ref} className="relative">
      <Trigger
        onClick={drawerOpenMethod === "click" ? onOpen : noop}
        onMouseEnter={drawerOpenMethod === "hover" ? onOpen : noop}
      />
      <Drawer ref={drawerRef} style={left} isOpen={isOpen}>
        {children}
      </Drawer>
    </div>
  );
};

export default DrawerController;
