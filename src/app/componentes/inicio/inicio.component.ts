import { Component, OnInit } from '@angular/core';
import { PublicoService } from '../../servicios/publico.service';
import { RouterModule } from '@angular/router';

import Swal from 'sweetalert2';

import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { TokenService } from '../../servicios/token.service';

import { ClienteService } from '../../servicios/cliente.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {


  ciudades: string[] = [];

  selectedCiudad: string = '';
  selectedFecha: string = '';
  selectedEvento: string = '';
  idCuenta!: any;


  

  filtrarPorPreferencia: boolean = false; // Nueva propiedad para el checkbox

  //preferenciasUsuario!: TipoEventoDTO[] ;
  preferenciasUsuario: string[] = [];

  // Lista de tipos de evento
  tiposEvento = ["DEPORTE", "CONCIERTO", "CULTURAL", "MODA", "BELLEZA"];
  // Estado de la ventana emergente
  mostrarVentanaPreferencias = false;

   // Abrir y cerrar la ventana de preferencias
   abrirVentanaPreferencias(): void {
    this.mostrarVentanaPreferencias = true;
  }

  cerrarVentanaPreferencias(): void {
    this.mostrarVentanaPreferencias = false;
  }
    // Seleccionar o deseleccionar un tipo de evento
    toggleSeleccion(tipo: string): void {
      const index = this.preferenciasUsuario.findIndex(preferencia => preferencia === tipo);
      if (index >= 0) {
        this.preferenciasUsuario.splice(index, 1); // Deseleccionar
      } else {
        this.preferenciasUsuario.push(tipo); // Seleccionar
      }
    }
  
    // Verificar si un tipo está seleccionado
    estaSeleccionado(tipo: string): boolean {
      return this.preferenciasUsuario.includes(tipo);
    }
  
    // Guardar las preferencias seleccionadas
    guardarPreferencias(): void {
      //this.preferenciasUsuario = this.preferenciasUsuario.map(tipo => ({ tipoEvento: tipo }));
      this.mostrarVentanaPreferencias = false;
      this.clienteService.agregarPreferenciasUsuario(this.idCuenta, this.preferenciasUsuario).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.error(error);
        },
      });
      console.log("Preferencias guardadas:", this.preferenciasUsuario);
    }




  constructor(private publicoService: PublicoService,private tokenService: TokenService, private clienteService:ClienteService) {
    this.ciudades = [];
    
 }

 ngOnInit(): void { 
  
  this.idCuenta = this.tokenService.getIDCuenta();
  

}
}



