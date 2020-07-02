import { generate, generateRules } from "@homebound/truss";
import { darkPalette, palette, lightPalette } from "./palette";

// The increment setting means that abbreviations like `mt1` will be `marginTop: 6px`.
const increment = 6;

// Control how many `mt0`, `mt1`, ... `mt6` methods you want for each increment-based rule.
const numberOfIncrements = 7;

// This uses the convention of f10 --> 10px, but you can use `f1`, `f2`, etc. if you want.
const fonts = {
  f10: "10px",
  f12: "12px",
  f14: "14px",
  f24: "24px",
};

// This creates the default/out-of-the-box method/rule set.
const methods = generateRules({ palette, fonts, numberOfIncrements });

// Create the darkMode/lightMode
methods["modes"] = [
  makeRule("darkMode", Object.fromEntries(Object.entries(darkPalette).map(([color, value]) => {
    return [`--${color}`, value];
  }))),
  makeRule("lightMode", Object.fromEntries(Object.entries(lightPalette).map(([color, value]) => {
    return [`--${color}`, value];
  })))
];

// Custom makeRule that does an "as any" for setting variables
export function makeRule(abbr: string, defs: object): string {
  return `get ${abbr}() { return this${Object.entries(defs)
    .map(([prop, value]) => `.add("${prop}" as any, "${value}")`)
    .join("")}; }`;
}

// Optionally configure breakpoints to sm/md/mdAndUp/mdOrLg/etc. media query consts
const breakpoints = { sm: 0, md: 600, lg: 960 };

generate({
  outputPath: "../src/Css.ts",
  methods,
  increment,
  breakpoints,
}).then(
  () => console.log("done"),
  (err) => console.error(err),
);
