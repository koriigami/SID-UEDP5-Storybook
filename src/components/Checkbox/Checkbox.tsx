import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import styles from "./Checkbox.module.css";

/**
 * Qwark Checkbox — mirrors Figma node 3907:23153. Material-3 style checkbox
 * with selected / unselected / indeterminate states plus error variants,
 * driven by tokens (icon.accent for selected, icon.error for error).
 */
export type CheckboxCheckedState = "checked" | "unchecked" | "indeterminate";
export type CheckboxForcedState = "default" | "hover" | "focused" | "pressed" | "disabled";

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "checked" | "defaultChecked" | "onChange" | "size"
> & {
  label?: string;
  /** Named "checkedState" so the Figma variant naming carries over verbatim. */
  checkedState?: CheckboxCheckedState;
  error?: boolean;
  forcedState?: CheckboxForcedState;
  onCheckedChange?: (next: "checked" | "unchecked") => void;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    label,
    checkedState = "unchecked",
    error = false,
    forcedState = "default",
    disabled,
    id,
    className,
    onCheckedChange,
    ...rest
  },
  ref,
) {
  const effective: CheckboxForcedState = disabled ? "disabled" : forcedState;
  const rootClass = [
    styles.root,
    styles[`state-${effective}`],
    error ? styles.error : "",
    className ?? "",
  ].filter(Boolean).join(" ");

  const boxClass = [
    styles.box,
    checkedState !== "unchecked" ? styles.filled : styles.empty,
    error ? styles.errorBox : "",
  ].filter(Boolean).join(" ");

  return (
    <label className={rootClass} htmlFor={id} data-figma-node="3907:23153">
      <span className={styles.stateLayer} aria-hidden="true" />
      <span className={boxClass}>
        {checkedState === "checked" && (
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M5 12.5 10 17l9-10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {checkedState === "indeterminate" && (
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M6 12h12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        )}
      </span>
      <input
        ref={ref}
        type="checkbox"
        id={id}
        className={styles.input}
        checked={checkedState === "checked"}
        aria-checked={checkedState === "indeterminate" ? "mixed" : checkedState === "checked"}
        aria-invalid={error || undefined}
        disabled={disabled || effective === "disabled"}
        onChange={(e) => onCheckedChange?.(e.target.checked ? "checked" : "unchecked")}
        {...rest}
      />
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
});
