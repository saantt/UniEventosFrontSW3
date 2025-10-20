import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MensajeDTO } from '../dto/mensaje-dto';


import { Observable } from 'rxjs';
import{ CrearOrdenDTO } from '../dto/orden/crear-orden-dto';
import { EditarOrdenDTO } from '../dto/orden/editar-orden-dto';
import { InformacionOrdenDTO } from '../dto/orden/informacion-orden-dto';
import { DetalleCarritoDTO } from '../dto/carrito/detalleCarrito-dto';
import { TipoEventoDTO } from '../dto/tipo-evento-dto';




@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiURL = "https://proyectoavanzada-2.onrender.com/api/cliente";

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('AuthToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  constructor(private http: HttpClient) { }


  public realizarPago(idOrden: string): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(
      `${this.apiURL}/realizar-pago`,
      null, // Aquí no necesitas un cuerpo porque usas `@RequestParam` en tu backend
      {
        params: { idOrden }, // Enviamos el `idOrden` como parámetro de la URL
        headers: this.getAuthHeaders()
      }
    );
  }
  

  // Métodos de Carrito en el servicio frontend

  public agregarPreferenciasUsuario(idUsuario: string, tipoPreferencias: string[]): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(
      `${this.apiURL}/agregarPreferenciasUsuario-preferencias/${idUsuario}`,
      tipoPreferencias,
      { headers: this.getAuthHeaders() }
    );
  }
  
  
   // Función para redimir el cupón
   public redimirCupon(codigo: string): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.apiURL}/redimir-cupon/${codigo}`, null, { headers: this.getAuthHeaders() });
  }
  public obtenerInformacionCupon(id: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiURL}/obtener-informacion-cupon/${id}`, { headers: this.getAuthHeaders() });
  }
// Agregar item al carrito
public agregarItemCarrito(id: string, item: DetalleCarritoDTO): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.apiURL}/agregarItem-carrito/${id}`, item, { headers: this.getAuthHeaders() });
}

public agregarItemCarritoUnico(id: string, item: DetalleCarritoDTO): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.apiURL}/agregarItem-carrito-unico/${id}`, item, { headers: this.getAuthHeaders() });
}

// Editar item en el carrito
public editarItemCarrito(id: string, item: DetalleCarritoDTO): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.apiURL}/editarItem-carrito/${id}`, item, { headers: this.getAuthHeaders() });
}

// Eliminar item del carrito
public eliminarItemCarrito(id: string, idDetalleCarrito:  string): Observable<MensajeDTO> {
  return this.http.put<MensajeDTO>(`${this.apiURL}/eliminarItem-carrito/${id}/${idDetalleCarrito}`, { headers: this.getAuthHeaders() });
}

// Obtener carrito
public traerCarritoCliente(id: string): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.apiURL}/traerCarrito-carrito/${id}`, { headers: this.getAuthHeaders() });
}
public traerCarritoId(id: string): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.apiURL}/traerCarrito-carritoId/${id}`, { headers: this.getAuthHeaders() });
}

  // Métodos para Orden

// Crear Orden
public crearOrden(orden: CrearOrdenDTO): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.apiURL}/crear-orden`, orden, { headers: this.getAuthHeaders() });
}

// Actualizar Orden
public actualizarOrden(orden: EditarOrdenDTO): Observable<MensajeDTO> {
  return this.http.put<MensajeDTO>(`${this.apiURL}/actualizar-orden`, orden, { headers: this.getAuthHeaders() });
}

// Eliminar Orden
public eliminarOrden(id: string): Observable<MensajeDTO> {
  return this.http.delete<MensajeDTO>(`${this.apiURL}/eliminar-orden/${id}`, { headers: this.getAuthHeaders() });
}

// Obtener Información de Orden
public obtenerInformacionOrden(id: string): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.apiURL}/obtener-informacion-orden/${id}`, { headers: this.getAuthHeaders() });
}

// Buscar Ordenes por Cliente
public buscarOrdenesPorCliente(id: string): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.apiURL}/obtener-ordenes-cliente-orden/${id}`, { headers: this.getAuthHeaders() });
}

// Buscar Ordenes por Rango de Fechas
public buscarOrdenesPorRangoDeFechas(d1: string, d2: string): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.apiURL}/obtener-ordenes-rango-fecha-orden/${d1}/${d2}`, { headers: this.getAuthHeaders() });
}

// Listar Todas las Ordenes
public listarTodasLasOrdenes(): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.apiURL}/obtener-ordenes-orden`, { headers: this.getAuthHeaders() });
}
// Buscar boletas por nombre o identificación
buscarBoletasPorNombreOIdentificacion(nombreOId: string): Observable<MensajeDTO[]> {
  return this.http.get<MensajeDTO[]>(`${this.apiURL}/buscar-boletas-nombreEvento`, { params: { nombre: nombreOId } });
}
/**buscarBoletasPorNombreOIdentificacion(nombreOId: string): Observable<MensajeDTO[]> {
  return this.http.get<MensajeDTO[]>(`${this.apiURL}/buscar-boleta`, { params: { nombre: nombreOId } });
} */

// Listar todas las boletas de un propietario específico
listarBoletasPorPropietario(idPropietario: string): Observable<MensajeDTO[]> {
  return this.http.get<MensajeDTO[]>(`${this.apiURL}/listarBoletasPropietario-boleta/${idPropietario}`);
}

// Obtener el detalle de una boleta específica
obtenerDetalleBoleta(idBoleta: string, idPropietario: string): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.apiURL}/detalle-boleta/${idBoleta}/${idPropietario}`);
}

// Listar boletas enviadas de un propietario
listarBoletasEnviadas(idPropietario: string): Observable<MensajeDTO[]> {
  return this.http.get<MensajeDTO[]>(`${this.apiURL}/listarBoletasEnviadas-boleta/${idPropietario}/envios/enviados`);
}

// Listar boletas pendientes de un propietario
listarBoletasPendientes(idPropietario: string): Observable<MensajeDTO[]> {
  return this.http.get<MensajeDTO[]>(`${this.apiURL}/listarBoletasPendientes-boleta/${idPropietario}`);
}

// Transferir una boleta a un nuevo propietario
transferirBoleta(idBoleta: string, idPropietario: string, idNuevoPropietario: string): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.apiURL}/transferir-boleta/${idBoleta}/${idPropietario}/${idNuevoPropietario}`, null);
}

// Aceptar una boleta por parte de un nuevo propietario
aceptarBoleta(idBoleta: string, idNuevoPropietario: string): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.apiURL}/aceptar-boleta/${idBoleta}/${idNuevoPropietario}`, null);
}

public listarHistorialCompras(id: string): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.apiURL}/obtenerHistorialOrdenes/${id}`);
}

}
