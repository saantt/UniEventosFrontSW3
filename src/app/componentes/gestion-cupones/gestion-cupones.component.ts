import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InformacionCuponDTO } from '../../dto/cupon/informacion-cupon-dto';
import { AdministradorService } from '../../servicios/administrador.service';


import Swal from 'sweetalert2';



@Component({
  selector: 'app-gestion-cupones',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './gestion-cupones.component.html',
  styleUrl: './gestion-cupones.component.css'
})
export class GestionCuponesComponent {

  cupones!: InformacionCuponDTO[] ;

  cuponesSeleccionados: InformacionCuponDTO[] = [];
  textoBtnDesactivar: string = '';
  //private formBuilder: FormBuilder,private publicoService: PublicoService,
  constructor(private adminService: AdministradorService){
    this.listarCupones();

  }
  listarCupones(){
    this.adminService.listarCupones().subscribe({
      next: (data) => {
        this.cupones = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  

  seleccionarCupon(cupon: InformacionCuponDTO, estado: boolean) {
    if (estado) {
      this.cuponesSeleccionados.push(cupon);
    } else {
      const index = this.cuponesSeleccionados.indexOf(cupon);
      if (index !== -1) {
        this.cuponesSeleccionados.splice(index, 1);
      }
    }
    this.actualizarMensaje();
  }

  actualizarMensaje() {
    const tam = this.cuponesSeleccionados.length;
    this.textoBtnDesactivar = tam === 1 ? '1 elemento' : `${tam} elementos`;
  }

  confirmarDesactivacion() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción cambiará el estado de los cupones seleccionados a Inactivos.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, desactivar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.desactivarCupones();
        Swal.fire('Desactivados', 'Los cupones seleccionados han sido desactivados.', 'success');
      }
    });
  }

  desactivarCupones() {
   /* this.cuponesSeleccionados.forEach((cupon) => {
      //cupon.estado = 'Inactivo';
      this.adminService.eliminarCupon(cupon.id);
    });*/
    const peticiones = this.cuponesSeleccionados.map((cupon) => 
      this.adminService.eliminarCupon(cupon.id).toPromise()
    );

    Promise.all(peticiones)
    .then(() => {
      // Refrescar la lista de cupones después de desactivar los seleccionados
      this.listarCupones();
      this.cuponesSeleccionados = [];
      this.actualizarMensaje();
      Swal.fire('Desactivados', 'Los cupones seleccionados han sido desactivados.', 'success');
    })
    .catch((error) => {
      console.error('Error al desactivar cupones:', error);
      Swal.fire('Error', 'Hubo un problema al desactivar los cupones.', 'error');
    });
    //this.cuponesSeleccionados = [];
    //this.actualizarMensaje();
   
  }

  trackById(index: number, item: InformacionCuponDTO) {
    return item.codigo;
  }
}
