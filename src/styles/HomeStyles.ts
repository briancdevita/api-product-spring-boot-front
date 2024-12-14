import { SxProps, Theme } from "@mui/material";

export const homeStyles = {
  mainContainer: {
    maxWidth: "800px",
    margin: "84px auto 0",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    marginBottom: "30px",
    textAlign: "center",
    color: "#1F2937",
    fontSize: "2.5rem",
    fontWeight: "bold",
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: "-10px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "60px",
      height: "4px",
      backgroundColor: "#4F46E5",
      borderRadius: "2px",
    }
  },
  subtitle: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#374151",
    fontSize: "1.5rem",
    fontWeight: "600",
  },
  dataGridContainer: {
    height: 400,
    marginBottom: "30px",
    "& .MuiDataGrid-root": {
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    }
  },
  formField: {
    marginBottom: "15px",
  },
  formControl: {
    marginBottom: "20px",
  },
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    mt: 3
  }
} as Record<string, SxProps<Theme>>;

export const navbarStyles = {
  logo: {
    mr: 2,
    display: { xs: 'none', md: 'flex' },
    fontWeight: 700,
    color: 'white',
    textDecoration: 'none',
  },
  mobileMenuContainer: {
    flexGrow: 1,
    display: { xs: 'flex', md: 'none' }
  },
  mobileMenu: {
    display: { xs: 'block', md: 'none' },
  },
  mobileLogo: {
    mr: 2,
    display: { xs: 'flex', md: 'none' },
    flexGrow: 1,
    fontWeight: 700,
    color: 'white',
    textDecoration: 'none',
  },
  desktopMenu: {
    flexGrow: 1,
    display: { xs: 'none', md: 'flex' },
    justifyContent: 'flex-end'
  },
  menuButton: {
    my: 2,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    }
  },
  createButton: {
    my: 2,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    }
  }
} as Record<string, SxProps<Theme>>; 