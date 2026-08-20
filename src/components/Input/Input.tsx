import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import styles from "./Input.module.css";

export type InputSize = "sm" | "md" | "lg";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label: string;
  /** Optional description under the label (secondary color, still readable). */
  hint?: string;
  /** Populated error string flips to error state and announces via aria-describedby. */
  error?: string;
  size?: InputSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  /** Hide the visible label but keep it accessible (e.g. inline search). */
  hideLabel?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  props,
  ref,
) {
  const {
    label,
    hint,
    error,
    size = "md",
    leadingIcon,
    trailingIcon,
    hideLabel,
    id,
    className,
    disabled,
    ...rest
  } = props;

  const reactId = useId();
  const inputId = id ?? `in-${reactId}`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  const wrapClasses = [
    styles.field,
    styles[`size-${size}`],
    error ? styles.hasError : "",
    disabled ? styles.disabled : "",
    className ?? "",
  ].filter(Boolean).join(" ");

  return (
    <div className={styles.root}>
      <label htmlFor={inputId} className={hideLabel ? styles.srOnly : styles.label}>
        {label}
      </label>

      <div className={wrapClasses}>
        {leadingIcon && <span className={styles.icon} aria-hidden="true">{leadingIcon}</span>}
        <input
          ref={ref}
          id={inputId}
          className={styles.input}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          disabled={disabled}
          {...rest}
        />
        {trailingIcon && <span className={styles.icon} aria-hidden="true">{trailingIcon}</span>}
      </div>

      {hint && !error && (
        <p id={hintId} className={styles.hint}>{hint}</p>
      )}
      {error && (
        <p id={errorId} className={styles.error} role="alert">{error}</p>
      )}
    </div>
  );
});
