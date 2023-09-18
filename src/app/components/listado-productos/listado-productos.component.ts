import { Component } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';
import { Categoria } from 'src/app/interfaces/categoria';
import { ProductoService } from 'src/app/services/producto.service';
import { AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.css']
})
//export class ListadoProductosComponent {
export class ListadoProductosComponent implements OnInit, AfterViewInit {
  //title = 'Tour of Heroes';
  //displayedColumns: string[] = ['idproducto', 'idcategoria', 'nombre', 'precio_venta','stock','acciones'];
  displayedColumns: string[] = ['idproducto', 'nomCategoria', 'nombre', 'precio_venta','stock','acciones'];
  dataSource = new MatTableDataSource<Producto>();
  listProducto = new Array<Producto>();
  cate:string="";
  videogame!:Categoria;

  loading: boolean = false;//add

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /*constructor(private _liveAnnouncer: LiveAnnouncer){
  }*/
    constructor(private _snackBar: MatSnackBar, 
            private _productoService: ProductoService) { }


  ngOnInit():void {
    this.obtenerProductos();
  }

  ngAfterViewInit() {    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por pagina'
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  obtenerProductos() {
    this.loading = true;    
    this._productoService.getProductos().subscribe(data => {
      this.loading = false;   
      this.dataSource.data = data;
    })  
     
    }   

    eliminarProducto(id: number) {
      console.log("eliminarProducto-id");
      console.log(id);
      this.loading = true;  
      this._productoService.deleteProducto(id).subscribe(() => {
       this.mensajeExito();
       this.loading = false;
       this.obtenerProductos();
      });    
    }
  
    mensajeExito() {
      this._snackBar.open('El producto fue eliminado con exito','', {
        duration: 4000,
        horizontalPosition: 'right',
      });
    }
}
