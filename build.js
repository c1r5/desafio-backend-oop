const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["src/index.ts"],
    outfile: "dist/index.js",
    bundle: true,
    sourcemap: true,
    platform: "node"
  })
  .catch(() => process.exit(1));
