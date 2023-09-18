import { Categoria } from "./categoria"

export interface ProductoRel {
    idproducto?: number,
    id:Categoria,
    nombre: string,
    precio_venta: number,
    stock: number,
    estado: boolean
}