// tslint:disable: no-var-requires
import "@storybook/addon-console";
import { configure } from "@storybook/react";

import { fonts } from "../src/fonts";

declare const document: any;

function loadFont(family: string, path: string) {
  const fontLoader = document.createElement("style");
  fontLoader.innerHTML = `@font-face { font-family: ${family}; src: url(${path}) }`;
  document.head.appendChild(fontLoader);
}

// Load custom fonts and add to storybook document head
Object.keys(fonts).forEach(family => loadFont(family, (fonts as any)[family]));

// Load icon fonts and add to storybook document head
// expo-web is supposed to do this, but it seems to give the wrong font family to so of the icons,
// so we load them manually here
loadFont("Material Icons", require("react-native-vector-icons/Fonts/MaterialIcons.ttf"));
loadFont("Material Community Icons", require("react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf"));

// automatically import stories from all files ending in *.stories.tsx
const storyReq = require.context("../src", true, /.stories.tsx$/);
function loadStories() {
  storyReq.keys().forEach(filename => storyReq(filename));
}

configure(loadStories, module);
