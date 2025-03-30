import React from "react";
import { useRoutes } from "react-router-dom";
import router from "./routes/router";
import ThemeProviderWrapper from "./theme/ThemeProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { vi } from "date-fns/locale";
import { CssBaseline } from "@mui/material";

const App: React.FC = () => {
  const content = useRoutes(router);
  return (
    <ThemeProviderWrapper>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
        <CssBaseline />
        {content}
      </LocalizationProvider>
    </ThemeProviderWrapper>
  );
};

export default App;
