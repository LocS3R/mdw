import React, { PropsWithChildren, useState } from "react";
import { ThemeProvider, StyledEngineProvider } from "@mui/material";
import { themeCreator } from "./base";
// import { themeCreator } from "./base";

export const ThemeContext = React.createContext((themeName: string): void => {
  console.log(themeName);
});

const ThemeProviderWrapper: React.FC<PropsWithChildren> = (props) => {
  // const curThemeName = localStorage.getItem("appTheme") || "PureLightTheme";
  const curThemeName = "PureLightTheme";
  const [themeName, _setThemeName] = useState(curThemeName);
  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string): void => {
    localStorage.setItem("appTheme", themeName);
    _setThemeName(themeName);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </ThemeContext.Provider>
    </StyledEngineProvider>
  );
};

export default ThemeProviderWrapper;
