const workboxBuild = require("workbox-build")
// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
  return workboxBuild
    .injectManifest({
      swSrc: "src/sw.js",
      swDest: "build/static/sw.js",
      globDirectory: "build",
      globPatterns: ["**/*.{js,css,html,png}"],
    })
    .then(({ count, size, warnings }) => {
      warnings.forEach(console.warn)
      console.log(`${count} files will be precached, totaling ${size} bytes.`)
    })
}
buildSW()
