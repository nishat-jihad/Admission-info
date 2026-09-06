// One-time migration script: downloads every external image used by the
// site into /public/images and rewrites the source files to point to the
// local copies instead of hotlinking third-party URLs.
//
// Run once from the project root (after `npm install`):
//   node scripts/download-images.mjs
//
// Safe to re-run: already-downloaded files are skipped.

import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

const ROOT = path.resolve(process.cwd());
const IMAGES_DIR = path.join(ROOT, "public", "images");
const UNIVERSITIES_PATH = path.join(ROOT, "src", "data", "universities.js");
const PAGE_PATH = path.join(ROOT, "src", "app", "page.js");

fs.mkdirSync(IMAGES_DIR, { recursive: true });

function extFromUrl(url) {
  const clean = url.split("?")[0];
  const match = clean.match(/\.(jpg|jpeg|png|webp|gif|avif)$/i);
  return match ? match[1].toLowerCase().replace("jpeg", "jpg") : "jpg";
}

function download(url, destPath) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const req = client.get(
      url,
      { headers: { "User-Agent": "Mozilla/5.0 (image-migration-script)" } },
      (res) => {
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
          res.resume();
          download(res.headers.location, destPath).then(resolve, reject);
          return;
        }
        if (res.statusCode !== 200) {
          res.resume();
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }
        const file = fs.createWriteStream(destPath);
        res.pipe(file);
        file.on("finish", () => file.close(resolve));
        file.on("error", reject);
      }
    );
    req.on("error", reject);
    req.setTimeout(20000, () => req.destroy(new Error("timeout")));
  });
}

async function fetchOne(id, url) {
  const ext = extFromUrl(url);
  const filename = `${id}.${ext}`;
  const destPath = path.join(IMAGES_DIR, filename);
  const publicPath = `/images/${filename}`;

  if (fs.existsSync(destPath)) {
    console.log(`skip  (already have) ${id}`);
    return { id, url, publicPath, ok: true };
  }

  try {
    await download(url, destPath);
    console.log(`ok    ${id} -> ${publicPath}`);
    return { id, url, publicPath, ok: true };
  } catch (err) {
    console.log(`FAIL  ${id} (${err.message}) — keeping original URL, fix manually`);
    return { id, url, publicPath: null, ok: false };
  }
}

async function main() {
  // 1. universities.js — every "photo": "https://..." field
  let uniSource = fs.readFileSync(UNIVERSITIES_PATH, "utf8");
  const photoRegex = /"([a-zA-Z0-9_-]+)":\s*\{[^}]*?"photo":\s*"(https?:[^"]+)"/g;
  const photoMatches = [...uniSource.matchAll(photoRegex)];

  console.log(`Found ${photoMatches.length} university photos.\n`);

  for (const match of photoMatches) {
    const [, id, url] = match;
    const result = await fetchOne(id, url);
    if (result.ok && result.publicPath) {
      uniSource = uniSource.replace(`"photo": "${url}"`, `"photo": "${result.publicPath}"`);
    }
  }
  fs.writeFileSync(UNIVERSITIES_PATH, uniSource, "utf8");

  // 2. page.js — the 3 hardcoded hero images (vc-1 / vc-2 / vc-3)
  let pageSource = fs.readFileSync(PAGE_PATH, "utf8");
  const heroUrls = [...pageSource.matchAll(/src="(https?:[^"]+)"/g)].map((m) => m[1]);

  for (let i = 0; i < heroUrls.length; i++) {
    const url = heroUrls[i];
    const result = await fetchOne(`hero-${i + 1}`, url);
    if (result.ok && result.publicPath) {
      pageSource = pageSource.replace(`src="${url}"`, `src="${result.publicPath}"`);
    }
  }
  fs.writeFileSync(PAGE_PATH, pageSource, "utf8");

  console.log("\nDone. Review the git diff, then commit the new public/images/ folder.");
  console.log("Any line above marked FAIL still points at the old external URL —");
  console.log("download that one image yourself, drop it in public/images/, and update the field by hand.");
}

main();
