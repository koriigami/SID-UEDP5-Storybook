#!/usr/bin/env node
/**
 * Fetch Figma variables and write them into tokens/raw/*.json in Style
 * Dictionary format.
 *
 * Two modes:
 *   1. `--mcp` (default when process.env.FIGMA_MCP_URL is present) — reads
 *      the local Figma MCP server the current Claude Code session is
 *      attached to. That's how token-accuracy stays 1:1 with the file.
 *   2. `--rest` — falls back to the Figma REST API with FIGMA_ACCESS_TOKEN.
 *      Used when running the script outside a Claude Code session (e.g. in
 *      CI, on a student's laptop).
 *
 * This file is a runnable stub. The MCP branch is wired to the same tool
 * names the Figma MCP exposes (`get_variable_defs`, `get_metadata`) but
 * needs the MCP server reachable to actually round-trip; when it is not,
 * we exit non-zero with a clear message so the calling shell can decide
 * whether that's a build blocker or a soft warning.
 */

import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "tokens", "raw");

const FIGMA_FILE_KEY = "0fnvdNPdTEPs3ss2ImnjCg";
const FIGMA_START_NODE = "271-15877";
const FIGMA_FILE_NAME = "_prod-design-system-V0.2.0";

function die(msg, code = 1) {
  console.error(`[fetch-figma-tokens] ${msg}`);
  process.exit(code);
}

function log(msg) {
  console.log(`[fetch-figma-tokens] ${msg}`);
}

/**
 * Placeholder: translate a Figma variables payload into Style Dictionary
 * token trees, one per mode. Fill in when running against a real fetch —
 * the exact shape depends on the collection layout in the file.
 */
function figmaToStyleDictionary(_variablesByCollection) {
  throw new Error(
    "figmaToStyleDictionary is a placeholder — implement once the Figma " +
      "MCP is attached and we can inspect the real payload shape.",
  );
}

async function fetchViaMcp() {
  // The Figma MCP tools are surfaced in the Claude Code session and cannot
  // be invoked from a plain Node script. When you run this script from
  // inside a Claude Code session, the recommended pattern is: have Claude
  // call `mcp__Figma__get_variable_defs` directly and pipe the result
  // into this script via stdin. For students running locally, use --rest.
  die(
    "MCP mode: this script cannot dial the MCP server directly. From a " +
      "Claude Code session, ask Claude to call mcp__Figma__get_variable_defs " +
      `for file ${FIGMA_FILE_KEY} node ${FIGMA_START_NODE} and pass the JSON ` +
      "to this script on stdin: `node scripts/fetch-figma-tokens.mjs --stdin`. " +
      "Or run with --rest and FIGMA_ACCESS_TOKEN set.",
  );
}

async function fetchViaRest() {
  const token = process.env.FIGMA_ACCESS_TOKEN;
  if (!token) {
    die(
      "REST mode needs FIGMA_ACCESS_TOKEN in the environment. Copy " +
        ".env.example to .env.local and set your Figma PAT there, or " +
        "export FIGMA_ACCESS_TOKEN in your shell.",
    );
  }

  const url = `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/variables/local`;
  const res = await fetch(url, { headers: { "X-Figma-Token": token } });
  if (!res.ok) {
    die(`Figma REST returned ${res.status} ${res.statusText}. This endpoint requires an Enterprise plan; use MCP mode otherwise.`);
  }
  const payload = await res.json();
  return payload;
}

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) die("--stdin mode expected JSON on stdin, got nothing.");
  try {
    return JSON.parse(raw);
  } catch (err) {
    die(`--stdin JSON parse failed: ${err.message}`);
  }
}

async function main() {
  const mode = process.argv.includes("--rest")
    ? "rest"
    : process.argv.includes("--stdin")
      ? "stdin"
      : "mcp";

  let payload;
  if (mode === "rest") payload = await fetchViaRest();
  else if (mode === "stdin") payload = await readStdin();
  else await fetchViaMcp(); // exits

  log(`Received payload from ${mode}; translating to Style Dictionary…`);
  const { primitives, semanticLight, semanticDark } = figmaToStyleDictionary(payload);

  await mkdir(OUT_DIR, { recursive: true });
  await Promise.all([
    writeFile(join(OUT_DIR, "primitives.json"),      JSON.stringify(primitives,     null, 2) + "\n"),
    writeFile(join(OUT_DIR, "semantic.light.json"),  JSON.stringify(semanticLight,  null, 2) + "\n"),
    writeFile(join(OUT_DIR, "semantic.dark.json"),   JSON.stringify(semanticDark,   null, 2) + "\n"),
    writeFile(
      join(OUT_DIR, "meta.json"),
      JSON.stringify(
        {
          source: mode,
          fetchedAt: new Date().toISOString(),
          figma: { fileKey: FIGMA_FILE_KEY, fileName: FIGMA_FILE_NAME, startNode: FIGMA_START_NODE },
        },
        null,
        2,
      ) + "\n",
    ),
  ]);

  log("Wrote tokens/raw/primitives.json, semantic.light.json, semantic.dark.json, meta.json.");
  log("Run `npm run tokens:build` to regenerate CSS.");
}

main().catch((err) => die(err.stack ?? String(err), 1));
