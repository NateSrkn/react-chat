import { createGlobalStyle } from "styled-components";

const colors = {
  green: "#48BB78",
  blue: "#5C7AFF",
  darkBlue: "#192A51",
  black: "#1A202C",
  offBlack: "#46546E",
  white: "#FBFBFF",
  offWhite: "hsl(0, 5%, 85%)",
};

const light = {
  bg: {
    primary: colors.white,
    secondary: colors.offWhite,
  },
  text: {
    primary: colors.black,
  },
  border: {
    primary: colors.black,
  },
};

const dark = {
  bg: {
    primary: colors.black,
    secondary: colors.offBlack,
  },
  text: {
    primary: colors.white,
  },
  border: {
    primary: colors.offWhite,
  },
};

const fontFamily = {
  serif: "serif",
  sans: "Helvetica Neue, sans-serif",
  mono: "JetBrains Mono",
};

const defaultTheme = {
  button: {
    color: colors.white,
    background: colors.green,
    fontFamily: fontFamily.mono,
    padding: "10px",
    borderRadius: "5px",
  },
  headers: {
    fontFamily: fontFamily.mono,
    fontWeight: "normal",
    subheader: {
      fontWeight: "100",
      fontSize: "14px",
    },
  },
  font: {
    sans: `font-family: ${fontFamily.sans}; letter-spacing: 0.05em`,
  },
  fontSizes: {
    sm: "clamp(14px, 2vw, 18px)",
  },
  boxShadow: {
    base:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  fontWeights: {
    body: "normal",
  },
  breakpoints: {
    mobile: "550px",
  },
  error: "#e23838",
  transition: (type, time) => `${type} ${time} ease`,
  fontSize: (min = "14px", ideal = "1vh", max = "20px") =>
    `clamp(${min}, ${ideal}, ${max})`,
  bgTransition: "background .3s ease",
  colorTransition: "color .3s ease",
};

export const lightTheme = { colors, fontFamily, ...defaultTheme, ...light };
export const darkTheme = { colors, fontFamily, ...defaultTheme, ...dark };

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  
  body {
    transition: ${(props) => props.theme.bgTransition};
    background: ${(props) => props.theme.bg.primary};
    color: ${(props) => props.theme.text.primary};
    font-family: ${(props) => props.theme.fontFamily.sans};
    min-height: 100vh;
    max-height: 100vh;
    overflow: hidden;
    @supports (-webkit-touch-callout: none) {
      height: -webkit-fill-available;
    }
  }

  main {
    width: 100%;
    max-height: 100vh;
    .content {
      height: calc(100% - 100px);
    }
  }

  ul {
    list-style: none;
  }

  .button {
    transition: ${(props) => props.theme.colorTransition};
    border: 1px solid ${(props) => props.theme.colors.green};
    background: ${(props) => props.theme.colors.green};
    padding: 10px;
    border-radius: 10px;
  }
`;
