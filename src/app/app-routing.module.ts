import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { ListadoProductosComponent } from './components/listado-productos/listado-productos.component';
import { VerProductoComponent } from './components/ver-producto/ver-producto.component';
import { AgregarEditarProductoComponent } from './components/agregar-editar-producto/agregar-editar-producto.component';


const routes: Routes = [
  { path: '', redirectTo: 'listProductos', pathMatch: 'full' },
  { path:'listProductos', component: ListadoProductosComponent },
  { path:'verProducto/:id', component: VerProductoComponent },
  { path:'agregarProducto', component: AgregarEditarProductoComponent },
  { path:'editarProducto/:id', component: AgregarEditarProductoComponent },
  { path: '**',  redirectTo: 'listProductos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
