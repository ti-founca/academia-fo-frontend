import { Observable } from 'rxjs';
import { Sesion } from '../model/sesion.model';

export abstract class AutenticacionRepository {
  abstract iniciarSesion(correo: string, clave: string): Observable<Sesion>;
  abstract refrescar(refreshToken: string): Observable<Sesion>;
  abstract cerrarSesion(refreshToken: string): Observable<void>;
}
