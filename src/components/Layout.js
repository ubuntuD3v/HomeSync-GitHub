import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Container, 
  Avatar, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  useMediaQuery, 
  useTheme 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TaskIcon from '@mui/icons-material/CheckCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import PaymentIcon from '@mui/icons-material/Payment';
import HandymanIcon from '@mui/icons-material/Handyman';
import PeopleIcon from '@mui/icons-material/People';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navItems = [
  { name: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { name: 'Tasks', icon: <TaskIcon />, path: '/tasks' },
  { name: 'Grocery', icon: <ShoppingCartIcon />, path: '/grocery' },
  { name: 'Chores', icon: <CleaningServicesIcon />, path: '/chores' },
  { name: 'Bills', icon: <PaymentIcon />, path: '/bills' },
  { name: 'Maintenance', icon: <HandymanIcon />, path: '/maintenance' },
  { name: 'Community', icon: <PeopleIcon />, path: '/community' },
];

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" component="div" sx={{ color: theme.palette.primary.main, fontWeight: 700 }}>
          HomeSync
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem 
            button 
            key={item.name} 
            component={Link} 
            href={item.path}
            selected={router.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.light + '20',
                color: theme.palette.primary.main,
                '& .MuiListItemIcon-root': {
                  color: theme.palette.primary.main,
                },
              },
              '&:hover': {
                backgroundColor: theme.palette.grey[100],
              },
            }}
          >
            <ListItemIcon sx={{ 
              color: router.pathname === item.path ? theme.palette.primary.main : theme.palette.text.secondary 
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      <AppBar position="fixed" sx={{ 
        zIndex: theme.zIndex.drawer + 1, 
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, color: theme.palette.primary.main }}>
            HomeSync
          </Typography>
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 3 }}>
              {navItems.map((item) => (
                <Link href={item.path} key={item.name} passHref>
                  <Typography 
                    component="a" 
                    sx={{ 
                      fontWeight: 500, 
                      color: router.pathname === item.path ? theme.palette.primary.main : theme.palette.text.secondary,
                      '&:hover': { color: theme.palette.primary.main },
                      transition: 'color 0.2s ease-in-out',
                    }}
                  >
                    {item.name}
                  </Typography>
                </Link>
              ))}
            </Box>
          )}
          <Box sx={{ ml: 2 }}>
            <Avatar sx={{ bgcolor: theme.palette.primary.light }}>JS</Avatar>
          </Box>
        </Toolbar>
      </AppBar>
      
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': { width: 250 },
          }}
        >
          {drawer}
        </Drawer>
      )}
      
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: 250,
            flexShrink: 0,
            '& .MuiDrawer-paper': { width: 250, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          {drawer}
        </Drawer>
      )}
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Container maxWidth="xl">
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
