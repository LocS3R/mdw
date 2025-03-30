import { Box, alpha, lighten, useTheme } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import MainContents from "./MainContents";

const MainLayout: React.FC = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        // flex: 1,
        width: "100%",
        // height: "100%",
        // backgroundImage: `url(${imageUrl})`,
        // backgroundSize: "cover", // Đảm bảo ảnh nền phủ toàn bộ khu vực mà không bị méo
        // backgroundPosition: "center", // Căn giữa ảnh nền
        // backgroundRepeat: "no-repeat", // Không lặp lại ảnh nền
        // backgroundAttachment: "fixed", // Giữ ảnh nền cố định khi cuộn trang (nếu cần)
        ".MuiPageTitle-wrapper": {
          background:
            theme.palette.mode === "dark"
              ? theme.colors.alpha.trueWhite[5]
              : theme.colors.alpha.white[50],
          // marginBottom: `${theme.spacing(4)}`,
          boxShadow:
            theme.palette.mode === "dark"
              ? `0 1px 0 ${alpha(
                  lighten(theme.colors.primary.main, 0.7),
                  0.15
                )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
              : `0px 2px 4px -3px ${alpha(
                  theme.colors.alpha.black[100],
                  0.1
                )}, 0px 5px 12px -4px ${alpha(
                  theme.colors.alpha.black[100],
                  0.05
                )}`,
        },
      }}
    >
      <Header />

      <MainContents />
      {/* <LeftBarControl /> */}
      <Box
        sx={{
          position: "relative",
          zIndex: 5,
          display: "block",
          flex: 1,
          pt: `${theme.header.height}`,
          // [theme.breakpoints.up("lg")]: {
          //   ml: `${theme.sidebar.width}`,
          // },
        }}
      >
        <Box display="block">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
