import { tokens } from "../tokens/generated";

type Kind = "color" | "size" | "text";

const SECTIONS: Array<{ title: string; group: keyof typeof tokens; prefix: string; kind: Kind }> = [
  { title: "Backgrounds",         group: "color", prefix: "color-background-",  kind: "color" },
  { title: "Text",                group: "color", prefix: "color-text-",        kind: "color" },
  { title: "Icons",               group: "color", prefix: "color-icon-",        kind: "color" },
  { title: "Strokes",             group: "color", prefix: "color-stroke-",      kind: "color" },
  { title: "Button — background", group: "color", prefix: "color-button-background-", kind: "color" },
  { title: "Button — text",       group: "color", prefix: "color-button-text-",       kind: "color" },
  { title: "Button — icon",       group: "color", prefix: "color-button-icon-",       kind: "color" },
  { title: "Button — stroke",     group: "color", prefix: "color-button-stroke-",     kind: "color" },
  { title: "State layers",        group: "color", prefix: "color-state-layer-",       kind: "color" },
  { title: "Material 3 aliases",  group: "color", prefix: "color-m3-",                kind: "color" },
  { title: "Focus ring",          group: "color", prefix: "color-focus-ring",         kind: "color" },
  { title: "Neutrals (primitive)",group: "color", prefix: "color-primitive-neutral-", kind: "color" },
  { title: "Brand + Cyan + Error (primitive)", group: "color", prefix: "color-primitive-", kind: "color" },

  { title: "Spacing",             group: "space",  prefix: "space-",        kind: "size" },
  { title: "Radius",              group: "radius", prefix: "radius-",       kind: "size" },
  { title: "Button heights",      group: "size",   prefix: "size-button-",  kind: "size" },
  { title: "Icon sizes",          group: "size",   prefix: "size-icon-",    kind: "size" },

  { title: "Typography (Qwark)",  group: "font",   prefix: "font-qwark-",   kind: "text" },
  { title: "Motion — duration",   group: "motion", prefix: "motion-duration-", kind: "text" },
  { title: "Motion — easing",     group: "motion", prefix: "motion-easing-",   kind: "text" },
];

function collect(group: keyof typeof tokens, prefix: string) {
  const g = tokens[group] ?? {};
  return Object.entries(g)
    .filter(([name]) => name.startsWith(prefix))
    // Prevent the more general "color-primitive-" section from including neutrals which have their own section
    .filter(([name]) => (prefix === "color-primitive-" ? !name.startsWith("color-primitive-neutral-") : true))
    .sort(([a], [b]) => a.localeCompare(b));
}

export function TokenGallery() {
  return (
    <div style={{ display: "grid", gap: 40 }}>
      {SECTIONS.map((s) => (
        <Section key={s.title} title={s.title} rows={collect(s.group, s.prefix)} kind={s.kind} />
      ))}
    </div>
  );
}

function Section({ title, rows, kind }: { title: string; rows: Array<[string, string]>; kind: Kind }) {
  if (rows.length === 0) return null;
  return (
    <section>
      <h3 style={{ marginBottom: 12, fontFamily: "var(--font-family-serif)" }}>{title}</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 12,
        }}
      >
        {rows.map(([name, value]) => (
          <Swatch key={name} name={name} value={value} kind={kind} />
        ))}
      </div>
    </section>
  );
}

function Swatch({ name, value, kind }: { name: string; value: string; kind: Kind }) {
  const varRef = `var(--${name})`;
  const border = "1px solid var(--color-stroke-default)";
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", padding: 10, border, borderRadius: 8, background: "var(--color-background-surface)" }}>
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 8,
          background: kind === "color" ? varRef : "var(--color-background-sunken)",
          display: kind !== "color" ? "flex" : undefined,
          alignItems: "center",
          justifyContent: "center",
          border,
          overflow: "hidden",
          color: "var(--color-text-primary)",
        }}
      >
        {kind === "size" && (
          <div style={{ background: "var(--color-icon-accent)", width: varRef, height: 6, borderRadius: 3 }} />
        )}
        {kind === "text" && (
          <div style={{ fontSize: 11, color: "var(--color-text-secondary)", padding: 4, textAlign: "center" }}>{value}</div>
        )}
      </div>
      <div style={{ display: "grid", minWidth: 0, fontFamily: "var(--font-family-serif)" }}>
        <code style={{ fontFamily: "var(--font-family-sans)", fontSize: 12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: "var(--color-text-primary)" }}>
          --{name}
        </code>
        <small style={{ color: "var(--color-text-secondary)" }}>{value}</small>
      </div>
    </div>
  );
}
