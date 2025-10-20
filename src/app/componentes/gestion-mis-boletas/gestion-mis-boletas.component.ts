import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { ClienteService } from '../../servicios/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { BoletaDTO } from '../../dto/boleta/boleta-dto';
import { MensajeDTO } from '../../dto/mensaje-dto';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-boletas',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './gestion-mis-boletas.component.html',
  styleUrls: ['./gestion-mis-boletas.component.css']
})
export class BoletaComponent implements OnInit {
  boletas: BoletaDTO[] = []; // Lista de boletas
  detalleBoleta: BoletaDTO | null = null; // Detalle de una boleta específica
  mensaje: string = ''; // Mensaje de respuesta
  boleta: MensajeDTO[] = [];
  nombreOId: string = ''; // Agregamos la propiedad 'nombreOId' para enlazar con el formulario de búsqueda
  boletasPendientes!: BoletaDTO[];
  boletasEnviadas!: BoletaDTO[];
  idBoleta!: string;
  idPropietario!: string;
  idCuenta!: any;


  //Tranferecia boleta
  nombreDestinatario: string = '';
  correoDestinatario: string = '';
  confirmarCorreoDestinatario: string = '';
  idBoletaSeleccionada: string = '';
  mostrarFormularioTransferencia: boolean = false;

  constructor(private ClienteService: ClienteService, private route: ActivatedRoute,private tokenService: TokenService) {}


  //Tranferecia boleta
  mostrarTransferirBoleta(idBoleta: string): void {
    this.idBoletaSeleccionada = idBoleta;
    this.mostrarFormularioTransferencia = true;
  }

  cancelarTransferencia(): void {
    this.mostrarFormularioTransferencia = false;
    this.nombreDestinatario = '';
    this.correoDestinatario = '';
    this.confirmarCorreoDestinatario = '';
  }

  transferirBoletaConfirm(): void {
    if (this.correoDestinatario != this.confirmarCorreoDestinatario) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Los correos electrónicos no coinciden. Por favor, verifica.'
      });


      return;
    }

