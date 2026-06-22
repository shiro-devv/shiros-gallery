import { readdirSync, existsSync, statSync } from "fs"
import { join, parse } from "path"
import { execSync } from "child_process"

const ASSETS_DIR = new URL("../src/assets", import.meta.url).pathname

const files = readdirSync(ASSETS_DIR).filter(
  (f) => /\.(heic|heif)$/i.test(f)
)

if (files.length === 0) {
  console.log("No HEIC/HEIF files found.")
  process.exit(0)
}

for (const file of files) {
  const srcPath = join(ASSETS_DIR, file)
  const outName = parse(file).name + ".webp"
  const outPath = join(ASSETS_DIR, outName)

  if (existsSync(outPath) && statSync(outPath).mtimeMs > statSync(srcPath).mtimeMs) {
    console.log(`  SKIP  ${file} → ${outName} (up to date)`)
    continue
  }

  console.log(`  CONV  ${file} → ${outName}`)
  execSync(`heif-convert -q 85 "${srcPath}" "${outPath}"`, { stdio: "ignore" })
}

console.log(`Done. ${files.length} file(s) processed.`)
