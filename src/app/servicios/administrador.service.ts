import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/mensaje-dto';
import { Observable } from 'rxjs';
import { CrearEventoDTO } from '../dto/crear-evento-dto';
import { EditarEventoDTO } from '../dto/editar-evento-dto';
import{ CrearCuponDTO } from '../dto/cupon/crear-cupon-dto';
import { EditarCuponDTO } from '../dto/cupon/editar-cupon-dto';
import { InformacionCuponDTO } from '../dto/cupon/informacion-cupon-dto';


@Injectable({
 providedIn: 'root'
})
export class AdministradorService {


 private adminURL = "https://proyectoavanzada-2.onrender.com/api/admin";


 constructor(private http: HttpClient) { }
 private getAuthHeaders(): HttpHeaders {
  const token = sessionStorage.getItem('AuthToken');
  return new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
}

  // Métodos de Cupon
  public crearCupon(cuponDTO: CrearCuponDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.adminURL}/crear-cupon`, cuponDTO, { headers: this.getAuthHeaders() });
  }

  public actualizarCupon(cuponDTO: EditarCuponDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.adminURL}/actualizar-cupon`, cuponDTO, { headers: this.getAuthHeaders() });
  }

  public eliminarCupon(id: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.adminURL}/eliminar-cupon/${id}`, { headers: this.getAuthHeaders() });
  }

  public listarCuponesPorExpirar(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/listar-cupones-por-expirar-cupon`, { headers: this.getAuthHeaders() });
  }

  public listarCuponesActivos(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/listar-cupones-activos-cupon`, { headers: this.getAuthHeaders() });
  }

  public listarCupones(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/listar-cupones`, { headers: this.getAuthHeaders() });
  }

  public obtenerInformacionCupon(id: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/obtener-informacion-cupon/${id}`, { headers: this.getAuthHeaders() });
  }

 //public crearEvento(crearEventoDTO: CrearEventoDTO): Observable<MensajeDTO> {
 //  return this.http.post<MensajeDTO>(`${this.adminURL}/crear-evento`, crearEventoDTO);
 //}
 public crearEvento(crearEventoDTO: CrearEventoDTO): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.adminURL}/crear-evento`, crearEventoDTO, { headers: this.getAuthHeaders() });
}


 public actualizarEvento(editarEventoDTO: EditarEventoDTO): Observable<MensajeDTO> {
   return this.http.put<MensajeDTO>(`${this.adminURL}/editar-evento`, editarEventoDTO, { headers: this.getAuthHeaders() });
 }
 

 public obtenerEvento(id: string): Observable<MensajeDTO> {
   return this.http.get<MensajeDTO>(`${this.adminURL}/obtener-evento/${id}`, { headers: this.getAuthHeaders() });
 }


 public eliminarEvento(id: string): Observable<MensajeDTO> {
   return this.http.delete<MensajeDTO>(`${this.adminURL}/eliminar-evento/${id}`, { headers: this.getAuthHeaders() });
 }


 public listarEventosAdmin(): Observable<MensajeDTO> {
   return this.http.get<MensajeDTO>(`${this.adminURL}/listar-todos-eventos-admin`,  { headers: this.getAuthHeaders() });
 }

 


// public subirImagen(imagen: FormData): Observable<MensajeDTO> {
  // return this.http.post<MensajeDTO>(`${this.adminURL}/subir`, imagen);
 //}
 public subirImagen(imagen: FormData): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.adminURL}/subir`, imagen, { headers: this.getAuthHeaders() });
}
public eliminarImagen(idImagen: string): Observable<MensajeDTO> {
  return this.http.delete<MensajeDTO>(`${this.adminURL}/eliminar?idImagen=${idImagen}`, { headers: this.getAuthHeaders() });
}


}
