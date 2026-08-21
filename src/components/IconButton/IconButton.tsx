import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./IconButton.module.css";

/**
 * Qwark Icon Button — mirrors Figma node 3863:32746.
 * Same size ladder as Button but the label is invisible; an `ariaLabel`
 * prop is required by the type so icon-only buttons never ship without
 * an accessible name.
 */
export type IconButtonType = "primary" | "tonal" | "outline" | "standard";
export type IconButtonSize = "default" | "small" | "xsmall";
export type IconButtonForcedState = "default" | "hover" | "focused" | "pressed" | "disabled";

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "children"> & {
  ariaLabel: string;
  icon: ReactNode;
  iconType?: IconButtonType;
  size?: IconButtonSize;
  forcedState?: IconButtonForcedState;
  htmlType?: "button" | "submit" | "reset";
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    ariaLabel,
    icon,
    iconType = "primary",
    size = "default",
    forcedState = "default",
    disabled,
    htmlType = "button",
    className,
    ...rest
  },
  ref,
) {
  const effective: IconButtonForcedState = disabled ? "disabled" : forcedState;
  const rootClass = [
    styles.root,
    styles[`type-${iconType}`],
    styles[`size-${size}`],
    effective !== "default" ? styles[`state-${effective}`] : "",
    className ?? "",
  ].filter(Boolean).join(" ");

  return (
    <button
      ref={ref}
      type={htmlType}
      {...rest}
      className={rootClass}
      disabled={disabled || effective === "disabled"}
      aria-label={ariaLabel}
      data-figma-node="3863:32746"
    >
      <span className={styles.stateLayer} aria-hidden="true" />
      <span className={styles.icon}>{icon}</span>
    </button>
  );
});
