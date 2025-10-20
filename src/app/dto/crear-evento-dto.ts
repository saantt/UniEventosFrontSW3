import { LocalidadDTO } from "./localidad-dto";


export interface CrearEventoDTO {


    nombre: string ,
    descripcion: String ,
    imagenLocalidades: String ,
    tipo: string ,
    fechaEvento: Date ,
    ciudad: string ,
    localidades: LocalidadDTO[] ,
    imagenImportada:string
   // direccion: string, // Añadido
    //imagenPortada: string, // Añadido para la imagen de portada
}
