import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {
  Avatar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  Tooltip,
  Typography,
  useTheme,
  Divider,
  ListItemButton,
  Collapse,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhotoAlbumIcon from "@mui/icons-material/PhotoAlbum";

const Header: React.FC = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scheduleOpen, setScheduleOpen] = React.useState(false);
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleScheduleClick = () => {
    setScheduleOpen(!scheduleOpen);
  };

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
        <Toolbar
          variant="regular"
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
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
                <Typography
                  variant="h3"
                  sx={{
                    color: "#40A578",
                    fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
                  }}
                >
                  Đại Lộc ❤ <span style={{ color: "#E75480" }}>Bảo Ân</span>
                </Typography>
              </Box>
            </Link>

            {/* Desktop menu - hidden on mobile */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                ml: 4,
              }}
            >
              <List disablePadding component={Box} display="flex">
                <ListItem
                  button
                  component={Link}
                  to="/"
                  sx={{
                    position: "relative",
                    "&:hover": {
                      "&::after": {
                        opacity: 1,
                        bottom: 0,
                      },
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      height: "4px",
                      width: "100%",
                      bottom: "-10px",
                      left: 0,
                      opacity: 0,
                      transition: "all 0.2s",
                      borderRadius: "8px",
                      backgroundColor: "#5F8B4C",
                    },
                  }}
                >
                  <ListItemText
                    primaryTypographyProps={{
                      noWrap: true,
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                    primary="Câu chuyện của chúng ta"
                  />
                </ListItem>

                <ListItem
                  button
                  component={Link}
                  to="/memories"
                  sx={{
                    position: "relative",
                    "&:hover": {
                      "&::after": {
                        opacity: 1,
                        bottom: 0,
                      },
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      height: "4px",
                      width: "100%",
                      bottom: "-10px",
                      left: 0,
                      opacity: 0,
                      transition: "all 0.2s",
                      borderRadius: "8px",
                      backgroundColor: "#E75480",
                    },
                  }}
                >
                  <ListItemText
                    primaryTypographyProps={{
                      noWrap: true,
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                    primary="Album kỷ niệm"
                  />
                </ListItem>
              </List>
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
            {/* Avatar menu (optional) */}
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={openA ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openA ? "true" : undefined}
                >
                  <Avatar variant="rounded" />
                </IconButton>
              </Tooltip>
            </Box>

            {/* Mobile menu toggle button */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                color="primary"
                aria-label="menu"
                onClick={toggleMobileMenu}
                sx={{
                  p: "8px",
                  color: "#40A578",
                }}
              >
                <MenuIcon />
              </IconButton>
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
                  backdropFilter: "blur(13px) saturate(180%)",
                  WebkitBackdropFilter: "blur(13px) saturate(180%)",
                  backgroundColor: "#ffff",
                  borderRadius: "12px",
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
              {/* Add menu items here if needed */}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "85%", sm: "50%" },
            boxSizing: "border-box",
            background: "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)",
            backdropFilter: "blur(10px)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            borderBottom: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#40A578" }}
          >
            Menu
          </Typography>
          <IconButton onClick={toggleMobileMenu} sx={{ color: "#E75480" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ p: 2 }} component="nav">
          <ListItemButton
            component={Link}
            to="/"
            onClick={toggleMobileMenu}
            sx={{
              borderRadius: "10px",
              mb: 1,
              "&:hover": {
                backgroundColor: "rgba(95, 139, 76, 0.1)",
              },
            }}
          >
            <ListItemIcon>
              <FavoriteIcon sx={{ color: "#E75480" }} />
            </ListItemIcon>
            <ListItemText
              primary="Câu chuyện của chúng ta"
              primaryTypographyProps={{ fontWeight: "bold" }}
            />
          </ListItemButton>

          <ListItemButton
            onClick={handleScheduleClick}
            sx={{
              borderRadius: "10px",
              mb: 1,
              "&:hover": {
                backgroundColor: "rgba(95, 139, 76, 0.1)",
              },
            }}
          >
            <ListItemIcon>
              <AccessTimeIcon sx={{ color: "#5F8B4C" }} />
            </ListItemIcon>
            <ListItemText
              primary="Lịch trình"
              primaryTypographyProps={{ fontWeight: "bold" }}
            />
            {scheduleOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={scheduleOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4, borderRadius: "10px", mb: 1 }}
                component={Link}
                to="/schedule/anh"
                onClick={toggleMobileMenu}
              >
                <ListItemText primary="Lịch trình của Anh" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4, borderRadius: "10px", mb: 1 }}
                component={Link}
                to="/schedule/be"
                onClick={toggleMobileMenu}
              >
                <ListItemText primary="Lịch trình của Bé" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton
            component={Link}
            to="/memories"
            onClick={toggleMobileMenu}
            sx={{
              borderRadius: "10px",
              mb: 1,
              "&:hover": {
                backgroundColor: "rgba(231, 84, 128, 0.1)",
              },
            }}
          >
            <ListItemIcon>
              <PhotoAlbumIcon sx={{ color: "#E75480" }} />
            </ListItemIcon>
            <ListItemText
              primary="Album kỷ niệm"
              primaryTypographyProps={{ fontWeight: "bold" }}
            />
          </ListItemButton>
        </List>

        <Box
          sx={{
            p: 3,
            mt: "auto",
            borderTop: "1px solid rgba(0,0,0,0.1)",
            textAlign: "center",
            color: "rgba(0,0,0,0.6)",
          }}
        >
          <Typography variant="body2">Đại Lộc ❤ Bảo Ân</Typography>
          <Typography variant="caption">
            Tình yêu là điều tuyệt vời nhất
          </Typography>
        </Box>
      </Drawer>
    </div>
  );
};

export default Header;
