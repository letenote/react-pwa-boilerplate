const path = require("path");

module.exports = {
  root: path.resolve(__dirname, "../"),
  outputPath: path.resolve(__dirname, "../", "dist"),
  entryPath: path.resolve(__dirname, "../", "src/index.js"),
  templatePath: path.resolve(__dirname, "../", "public/index.html"),
  imagesFolder: "assets/images",
  fontsFolder: "assets/fonts",
  cssFolder: "assets/css",
  jsFolder: "assets/js",
  favIco: path.resolve(__dirname, "../", "public/assets/images/favicon.ico"),
  appleIcon: path.resolve(
    __dirname,
    "../",
    "public/assets/images/logo512.png"
  ),
  assetManifest: path.resolve(__dirname, "../", "public/asset-manifest.json"),
  robotTxt: path.resolve(__dirname, "../", "public/robot.txt"),
  manifest: path.resolve(__dirname, "../", "public/manifest.json")
};
