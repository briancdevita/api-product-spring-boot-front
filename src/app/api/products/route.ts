import { NextResponse } from "next/server";
import axiosInstance from "@/lib/axiosInstance";


//Get: Obtener todos los prodcutos

export async function GET() {
    try {
        const response = await axiosInstance.get("/products");
        return NextResponse.json(response.data)
    } catch (error) {
        console.log("Error al obtener productos", error)
        return NextResponse.json({error:"No se pudieron obtener los productos"}, {status: 500})
    }
}

//Post: Crear productos
export async function POST(req: Request) {
    try {
        const body  = await req.json()
        const response = await axiosInstance.post("/products", body)
        return NextResponse.json(response.data, {status: 201})
    } catch (error) {
        console.error("Error al crear producto:", error);
        return NextResponse.json({ error: "No se pudo crear el producto" }, { status: 500 });
    }
}