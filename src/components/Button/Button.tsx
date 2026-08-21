import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

/**
 * Variant props mirror the Figma `Button` component's variant properties
 * (`variant`, `size`, `tone`, `iconOnly`, `loading`). Keep the names in sync
 * with Figma so Code Connect mappings stay 1:1.
 */
export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

type BaseProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled" | "children">;

type LabelledProps = BaseProps & {
  children: ReactNode;
  iconOnly?: false;
  ariaLabel?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
};

/** Icon-only variant REQUIRES ariaLabel — enforced by the type union. */
type IconOnlyProps = BaseProps & {
  iconOnly: true;
  ariaLabel: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
};

export type ButtonProps = LabelledProps | IconOnlyProps;

const Spinner = () => (
  <span className={styles.spinner} aria-hidden="true">
    <svg viewBox="0 0 24 24" role="presentation" focusable="false">
      <circle cx="12" cy="12" r="9" fill="none" strokeWidth="3" opacity="0.25" />
      <path d="M21 12a9 9 0 0 1-9 9" fill="none" strokeWidth="3" strokeLinecap="round" />
    </svg>
  </span>
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  props,
  ref,
) {
  const {
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    ariaLabel,
    className,
    children,
    ...rest
  } = props;

  const iconOnly = (props as IconOnlyProps).iconOnly === true;
  const leadingIcon = !iconOnly ? (props as LabelledProps).leadingIcon : undefined;
  const trailingIcon = !iconOnly ? (props as LabelledProps).trailingIcon : undefined;

  const classes = [
    styles.root,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    iconOnly ? styles.iconOnly : "",
    loading ? styles.loading : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      ref={ref}
      type="button"
      {...rest}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-label={ariaLabel}
    >
      {loading && <Spinner />}
      <span className={styles.contents} data-hidden={loading || undefined}>
        {leadingIcon && <span className={styles.icon}>{leadingIcon}</span>}
        <span className={styles.label}>{children}</span>
        {trailingIcon && <span className={styles.icon}>{trailingIcon}</span>}
      </span>
    </button>
  );
});
