import * as React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import GavelIcon from '@mui/icons-material/Gavel';
import MenuIcon from '@mui/icons-material/Menu';

import { useTheme } from '@material-ui/core/styles';

import { DRAWER_BACKGROUND_COLOR, DRAWER_WIDTH } from '../constants';

interface Props {
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const location = useLocation();
  const theme = useTheme();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List sx={{ mt: 10 }}>
        {[
          { label: 'Personal Data', url: 'personal' },
          { label: 'Contract Data', url: 'contract' },
        ].map((el, index) => (
          <ListItem
            sx={
              location.pathname === `/${el.url}`
                ? {
                    background: theme.palette.info.dark,
                    color: 'white',
                  }
                : { color: 'black' }
            }
            component={Link}
            to={el.url}
            key={el.label}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon
                sx={
                  location.pathname === `/${el.url}`
                    ? {
                        color: 'white',
                      }
                    : {}
                }
              >
                {index % 2 === 0 ? (
                  <PersonIcon fontSize={'large'} />
                ) : (
                  <GavelIcon fontSize={'large'} />
                )}
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">{el.label}</Typography>}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100%)` },
          zIndex: 1201,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap component="div">
            Zelt Profile Editor
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: DRAWER_WIDTH },
          flexShrink: { sm: 0 },
        }}
        aria-label="profile menu"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              backgroundColor: DRAWER_BACKGROUND_COLOR,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              backgroundColor: DRAWER_BACKGROUND_COLOR,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}
