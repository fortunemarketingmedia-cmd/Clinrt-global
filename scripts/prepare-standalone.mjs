import { cp, mkdir, rm, stat } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const buildDir = path.join(rootDir, "build");
const standaloneDir = path.join(buildDir, "standalone");
const staticDir = path.join(buildDir, "static");
const standaloneStaticDir = path.join(standaloneDir, "build", "static");
const publicDir = path.join(rootDir, "public");
const standalonePublicDir = path.join(standaloneDir, "public");

async function exists(target) {
  try {
    await stat(target);
    return true;
  } catch {
    return false;
  }
}

async function copyDir(source, target) {
  await rm(target, { recursive: true, force: true });
  await mkdir(path.dirname(target), { recursive: true });
  await cp(source, target, { recursive: true });
}

async function main() {
  if (!(await exists(standaloneDir))) {
    throw new Error(
      "Standalone output not found. Run `next build` before preparing deployment assets.",
    );
  }

  if (await exists(staticDir)) {
    await copyDir(staticDir, standaloneStaticDir);
  }

  if (await exists(publicDir)) {
    await copyDir(publicDir, standalonePublicDir);
  }

  console.log("Standalone deployment bundle is ready in build/standalone.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
