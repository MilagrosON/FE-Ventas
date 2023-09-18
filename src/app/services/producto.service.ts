import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductoRel } from '../interfaces/productoRel';
import { Producto } from '../interfaces/producto';
import { Categoria } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private myAppUrl: string = environment.endpoint;
  private myApiProductoUrl: string = 'api/Producto/';
  private myApiCategoriaUrl: string = 'api/Categoria/';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<ProductoRel[]> {    
    return this.http.get<ProductoRel[]>(`${this.myAppUrl}${this.myApiProductoUrl}`);
  }
  getProducto(id: number): Observable<ProductoRel>{    
    return this.http.get<ProductoRel>(`${this.myAppUrl}${this.myApiProductoUrl}${id}`);
  }

  getCategorias(): Observable<Categoria[]> {    
    return this.http.get<Categoria[]>(`${this.myAppUrl}${this.myApiCategoriaUrl}`);
  }

  getCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.myAppUrl}${this.myApiCategoriaUrl}${id}`);
  }

  addProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.myAppUrl}${this.myApiProductoUrl}`, producto);
  }

  updateProducto(id: number, producto: Producto): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiProductoUrl}${id}`, producto);
  }

  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiProductoUrl}${id}`);
  }
  
}
