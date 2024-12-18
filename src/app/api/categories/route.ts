import { NextResponse } from "next/server";
import axiosInstance from "@/lib/axiosInstance";

// GET: Obtener todas las categorías desde el backend
export async function GET() {
  try {
    const response = await axiosInstance.get("/category/");
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return NextResponse.json({ error: "No se pudieron obtener las categorías" }, { status: 500 });
  }
}

// POST: Crear una nueva categoría
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const response = await axiosInstance.post("/categories", body);
    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    console.error("Error al crear categoría:", error);
    return NextResponse.json({ error: "No se pudo crear la categoría" }, { status: 500 });
  }
}
