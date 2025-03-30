import {
  Box,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
// import { useAuth } from "../../../../hooks/useAuth";

const ListWrapper = styled(Box)(
  ({ theme }) => `
          .MuiTouchRipple-root {
              display: none;
          }
          
          .MuiListItem-root {
              transition: ${theme.transitions.create(["color", "fill"])};
              &.MuiListItem-indicators {
                  padding: ${theme.spacing(1, 2)};
                  .MuiListItemText-root {
                      .MuiTypography-root {
                          &:before {
                              height: 4px;
                              width: 100%;
                              opacity: 0;
                              visibility: hidden;
                              display: block;
                              position: absolute;
                              bottom: -10px;
                              transition: all .2s;
                              border-radius: ${theme.general.borderRadiusLg};
                              content: "";
                              background: ${theme.colors.primary.main};
                          }
                      }
                  }
  
                  &.active,
                  &:active,
                  &:hover {
                      background: transparent;
                      .MuiListItemText-root {
                          .MuiTypography-root {
                              &:before {
                                  opacity: 1;
                                  visibility: visible;
                                  bottom: 0px;
                              }
                          }
                      }
                  }
              }
          }
  `
);

function HeaderMenu() {
  const ref = useRef<never>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  // const { isLoggedIn } = useAuth();
  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <ListWrapper
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        <List disablePadding component={Box} display="flex">
          <ListItem
            classes={{ root: "MuiListItem-indicators" }}
            button
            component={NavLink}
            to="/"
          >
            <ListItemText
              sx={(theme) => ({
                color: theme.header.textColor,
                fontSize: "30px",
                fontWeight: 700,
              })}
              primaryTypographyProps={{
                noWrap: true,
                fontSize: "18px",
              }}
              primary="Câu chuyện của chúng ta"
            />
          </ListItem>

          <ListItem
            classes={{ root: "MuiListItem-indicators" }}
            button
            ref={ref}
            onClick={handleOpen}
          >
            <ListItemText
              sx={(theme) => ({ color: theme.header.textColor })}
              primaryTypographyProps={{ noWrap: true }}
              primary={
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{ fontSize: "18px" }}
                >
                  Lịch trình
                  <Box display="flex" alignItems="center" pl={0.3}>
                    <ExpandMoreTwoToneIcon fontSize="small" />
                  </Box>
                </Box>
              }
            />
          </ListItem>

          <Menu anchorEl={ref.current} onClose={handleClose} open={isOpen}>
            <>
              <MenuItem sx={{ px: 3 }} component={NavLink} to="/">
                Lịch trình của anh
              </MenuItem>
              <MenuItem sx={{ px: 3 }} component={NavLink} to="/">
                Lịch trình của bé
              </MenuItem>
            </>
          </Menu>
        </List>
      </ListWrapper>
    </>
  );
}

export default HeaderMenu;