//BUSCAR CON EL CORREO EL ID DEL DESTINATARIO

    this.ClienteService.transferirBoleta(this.idBoletaSeleccionada, this.idCuenta, this.correoDestinatario)
      .subscribe({
        next: (respuesta:MensajeDTO) => {
          Swal.fire({
            icon: 'success',
            title: 'Transferencia exitosa',
            text: 'La boleta ha sido transferida correctamente. '
          });
          console.log(respuesta.respuesta);
        

          this.cancelarTransferencia();
          this.refrescarBoletas();
        },
        error: (error) => {
          console.log('Error',error);
         /* Swal.fire({
            icon: 'error',
            title: 'Error al transferir',
            text: 'No se pudo realizar la transferencia. Intenta nuevamente.'
          });*/
        }
      });
  }
  ngOnInit(): void {
    this.idCuenta = this.tokenService.getIDCuenta();
    const idPropietario = 'ID_DEL_PROPIETARIO';  // Obtén el ID del propietario de la sesión o de algún otro lugar
    this.ClienteService.listarBoletasPorPropietario(this.idCuenta)
      .subscribe((data: MensajeDTO[]) => {
        this.boletas = data;
      }, (error) => {
        console.error('Error al cargar las boletas:', error);
      });
  
    //this.obtenerBoletas();
  }

   // Método para refrescar la lista de boletas del propietario
   refrescarBoletas(): void {
    this.ClienteService.listarBoletasPorPropietario(this.idCuenta)
    .subscribe((data: MensajeDTO[]) => {
      this.boletas = data;
    }, (error) => {
      console.error('Error al cargar las boletas:', error);
    });

  // Llama al método con el ID del propietario
  }


  buscarBoletasPorNombreOIdentificacion(): void {
    if(this.nombreOId != ''){

      this.ClienteService.buscarBoletasPorNombreOIdentificacion(this.nombreOId).subscribe({
      
        next: (mensajes: MensajeDTO[]) => {
          if (mensajes && mensajes.length > 0) {
            this.boletas = mensajes.map(mensaje => ({
              idBoleta: mensaje.idBoleta || '',
              idEvento: mensaje.idEvento || '',
              idClientePropietario: mensaje.idClientePropietario || '',
              nombreEvento: mensaje.nombreEvento || '',
              fechaEvento: mensaje.fechaEvento || new Date(),
              nombreLocalidad: mensaje.nombreLocalidad || '',
              estado: mensaje.estado || 'pendiente',
              idPropietarioOriginal: mensaje.idPropietarioOriginal || ''
            }));
          } else {
            Swal.fire({
              icon: 'info',
              title: 'Sin resultados',
              text: 'No se encontraron boletas para el nombre o identificación proporcionados.'
            });
            this.boletas = []; // Limpiar la lista de boletas si no hay resultados
          }
        },
        error: (err) => {
          console.error('Error al buscar boletas:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error al buscar boletas',
            text: 'No se pudieron recuperar las boletas. Por favor, inténtalo de nuevo.'
          });
        }
      });
    }

  }
  

  // Otros métodos aquí...

    // Método para buscar boletas por ID de propietario
    buscarBoletasPorPropietario(): void {
      if (this.idPropietario) {
        this.ClienteService.listarBoletasPorPropietario(this.idPropietario).subscribe(
          (boletas: BoletaDTO[]) => {
            this.boletas = boletas; // Asigna las boletas obtenidas al array de boletas
          },
          (error) => {
            console.error('Error al buscar boletas:', error);
          }
        );
      }
    }



  // Método para listar todas las boletas de un propietario
  listarBoletasPorPropietario(idPropietario: string): void {
    this.ClienteService.listarBoletasPorPropietario(idPropietario).subscribe({
      next: (boletas) => this.boleta = boletas,
      error: (err) => {
        console.error('Error al listar boletas', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al listar boletas',
          text: 'No se pudieron recuperar las boletas del propietario. Por favor, inténtalo de nuevo.'
        });
      }
    });
  }

  // Método para obtener el detalle de una boleta específica
  obtenerDetalleBoleta(idBoleta: string, idPropietario: string): void {
    this.ClienteService.obtenerDetalleBoleta(idBoleta, idPropietario).subscribe({
      next: (boletas) => this.detalleBoleta = boletas,
      error: (err) => {
        console.error('Error al obtener detalle de la boleta', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener detalle',
          text: 'No se pudo obtener el detalle de la boleta. Por favor, inténtalo de nuevo.'
        });
      }
    });
  }

  // Método para listar boletas enviadas de un propietario
  listarBoletasEnviadas(idPropietario: string): void {
    this.ClienteService.listarBoletasEnviadas(idPropietario).subscribe({
      next: (boletas) => this.boleta = boletas,
      error: (err) => {
        console.error('Error al listar boletas enviadas', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al listar boletas enviadas',
          text: 'No se pudieron recuperar las boletas enviadas. Por favor, inténtalo de nuevo.'
        });
      }
    });
  }

  // Método para listar boletas pendientes de un propietario
  listarBoletasPendientes(idPropietario: string): void {
    this.ClienteService.listarBoletasPendientes(idPropietario).subscribe({
      next: (boletas) => this.boleta = boletas,
      error: (err) => {
        console.error('Error al listar boletas pendientes', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al listar boletas pendientes',
          text: 'No se pudieron recuperar las boletas pendientes. Por favor, inténtalo de nuevo.'
        });
      }
    });
  }

  // Método para transferir una boleta a un nuevo propietario
  transferirBoleta(idBoleta: string, idPropietario: string, idNuevoPropietario: string): void {
    this.ClienteService.transferirBoleta(idBoleta, idPropietario, idNuevoPropietario).subscribe({
      next: (mensaje: MensajeDTO) => {
        this.mensaje = this.mensaje;
        Swal.fire({
          icon: 'success',
          title: 'Boleta transferida',
          text: 'La boleta se transfirió exitosamente.'
        });
      },
      error: (err) => {
        console.error('Error al transferir la boleta', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al transferir boleta',
          text: 'No se pudo transferir la boleta. Por favor, inténtalo de nuevo.'
        });
      }
    });
  }
/////
 
  // Método para aceptar una boleta por parte de un nuevo propietario
  aceptarBoleta(idBoleta: string, idNuevoPropietario: string): void {
    this.ClienteService.aceptarBoleta(idBoleta, idNuevoPropietario).subscribe({
      next: (respuesta: MensajeDTO) => {
        console.log(respuesta.respuesta);
        this.mensaje = this.mensaje;
        Swal.fire({
          icon: 'success',
          title: 'Boleta aceptada',
          text: 'La boleta ha sido aceptada exitosamente.'
        });
      },
      error: (err) => {
        console.error('Error al aceptar la boleta', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al aceptar boleta',
          text: 'No se pudo aceptar la boleta. Por favor, inténtalo de nuevo.'
        });
      }
    });
  }
}
