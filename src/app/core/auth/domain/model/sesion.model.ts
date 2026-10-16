import { UsuarioAutenticado } from './usuario-autenticado.model';

export interface Sesion {
  accessToken: string;
  accessExpiraEn: string;
  refreshToken: string;
  refreshExpiraEn: string;
  usuario: UsuarioAutenticado;
}
