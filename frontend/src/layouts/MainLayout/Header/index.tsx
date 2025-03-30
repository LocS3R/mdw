import * as React from "react";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

// import ToggleColorMode from "./ToggleColorMode";
import { Logout } from "@mui/icons-material";
// import ToggleColorMode from "./ToggleTheme";
// import { ThemeContext } from "../../../theme/ThemeProvider";
import {
  Avatar,
  // Container,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  // Stack,
  Tooltip,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import HeaderMenu from "./Menu";
// import AuthService from "../../../service/AuthService";

const logoStyle = {
  height: "40px",
  cursor: "pointer",
};

const Header: React.FC = () => {
  // const [open, setOpen] = React.useState(false);
  // const setThemeName = React.useContext(ThemeContext);
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);
  const openA = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
  };
  // const navigate = useNavigate();

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 1,
        }}
      >
        {/* <Container maxWidth="xl"> */}
        <Toolbar
          variant="regular"
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            // borderRadius: "999px",
            bgcolor:
              theme.palette.mode === "light"
                ? "rgba(255, 255, 255, 0.4)"
                : "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(24px)",
            maxHeight: 70,
            border: "1px solid",
            borderColor: "divider",
            boxShadow:
              theme.palette.mode === "light"
                ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
          })}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              // ml: "-18px",
              justifyContent: "space-between",
              p: 1.5,
              ml: 1.5,
              px: 0,
            }}
          >
            <Link
              to="/"
              style={{ textDecoration: "none" }}
              onClick={(e) => e.preventDefault}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                }}
              >
                <img src={""} style={logoStyle} alt="logo of sitemark" />
                {/* <Typography variant="h4" sx={{ color: "#40A578" }}>
                  SYSTEM SUSTAINABILITY VIETNAM{" "}
                </Typography> */}
              </Box>
            </Link>

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <HeaderMenu />
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "flex", md: "flex" },
              gap: 0.5,
              alignItems: "center",
              mr: 2,
            }}
          >
            {/* <ToggleColorMode
                mode={theme.palette.mode}
                toggleColorMode={toggleTheme}
              /> */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar
                    variant="rounded"
                    // alt={user?.username}
                    // src={imageUrl}
                  />
                </IconButton>
              </Tooltip>
            </Box>

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={openA}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  // background: "#223354",
                  backdropFilter: "blur(13px) saturate(180%)",
                  WebkitBackdropFilter: "blur(13px) saturate(180%)",
                  backgroundColor: "#ffff",
                  borderRadius: "12px",
                  // border: 1px solid rgba(255, 255, 255, 0.125);
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "#fff",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{
                horizontal: "right",
                vertical: "top",
              }}
              anchorOrigin={{
                horizontal: "right",
                vertical: "bottom",
              }}
            >
              {/* <Button startIcon={<LibraryBooksIcon />}>Delete</Button> */}
              {/* <Link
                to={`/home/library/${user?.id}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <MenuItem onClick={handleClose}>
                  <LibraryBooksIcon sx={{ mr: 1 }} /> Vocab library
                </MenuItem>
              </Link> */}
              {/* <Divider /> */}
              <Link
                to={`/profile/`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <MenuItem onClick={handleClose}>
                  <Avatar /> Profile
                </MenuItem>
              </Link>
              <Divider />
              <MenuItem
                onClick={handleLogout}
                sx={{
                  color:
                    theme.palette.mode === "dark"
                      ? "white !important"
                      : "black",
                  // "&:hover": { background: "#90D26D !important" },
                }}
              >
                <ListItemIcon>
                  <Logout
                    fontSize="small"
                    sx={{
                      color:
                        theme.palette.mode === "dark"
                          ? "white !important"
                          : "black",
                    }}
                  />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
          {/* <Box sx={{ display: { sm: "", md: "none" } }}>
            <Button
              variant="text"
              color="primary"
              aria-label="menu"
              onClick={toggleSidebar}
              sx={{ minWidth: "30px", p: "4px", mr: 2 }}
            >
              <MenuIcon />
            </Button>
          </Box> */}
        </Toolbar>
        {/* </Container> */}
      </AppBar>
    </div>
  );
};
export default Header;
