import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// ModulosMaterial
import { SharedModule } from './Shared/shared.module';

// Componentes
import { ListadoProductosComponent } from './components/listado-productos/listado-productos.component';
import { VerProductoComponent } from './components/ver-producto/ver-producto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgregarEditarProductoComponent } from './components/agregar-editar-producto/agregar-editar-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    ListadoProductosComponent,
    VerProductoComponent,
    AgregarEditarProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
