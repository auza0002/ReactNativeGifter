import { createTheme } from "@rneui/themed";
const theme = createTheme({
  colors: {
    background: "#444444",
    error: {
      background: "#22222222",
      text: "#cc0000",
    },
    dark: "#000000",
    light: "#ffffff",
    primaryPressed: "#444444",
    delete: "#ff0000",
    deletePressed: "rgb(216, 43, 44)",
    yellow: "#FFD52E",
    text: {
      white: "#ffffff",
      primary: "#dddddd",
      secondary: "#bbbbbb",
    },
  },
  typography: {
    title: {
      fontSize: 35,
      fontWeight: "bold",
    },
    title2: {
      fontSize: 31,
      fontWeight: "bold",
    },
    title3: {
      fontSize: 27,
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: 24.5,
      fontWeight: "bold",
    },
    body: {
      fontSize: 18,
      fontWeight: "normal",
    },
    bodyLarge: {
      fontSize: 22,
      fontWeight: "normal",
    },
    small: {
      fontSize: 12,
      fontWeight: "normal",
    },
  },
});

export default theme;
