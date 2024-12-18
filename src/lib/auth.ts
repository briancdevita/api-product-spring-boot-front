import axios from "axios";

export const loginUser = async (username: string, password: string): Promise<string> => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/login",
      { username, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const token = response.data.token.replace(/^Bearer\s/, "");
    console.log(`Este token es de login: ${token}`)
    if (token) {
      localStorage.setItem("token", token);
    }

    return token;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};
