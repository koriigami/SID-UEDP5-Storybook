import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import styles from "./Radio.module.css";

/**
 * Qwark Radio — mirrors Figma node 4475:26681. Material-3 style, single
 * selected/unselected state × five interactive states.
 */
export type RadioForcedState = "default" | "hover" | "focused" | "pressed" | "disabled";

export type RadioProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size" | "onChange"
> & {
  label?: string;
  forcedState?: RadioForcedState;
  onSelected?: () => void;
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, forcedState = "default", disabled, id, className, onSelected, checked, ...rest },
  ref,
) {
  const effective: RadioForcedState = disabled ? "disabled" : forcedState;
  const rootClass = [
    styles.root,
    styles[`state-${effective}`],
    className ?? "",
  ].filter(Boolean).join(" ");

  return (
    <label className={rootClass} htmlFor={id} data-figma-node="4475:26681">
      <span className={styles.stateLayer} aria-hidden="true" />
      <span className={styles.ring}>
        <span className={styles.dot} data-visible={checked || undefined} />
      </span>
      <input
        ref={ref}
        type="radio"
        id={id}
        className={styles.input}
        checked={checked}
        disabled={disabled || effective === "disabled"}
        onChange={() => onSelected?.()}
        {...rest}
      />
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
});
