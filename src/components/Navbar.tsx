import { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import { navbarStyles } from '@/styles/HomeStyles';
import { CreateProductModal } from './CreateProductModal';

const pages = ['Inicio'];

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={2}
        sx={{
          backgroundColor: '#4F46E5',
          color: 'white'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="h6" noWrap sx={navbarStyles.logo}>
              MiLogo
            </Typography>

            <Box sx={navbarStyles.mobileMenuContainer}>
              <IconButton
                size="large"
                aria-label="menu de navegación"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={navbarStyles.mobileMenu}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography variant="h6" noWrap sx={navbarStyles.mobileLogo}>
              MiLogo
            </Typography>

            <Box sx={navbarStyles.desktopMenu}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={navbarStyles.menuButton}
                >
                  {page}
                </Button>
              ))}
              <Button
                startIcon={<AddIcon />}
                onClick={() => setOpenModal(true)}
                sx={navbarStyles.createButton}
              >
                Crear Producto
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <CreateProductModal 
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
}; 