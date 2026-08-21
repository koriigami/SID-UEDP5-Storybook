#!/usr/bin/env node
/**
 * Download every FIP logo listed in src/stories/fip-logos.ts from Figma
 * into public/fip-logos/<slug>.svg.
 *
 * Runs on a machine that can reach api.figma.com. Reads FIGMA_ACCESS_TOKEN
 * from the environment; never write it to disk.
 *
 * Usage:
 *   export FIGMA_ACCESS_TOKEN=figd_...
 *   npm run fip-logos:fetch
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "public", "fip-logos");
const MANIFEST = join(ROOT, "src", "stories", "fip-logos.ts");

const FILE_KEY = "0fnvdNPdTEPs3ss2ImnjCg";

function log(msg) { console.log(`[fip-logos] ${msg}`); }
function die(msg, code = 1) { console.error(`[fip-logos] ${msg}`); process.exit(code); }

function readManifest() {
  const src = readFileSync(MANIFEST, "utf8");
  // Very small parser: pull { slug: "…", nodeId: "…" } tuples out of the TS.
  const entries = [];
  const re = /\{\s*slug:\s*"([^"]+)"[\s\S]*?nodeId:\s*"([^"]+)"\s*\}/g;
  let m;
  while ((m = re.exec(src))) entries.push({ slug: m[1], nodeId: m[2] });
  if (!entries.length) die(`No entries parsed from ${MANIFEST}`);
  return entries;
}

async function figmaImages(token, nodeIds) {
  // /v1/images returns { images: { "<nodeId>": "<signed url>" } }
  const chunks = [];
  const CHUNK = 20;
  for (let i = 0; i < nodeIds.length; i += CHUNK) chunks.push(nodeIds.slice(i, i + CHUNK));
  const out = {};
  for (const chunk of chunks) {
    const url =
      `https://api.figma.com/v1/images/${FILE_KEY}` +
      `?format=svg&scale=1&ids=${encodeURIComponent(chunk.join(","))}`;
    const res = await fetch(url, { headers: { "X-Figma-Token": token } });
    if (!res.ok) die(`Figma /v1/images ${res.status} ${res.statusText}`);
    const data = await res.json();
    if (data.err) die(`Figma error: ${data.err}`);
    Object.assign(out, data.images ?? {});
  }
  return out;
}

async function downloadSvg(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return await res.text();
}

async function main() {
  const token = process.env.FIGMA_ACCESS_TOKEN;
  if (!token) die("FIGMA_ACCESS_TOKEN missing — set it in your shell first.");

  const entries = readManifest();
  log(`Manifest: ${entries.length} logos`);
  mkdirSync(OUT_DIR, { recursive: true });

  const nodeIds = entries.map((e) => e.nodeId);
  log(`Requesting SVG render URLs from Figma…`);
  const urls = await figmaImages(token, nodeIds);

  let saved = 0;
  let skipped = 0;
  for (const { slug, nodeId } of entries) {
    const out = join(OUT_DIR, `${slug}.svg`);
    const url = urls[nodeId];
    if (!url) { console.warn(`  ! ${slug} (${nodeId}) — no URL returned`); continue; }
    if (existsSync(out)) { skipped++; continue; }
    try {
      const svg = await downloadSvg(url);
      writeFileSync(out, svg);
      saved++;
      process.stdout.write(".");
    } catch (err) {
      console.warn(`\n  ! ${slug} — ${err.message}`);
    }
  }
  console.log("");
  log(`Saved ${saved}, already present ${skipped}. Files in ${OUT_DIR}`);
}

main().catch((err) => die(err.stack ?? String(err)));
