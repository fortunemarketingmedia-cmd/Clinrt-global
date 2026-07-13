import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const TARGET_DIRS = ["app", "components"];

const replacements = [
  {
    name: "navItems",
    match: /const\s+navItems\s*=\s*\[[\s\S]*?\];/m,
    replace: "const navItems = navigation.items;",
    import: 'import { navigation } from "@/data";',
  },
  {
    name: "footerLinks",
    match: /const\s+quickLinks\s*=\s*\[[\s\S]*?\];/m,
    replace: "const quickLinks = footerData.quickLinks;",
    import: 'import { footerData } from "@/data";',
  },
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else if (entry.isFile() && /\.(tsx|ts|jsx|js)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

function ensureImport(source, importLine) {
  if (source.includes(importLine)) return source;
  const lines = source.split("\n");
  const insertAt = lines.findIndex((line) => line.startsWith("import "));
  if (insertAt === -1) {
    return `${importLine}\n${source}`;
  }
  lines.splice(insertAt, 0, importLine);
  return lines.join("\n");
}

let updatedCount = 0;

for (const dir of TARGET_DIRS) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) continue;

  for (const file of walk(abs)) {
    let source = fs.readFileSync(file, "utf8");
    let modified = false;

    for (const rule of replacements) {
      if (rule.match.test(source)) {
        source = source.replace(rule.match, rule.replace);
        source = ensureImport(source, rule.import);
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(file, source);
      updatedCount += 1;
      console.log(`Updated: ${path.relative(ROOT, file)}`);
    }
  }
}

if (updatedCount === 0) {
  console.log("No changes applied. Files may already be migrated.");
}
