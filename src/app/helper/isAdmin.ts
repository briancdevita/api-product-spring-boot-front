export const isAdmin = (user: { role: string } | null): boolean => {
    return user?.role === "ROLE_ADMIN";
  };