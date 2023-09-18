import { Component , OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ProductoRel } from 'src/app/interfaces/productoRel';
import { ProductoService } from 'src/app/services/producto.service';


@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
//export class VerProductoComponent {
  export class VerProductoComponent implements OnInit, OnDestroy {
    id!: number;
    producto!: ProductoRel;
    loading: boolean = false;
  
    routeSub!: Subscription;
    constructor(private _productoService: ProductoService,
      private aRoute: ActivatedRoute) {
      this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
    }
  
    ngOnInit(): void {      
      this.obtenerProducto();
    }
  
    ngOnDestroy(): void {
    }
  
    obtenerProducto() {      
      this.loading = true;
      this._productoService.getProducto(this.id).subscribe(data => {       
        this.producto = data;       
        this.loading = false;
      })
    }
}
