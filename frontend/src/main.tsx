import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { HelmetProvider } from "react-helmet-async";
// import { SidebarProvider } from "./contexts/SidebarContext.tsx";
import { BrowserRouter } from "react-router-dom";
// import { store } from "./store/store.ts";
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <HelmetProvider>
    {/* <SidebarProvider> */}
    <BrowserRouter>
      {/* <Provider> */}
      <App />
      {/* </Provider> */}
    </BrowserRouter>
    {/* </SidebarProvider> */}
  </HelmetProvider>
  // </React.StrictMode>,
);
