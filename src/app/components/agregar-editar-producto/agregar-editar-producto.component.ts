import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { MatOptgroup } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto';
import { Categoria } from 'src/app/interfaces/categoria';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-agregar-editar-producto',
  templateUrl: './agregar-editar-producto.component.html',
  styleUrls: ['./agregar-editar-producto.component.css']
})
//export class AgregarEditarProductoComponent {
  export class AgregarEditarProductoComponent implements OnInit {
    loading: boolean = false;
    form: FormGroup;
    id: number;
    categorias?:Categoria[];

    operacion: string = 'Agregar';

    constructor(private fb: FormBuilder,
      private _productoService: ProductoService,
      private _snackBar: MatSnackBar,
      private router: Router,
      private aRoute: ActivatedRoute) {
      this.form = this.fb.group({
        nombre: ['', Validators.required],
        id: ['', Validators.required],
        precio_venta: ['', Validators.required],
        stock: ['', Validators.required],
      })
      this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
    }

    
  ngOnInit(): void {
    this.obtenerCateorias();
    if(this.id != 0) {
      this.operacion = 'Editar';      
      this.obtenerProducto(this.id)
    }
  }

  obtenerProducto(id: number) {
    this.loading = true;
    this._productoService.getProducto(id).subscribe(data => {
      this.form.setValue({
        nombre: data.nombre,
        id: data.id.idcategoria,
        precio_venta: data.precio_venta,
        stock: data.stock
      })
      this.loading = false;
    })
  }

  obtenerCateorias() {
    this.loading = true;
    this._productoService.getCategorias().subscribe(data => {
      this.loading = false;
      this.categorias=data;
    })
    
  }

  agregarEditarProducto() {
    const producto: Producto = {
      nombre: this.form.value.nombre,
      idcategoria:this.form.value.id,
      precio_venta:this.form.value.precio_venta,
      stock:this.form.value.stock,
      estado:true
    }    
    if(this.id != 0) {
      producto.idproducto = this.id;
      
      this.editarProducto(this.id, producto);
    } else {
      this.agregarProducto(producto);
    }
  }

  editarProducto(id: number, producto: Producto) {
    this.loading = true;
    this._productoService.updateProducto(id, producto).subscribe(() => {
      this.loading = false;      
      this.mensaje('actualizado');
      this.router.navigate(['/listProductos']);
    })
  }

  agregarProducto(producto: Producto) {   
      this._productoService.addProducto(producto).subscribe(data => {
        this.mensaje('registrado');
        this.router.navigate(['/listProductos']);
      })
      
  }

  mensaje(texto: string) {
    this._snackBar.open(`El producto fue ${texto} con exito`,'', {
      duration: 4000,
      horizontalPosition: 'right',
    });
  }

}
