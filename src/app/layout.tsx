"use client"
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
        {children}
        </AuthProvider>
      </QueryClientProvider>
      </body>
    </html>
  );
}
