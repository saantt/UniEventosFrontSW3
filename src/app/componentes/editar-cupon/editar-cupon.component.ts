import { Component,OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import Swal from 'sweetalert2';
import { AdministradorService } from '../../servicios/administrador.service';
import { InformacionCuponDTO } from '../../dto/cupon/informacion-cupon-dto';
import { EditarCuponDTO } from '../../dto/cupon/editar-cupon-dto';


@Component({
  selector: 'app-editar-cupon',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-cupon.component.html',
  styleUrl: './editar-cupon.component.css'
})
export class EditarCuponComponent implements OnInit {
  codigoCupon!: string;
  cupon !: EditarCuponDTO ;
  crearCuponForm!: FormGroup;
  cuponEditado!: EditarCuponDTO;

  constructor( private formBuilder: FormBuilder,private adminService: AdministradorService,private route: ActivatedRoute){
    
    this.crearFormulario();
    

  }
  private crearFormulario() {
    this.crearCuponForm = this.formBuilder.group({
      id:['', [Validators.required]],
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      descuento: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      fechaVencimiento: ['', [Validators.required]],
      estado: ['', [Validators.required]],
    });
  }
  public obtenerCupon() {
   // console.log("cupon", String(this.cupon.tipo) );
    this.adminService.obtenerInformacionCupon(this.codigoCupon).subscribe({
      next: (data) => {
        // Verifica que la respuesta tenga el formato correcto antes de continuar
        if (data && data.respuesta) {
          this.cupon = data.respuesta;
  
          // Asegúrate de que la fecha esté en formato yyyy-MM-dd
          // Asegúrate de que la fecha esté en formato yyyy-MM-dd
const fechaVencimiento = this.cupon.fechaVencimiento 
? new Date(this.cupon.fechaVencimiento).toISOString().split('T')[0] 
: '';

const tipo =
this.cupon.tipo === 'MULTIPLE'
  ? 'MULTIPLE'
  : this.cupon.tipo === 'UNICO'
  ? 'UNICO'
  : '';
  const estado =
  this.cupon.estado === 'ACTIVO'
    ? 'ACTIVO'
    : this.cupon.estado === 'INACTIVO'
    ? 'INACTIVO'
    : '';

          // Llenar el formulario con los datos del cupón
          this.crearCuponForm.patchValue({
          id: this.cupon.id,
          codigo: this.cupon.codigo,
          nombre: this.cupon.nombre,
          tipo: tipo, // Convertir a string
          descuento: this.cupon.descuento,
          fechaVencimiento: fechaVencimiento,
          estado: estado, // Convertir a string
          });
        } else {
          console.error('La respuesta no tiene el formato esperado:', data);
          Swal.fire('¡Error!', 'No se pudo cargar el cupón.', 'error');
        }
      },
      error: (error) => {
        console.error('Error al obtener los datos del cupón:', error);
        Swal.fire('¡Error!', 'No se pudo cargar el cupón.', 'error');
      },
    });
  }
  

  ngOnInit(): void {
    // Obtener el parámetro 'codigo' de la URL
    this.route.paramMap.subscribe(params => {
      this.codigoCupon = params.get('id') || '';
      if (this.codigoCupon) {
        this.obtenerCupon();
        
      } else {
        console.error("Código de cupón no encontrado en la URL");
      }
      console.log('Código del cupón:', this.codigoCupon);
      // Aquí puedes llamar un servicio para cargar los detalles del cupón usando el 'codigoCupon'
    });
  }
  public editarCupon() {
    if (this.crearCuponForm.valid) {
      const cuponData = this.crearCuponForm.value;
      
      /* this.cuponEditado.id= this.cupon.id;
      this.adminService.actualizarCupon(this.cuponEditado).subscribe({
      this.cuponEditado = cuponData;*/
      this.adminService.actualizarCupon(cuponData).subscribe({
        next: (data: { respuesta: any }) => {
          Swal.fire('¡Éxito!', 'Se ha creado un nuevo cupón.', 'success');
          this.crearCuponForm.reset(); // Limpiar el formulario tras crear el cupón
        },
        error: (error: { error: { respuesta: object | undefined } }) => {
          Swal.fire('¡Error!', String(error.error.respuesta), 'error');
        },
      });
    } else {
      Swal.fire('¡Error!', 'Por favor, complete todos los campos requeridos.', 'error');
    }
  }
}
