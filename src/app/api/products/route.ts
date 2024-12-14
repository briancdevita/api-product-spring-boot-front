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

// Delete: Eliminar producto
export async function DELETE(req: Request) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get("id");
        
        if (!id) {
            return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });
        }

        const response = await axiosInstance.delete(`/product/${id}`);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        return NextResponse.json({ error: "No se pudo eliminar el producto" }, { status: 500 });
    }
}

// Put: Actualizar producto
export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { id, ...updateData } = body;
        
        if (!id) {
            return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });
        }

        const response = await axiosInstance.put(`/product/${id}`, {
            ...updateData,
            category: { id: updateData.categoryId }
        });
        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        return NextResponse.json({ error: "No se pudo actualizar el producto" }, { status: 500 });
    }
}