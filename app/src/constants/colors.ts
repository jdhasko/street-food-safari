export const themeColors = {
  text: {
    primary: "#212121",
    secondary: "#4E4E4E",
    muted: "#757575",
  },
  background: "#FFFFFF",
  card: "#FAFAFA",
  border: "#E0E0E0",
  accent: "#FF9800",
  accentDark: "#F57C00",
  star: "#F5AB00",
  error: "#D32F2F",
  success: "#388E3C",
};

export type Colors = typeof themeColors;

// CommonJS export for Tailwind config
module.exports = { themeColors };
