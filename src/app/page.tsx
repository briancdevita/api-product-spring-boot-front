"use client";

import { Box, Typography } from "@mui/material";
import { Navbar } from "@/components/Navbar";
import { ProductManagement } from "@/components/ProductManagement";
import { homeStyles } from "@/styles/HomeStyles";
import { AuthGuard } from "@/components/AuthGuard";
import { useAuth } from "./context/AuthContext";


export default function HomePage() {
   const {user} =  useAuth();
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Navbar />
       
  
      <AuthGuard>
        <Box sx={homeStyles.mainContainer}>
          <Typography variant="h4" sx={homeStyles.title}>
            Gestión de Productos {user?.username}
          </Typography>
          <ProductManagement />
        </Box>
      </AuthGuard>
    </Box>
  );
}
