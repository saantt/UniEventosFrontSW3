import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TokenService } from '../../servicios/token.service';
import { ClienteService } from '../../servicios/cliente.service';
import { InformacionOrdenDTO } from '../../dto/orden/informacion-orden-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial-compras',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-compras.component.html',
  styleUrl: './historial-compras.component.css'
})
export class HistorialComprasComponent {
  historialCompras!: string ;
  ordenes: InformacionOrdenDTO[] = []; // Inicializada como un arreglo vacío

  constructor (private tokenService: TokenService, private   ClienteService: ClienteService){
    this.listarHistorialOrdenesCompra();
  }

  public listarHistorialOrdenesCompra(){
      const codigoCliente = this.tokenService.getIDCuenta();
      this.ClienteService.listarHistorialCompras(codigoCliente).subscribe({
        next: (data: { respuesta: InformacionOrdenDTO[] | null | undefined }) => {
          this.ordenes = data.respuesta ?? []; // Asigna un arreglo vacío si la respuesta es null o undefined
        },
        error: (error: any) => {
          Swal.fire("Error", error.error.respuesta, "error");
        }
      });
    }
    


   
    
 
    
 }



