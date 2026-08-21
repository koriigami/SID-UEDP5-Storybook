import { useState } from "react";
import { FIP_LOGOS, type FipLogo, type FipType } from "./fip-logos";

const TYPE_COLORS: Record<FipType, string> = {
  Bank:         "var(--color-primitive-brand-base)",
  Depositories: "var(--color-primitive-cyan-50)",
  RTA:          "var(--color-primitive-neutral-700)",
  CRA:          "var(--color-primitive-neutral-500)",
};

const TYPES: FipType[] = ["Bank", "Depositories", "RTA", "CRA"];

function initials(name: string) {
  // "HDFC Bank" -> "HB", "SBI" -> "SB", "Bank of Baroda" -> "BB"
  const words = name.replace(/\(.*?\)/g, "").split(/\s+/).filter(Boolean);
  const first = words[0] ?? "";
  const second = words[1];
  if (!second) return first.slice(0, 2).toUpperCase();
  return ((first[0] ?? "") + (second[0] ?? "")).toUpperCase();
}

export function FipLogoGrid() {
  const [filter, setFilter] = useState<FipType | "All">("All");
  const rows = filter === "All" ? FIP_LOGOS : FIP_LOGOS.filter((l) => l.type === filter);

  return (
    <div style={{ display: "grid", gap: 24 }}>
      <FilterBar filter={filter} onChange={setFilter} counts={counts()} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 12,
        }}
      >
        {rows.map((logo) => (
          <LogoCard key={logo.slug} logo={logo} />
        ))}
      </div>
    </div>
  );
}

function FilterBar({
  filter,
  onChange,
  counts,
}: {
  filter: FipType | "All";
  onChange: (v: FipType | "All") => void;
  counts: Record<FipType | "All", number>;
}) {
  const opts: Array<FipType | "All"> = ["All", ...TYPES];
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {opts.map((o) => {
        const active = o === filter;
        return (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            style={{
              padding: "6px 12px",
              borderRadius: "var(--radius-pill)",
              border: `1px solid ${active ? "var(--color-primitive-brand-base)" : "var(--color-stroke-default)"}`,
              background: active ? "var(--color-primitive-brand-base)" : "var(--color-background-surface)",
              color:      active ? "var(--color-text-on-brand)"        : "var(--color-text-primary)",
              fontFamily: "var(--font-family-serif)",
              fontSize:   "var(--font-qwark-label-medium-size)",
              cursor: "pointer",
            }}
          >
            {o} · {counts[o]}
          </button>
        );
      })}
    </div>
  );
}

function counts() {
  const c: Record<FipType | "All", number> = { All: FIP_LOGOS.length, Bank: 0, Depositories: 0, RTA: 0, CRA: 0 };
  for (const l of FIP_LOGOS) c[l.type]++;
  return c;
}

function LogoCard({ logo }: { logo: FipLogo }) {
  const src = `${import.meta.env.BASE_URL}fip-logos/${logo.slug}.svg`;

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        padding: 12,
        borderRadius: 12,
        border: "1px solid var(--color-stroke-default)",
        background: "var(--color-background-surface)",
        color: "var(--color-text-primary)",
        fontFamily: "var(--font-family-serif)",
      }}
    >
      <LogoImage logo={logo} src={src} />
      <div style={{ display: "grid", minWidth: 0 }}>
        <span
          style={{
            fontSize: "var(--font-qwark-label-large-size)",
            fontWeight: "var(--font-weight-semibold)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {logo.name}
        </span>
        <span style={{ fontSize: "var(--font-qwark-label-medium-size)", color: "var(--color-text-secondary)" }}>
          {logo.type} · {logo.nodeId}
        </span>
      </div>
    </div>
  );
}

function LogoImage({ logo, src }: { logo: FipLogo; src: string }) {
  const [failed, setFailed] = useState(false);
  const box: React.CSSProperties = {
    width: 40,
    height: 40,
    borderRadius: 8,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    background: "var(--color-background-sunken)",
    overflow: "hidden",
  };
  if (failed) {
    return (
      <span
        style={{
          ...box,
          background: TYPE_COLORS[logo.type],
          color: "var(--color-text-on-brand)",
          fontWeight: "var(--font-weight-semibold)",
          letterSpacing: "0.5px",
          fontSize: 14,
          fontFamily: "var(--font-family-serif)",
        }}
        aria-label={`${logo.name} placeholder`}
        title={`Missing ${logo.slug}.svg — run npm run fip-logos:fetch`}
      >
        {initials(logo.name)}
      </span>
    );
  }
  return (
    <span style={box}>
      <img
        src={src}
        alt=""
        width={24}
        height={24}
        onError={() => setFailed(true)}
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    </span>
  );
}
