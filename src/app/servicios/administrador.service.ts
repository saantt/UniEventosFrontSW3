import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/mensaje-dto';
import { Observable } from 'rxjs';



@Injectable({
 providedIn: 'root'
})
export class AdministradorService {


 private adminURL = "http://localhost:8082/api/admin";


 constructor(private http: HttpClient) { }
 private getAuthHeaders(): HttpHeaders {
  const token = sessionStorage.getItem('AuthToken');
  return new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
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
