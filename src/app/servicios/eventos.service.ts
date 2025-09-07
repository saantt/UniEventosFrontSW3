import { Injectable } from '@angular/core';
import { EventoDTO } from '../dto/evento-dto';
import{PublicoService} from '../servicios/publico.service';
import { AdministradorService } from './administrador.service';
import { MensajeDTO } from '../dto/mensaje-dto';


@Injectable({
 providedIn: 'root'
})
export class EventosService {


 eventos:EventoDTO [];


 constructor(private publicoService: PublicoService, private administradorService: AdministradorService) {
   this.eventos = [];
   //this.crearEventosPrueba();
   this.crearEventosApi();
 }


 public listar(){
   return this.eventos;
 }


 public crear(crearEventoDTO:EventoDTO){
   this.eventos.push(crearEventoDTO);
 }


 public obtener(id:string):EventoDTO | undefined{
   return this.eventos.find(evento => evento.id == id);
 }


 public eliminar(id:String){
   this.eventos = this.eventos.filter(evento => evento.id != id);
 }


 public editar(id:string, editarEventoDTO:EventoDTO){
   const indice = this.eventos.findIndex(evento => evento.id == id);
   if(indice != -1){
     this.eventos[indice] = editarEventoDTO;
   }
 }
 public crearEventosApi(){
  this.publicoService.listarEventos().subscribe((mensajeDTO:MensajeDTO) => {
    // Suponiendo que mensajeDTO tiene una propiedad 'eventos' que es un array de EventoDTO
    const eventos = mensajeDTO.respuesta as EventoDTO[];
    
    eventos.forEach(evento => {
        this.eventos.push(evento);
    });
});
 }
 public crearEventosPrueba(){
  this.eventos.push({
    id:'1',
    nombre:'Evento 1',
    descripcion:'Descripcion del evento 1',
    fecha:new Date("2021-09-01 20:00:00"),
    tipo:'Concierto',
    direccion:'Calle 123',
    ciudad:'Bogota',
    localidades:[
      {
        nombre:'Localidad 1',
        precio:10000,
        capacidadMaxima:100
      },
      {
        nombre:'Localidad 2',
        precio:20000,
        capacidadMaxima:100
      }
    ],
    imagenPortada:'https://picsum.photos/100?random=1',
    imagenLocalidades:'https://picsum.photos/100',
    estado:'Activo'
  });


  this.eventos.push({
    id:'2',
    nombre:'Evento 2',
    descripcion:'Descripcion del evento 2',
    fecha:new Date(),
    tipo:'Teatro',
    direccion:'Calle 123',
    ciudad:'Bogota',
    localidades:[],
    imagenPortada:'https://picsum.photos/100?random=2',
    imagenLocalidades:'https://picsum.photos/100',
    estado:'Activo'
  });


  this.eventos.push({
    id:'3',
    nombre:'Evento 3',
    descripcion:'Descripcion del evento 3',
    fecha:new Date(),
    tipo:'Deportivo',
    direccion:'Calle 123',
    ciudad:'Bogota',
    localidades:[],
    imagenPortada:'https://picsum.photos/100?random=3',
    imagenLocalidades:'https://picsum.photos/100',
    estado:'Activo'
  });
 }


}
