import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

/**
 * Qwark Button — mirrors Figma node 14:21.
 * Variant properties match the Figma component 1:1:
 *   - type:  "primary" | "tonal" | "outline" | "text"
 *   - size:  "default" | "small" | "xsmall"
 *   - state: "default" | "hover" | "focused" | "pressed" | "disabled" (state=hover/focused/pressed
 *            is normally handled by :hover/:focus-visible/:active — the explicit prop is exposed
 *            for the docs matrix that needs to render every combination side by side).
 */
export type ButtonType = "primary" | "tonal" | "outline" | "text";
export type ButtonSize = "default" | "small" | "xsmall";
export type ButtonForcedState = "default" | "hover" | "focused" | "pressed" | "disabled";

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "children"> & {
  buttonType?: ButtonType;
  size?: ButtonSize;
  /** For the docs matrix. In real usage leave this as `default` and let CSS handle interactive state. */
  forcedState?: ButtonForcedState;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  loading?: boolean;
  children: ReactNode;
  /** Optional native form type. Defaults to "button" so the component never accidentally submits a form. */
  htmlType?: "button" | "submit" | "reset";
};

const Spinner = () => (
  <svg viewBox="0 0 24 24" className={styles.spinner} aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
    <path d="M21 12a9 9 0 0 1-9 9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    buttonType = "primary",
    size = "default",
    forcedState = "default",
    leadingIcon,
    trailingIcon,
    loading = false,
    disabled,
    htmlType = "button",
    className,
    children,
    ...rest
  },
  ref,
) {
  const effectiveState: ButtonForcedState = disabled ? "disabled" : forcedState;

  const rootClass = [
    styles.root,
    styles[`type-${buttonType}`],
    styles[`size-${size}`],
    effectiveState !== "default" ? styles[`state-${effectiveState}`] : "",
    loading ? styles.loading : "",
    className ?? "",
  ].filter(Boolean).join(" ");

  return (
    <button
      ref={ref}
      type={htmlType}
      {...rest}
      className={rootClass}
      disabled={disabled || loading || effectiveState === "disabled"}
      aria-busy={loading || undefined}
      data-figma-node="14:21"
    >
      <span className={styles.stateLayer} aria-hidden="true" />
      <span className={styles.content} data-hidden={loading || undefined}>
        {leadingIcon && <span className={styles.icon}>{leadingIcon}</span>}
        <span className={styles.label}>{children}</span>
        {trailingIcon && <span className={styles.icon}>{trailingIcon}</span>}
      </span>
      {loading && <span className={styles.spinnerWrap}><Spinner /></span>}
    </button>
  );
});
