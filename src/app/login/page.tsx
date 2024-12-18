"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { loginUser } from "@/lib/auth";
import { useAuth } from "../context/AuthContext";


export default function LoginPage() {
  const router = useRouter();
  const { login, token, loading } = useAuth(); // Añadimos loading

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Modificamos el useEffect
  useEffect(() => {
    if (!loading && token) {
      router.push("/");
    }
  }, [token, router, loading]);

  const handleLogin = async () => {
    setError(null);
    try {
      const token = await loginUser(email, password);
      login(token);
      router.push("/");
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Credenciales incorrectas. Inténtalo de nuevo.");
    }
  };

  // Si está cargando, mostramos un spinner o nada
  if (loading) {
    return null; // O puedes mostrar un spinner si prefieres
  }

  // Solo mostramos el formulario si no hay token y no está cargando
  if (!token) {
    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          margin: "100px auto",
          textAlign: "center",
          padding: "20px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Iniciar Sesión
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Usuario"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin} sx={{ mt: 2 }}>
          Ingresar
        </Button>
      </Box>
    );
  }

  return null;
}
