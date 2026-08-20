import { tokens } from "../tokens/generated";

const SECTIONS: Array<{ title: string; prefix: string; kind: Kind }> = [
  { title: "Color — semantic",  prefix: "color-",                              kind: "color" },
  { title: "Color — primitive", prefix: "color-primitive-",                    kind: "color" },
  { title: "Spacing",           prefix: "space-",                              kind: "size" },
  { title: "Radius",            prefix: "radius-",                             kind: "size" },
  { title: "Control sizes",     prefix: "size-control-",                       kind: "size" },
  { title: "Typography — size", prefix: "font-size-",                          kind: "size" },
  { title: "Typography — weight", prefix: "font-weight-",                      kind: "text" },
  { title: "Typography — line-height", prefix: "font-line-height-",            kind: "text" },
  { title: "Motion — duration", prefix: "motion-duration-",                    kind: "text" },
  { title: "Motion — easing",   prefix: "motion-easing-",                      kind: "text" },
];

type Kind = "color" | "size" | "text";

function collect(group: keyof typeof tokens, prefix: string) {
  const g = tokens[group] ?? {};
  return Object.entries(g)
    .filter(([name]) => name.startsWith(prefix))
    // Semantic + primitive live in the same group; exclude primitive rows from semantic sections.
    .filter(([name]) => (prefix === "color-" ? !name.startsWith("color-primitive-") : true))
    .sort(([a], [b]) => a.localeCompare(b));
}

const groupFor = (prefix: string): keyof typeof tokens => {
  if (prefix.startsWith("color")) return "color";
  if (prefix.startsWith("space") || prefix.startsWith("radius") || prefix.startsWith("size")) {
    if (prefix.startsWith("space")) return "space";
    if (prefix.startsWith("radius")) return "radius";
    return "size";
  }
  if (prefix.startsWith("font")) return "font";
  if (prefix.startsWith("motion")) return "motion";
  return "color";
};

export function TokenGallery() {
  return (
    <div style={{ display: "grid", gap: 40 }}>
      {SECTIONS.map((s) => (
        <Section key={s.title} title={s.title} rows={collect(groupFor(s.prefix), s.prefix)} kind={s.kind} />
      ))}
    </div>
  );
}

function Section({
  title,
  rows,
  kind,
}: {
  title: string;
  rows: Array<[string, string]>;
  kind: Kind;
}) {
  if (rows.length === 0) return null;
  return (
    <section>
      <h3 style={{ marginBottom: 12 }}>{title}</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
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
  const border = "1px solid var(--color-border-subtle)";
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", padding: 8, border, borderRadius: 8 }}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 6,
          background: kind === "color" ? varRef : "var(--color-surface-sunken)",
          display: kind === "size" ? "flex" : undefined,
          alignItems: "center",
          justifyContent: "center",
          border,
          overflow: "hidden",
        }}
      >
        {kind === "size" && (
          <div style={{ background: "var(--color-accent-default)", width: varRef, height: 6, borderRadius: 3 }} />
        )}
        {kind === "text" && (
          <div style={{ fontSize: 12, color: "var(--color-text-secondary)", padding: 6 }}>{value}</div>
        )}
      </div>
      <div style={{ display: "grid", minWidth: 0 }}>
        <code style={{ fontSize: 12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>--{name}</code>
        <small style={{ color: "var(--color-text-secondary)" }}>{value}</small>
      </div>
    </div>
  );
}
