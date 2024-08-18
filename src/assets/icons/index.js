// src/assets/icons/index.js

const svgFiles = require.context('.', false, /\.svg$/);
const icons = {};

svgFiles.keys().forEach((filename) => {
  const icon = svgFiles(filename).default;
  const iconName = filename.replace('./', '').replace('.svg', '');
  icons[iconName] = icon;
});

export default icons;
