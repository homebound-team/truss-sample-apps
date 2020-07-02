const colors = ["Primary", "Secondary", "Third"] as const;
type Colors = typeof colors[number];

export const whitePalette: Record<Colors, string> = {
  Primary: "white",
  Secondary: "black",
  Third: "blue",
};

export const blackPalette: Record<Colors, string> = {
  Primary: "black",
  Secondary: "white",
  Third: "blue",
}

export const palette = Object.fromEntries(colors.map((key) => {
  return [key,`var(--${key})`];
}));

