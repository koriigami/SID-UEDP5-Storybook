/**
 * FIP (Financial Information Provider) logo manifest.
 *
 * Extracted from Figma node 320:260 ("FIP Logo") in
 * `_prod-design-system-V0.2.0`. Each entry names one Figma variant plus a
 * slug used for the file living at `/public/fip-logos/<slug>.svg`.
 *
 * The real SVGs aren't committed — they're brand marks, so pull them fresh
 * from Figma with `npm run fip-logos:fetch` (requires FIGMA_ACCESS_TOKEN)
 * whenever you refresh the file. When a file is missing the Icons page
 * falls back to a colored monogram chip so the page always renders.
 */

export type FipType = "Bank" | "Depositories" | "RTA" | "CRA";

export type FipLogo = {
  slug: string;
  name: string;
  type: FipType;
  nodeId: string;
};

export const FIP_LOGOS: readonly FipLogo[] = [
  { slug: "hdfc-bank",             name: "HDFC Bank",                       type: "Bank",         nodeId: "320:259" },
  { slug: "icici-bank",            name: "ICICI Bank",                      type: "Bank",         nodeId: "320:256" },
  { slug: "canara-bank",           name: "Canara Bank",                     type: "Bank",         nodeId: "320:254" },
  { slug: "sbi",                   name: "SBI",                             type: "Bank",         nodeId: "320:255" },
  { slug: "cdsl",                  name: "CDSL",                            type: "Depositories", nodeId: "2263:7303" },
  { slug: "camsrta",               name: "CAMSRTA",                         type: "RTA",          nodeId: "2264:7322" },
  { slug: "camsnps",               name: "CAMSNPS",                         type: "CRA",          nodeId: "2265:7405" },
  { slug: "kotak-mahindra",        name: "Kotak Mahindra",                  type: "Bank",         nodeId: "320:257" },
  { slug: "bank-of-baroda",        name: "Bank of Baroda",                  type: "Bank",         nodeId: "320:251" },
  { slug: "pnb",                   name: "PNB",                             type: "Bank",         nodeId: "320:253" },
  { slug: "indian-overseas-bank",  name: "Indian Overseas Bank",            type: "Bank",         nodeId: "320:250" },
  { slug: "nsdl",                  name: "NSDL",                            type: "Depositories", nodeId: "2264:7313" },
  { slug: "kfintech-rta",          name: "KFintechRTA",                     type: "RTA",          nodeId: "2265:7387" },
  { slug: "kfintech-nps",          name: "KFintechNPS",                     type: "CRA",          nodeId: "2265:7421" },
  { slug: "union-bank",            name: "Union Bank",                      type: "Bank",         nodeId: "320:258" },
  { slug: "uco-bank",              name: "UCO Bank",                        type: "Bank",         nodeId: "320:252" },
  { slug: "axis-bank",             name: "Axis Bank",                       type: "Bank",         nodeId: "328:19" },
  { slug: "idfc-first-bank",       name: "IDFC First Bank",                 type: "Bank",         nodeId: "328:112" },
  { slug: "protean-nps",           name: "ProteanNPS",                      type: "CRA",          nodeId: "2267:7449" },
  { slug: "federal-bank",          name: "Federal Bank",                    type: "Bank",         nodeId: "397:1145" },
  { slug: "default-bank",          name: "Default Bank",                    type: "Bank",         nodeId: "401:2" },
  { slug: "bank-of-india",         name: "Bank of India",                   type: "Bank",         nodeId: "402:36" },
  { slug: "yes-bank",              name: "Yes Bank",                        type: "Bank",         nodeId: "2000:244" },
  { slug: "au-small-finance",      name: "AU Small Finance Bank Limited",   type: "Bank",         nodeId: "2000:7006" },
  { slug: "bank-of-maharashtra",   name: "Bank of Maharashtra",             type: "Bank",         nodeId: "2002:7015" },
  { slug: "central-bank-of-india", name: "Central Bank of India",           type: "Bank",         nodeId: "2002:7023" },
  { slug: "idbi-bank",             name: "IDBI Bank",                       type: "Bank",         nodeId: "2002:7030" },
  { slug: "indian-bank",           name: "Indian Bank",                     type: "Bank",         nodeId: "2002:7039" },
  { slug: "karur-vysya-bank",      name: "Karur Vysya Bank (KVB)",          type: "Bank",         nodeId: "2002:7056" },
  { slug: "city-union-bank",       name: "City Union Bank",                 type: "Bank",         nodeId: "2003:7068" },
  { slug: "hsbc-bank",             name: "HSBC Bank",                       type: "Bank",         nodeId: "2003:7079" },
  { slug: "indusind-bank",         name: "IndusInd Bank",                   type: "Bank",         nodeId: "2003:7094" },
  { slug: "karnataka-bank",        name: "Karnataka Bank",                  type: "Bank",         nodeId: "2003:7125" },
  { slug: "south-indian-bank",     name: "South Indian Bank",               type: "Bank",         nodeId: "2003:7141" },
  { slug: "punjab-and-sind-bank",  name: "Punjab & Sind Bank",              type: "Bank",         nodeId: "2003:7149" },
];
