import { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

interface BaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        flex: 1,
        // height: "100%",
        backgroundImage: "linear-gradient(120deg, #a6c0fe 0%, #f68084 100%)",
      }}
    >
      {children || <Outlet />}
    </Box>
  );
};

export default BaseLayout;
