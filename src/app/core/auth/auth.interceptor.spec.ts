import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, Router } from '@angular/router';
import { authInterceptor } from './auth.interceptor';
import { SesionStore } from './sesion.store';
import { AutenticacionRepository } from './domain/repository/autenticacion.repository';
import { AutenticacionApiService } from './data/autenticacion-api.service';
import { Sesion } from './domain/model/sesion.model';

const STORAGE_KEY = 'academiafo.sesion';
const API = 'http://localhost:8080/api/periodos-lectivos';
const REFRESH = 'http://localhost:8080/api/auth/refresh';

function sesion(accessMs: number, sufijo = '1'): Sesion {
  return {
    accessToken: `access-${sufijo}`,
    accessExpiraEn: new Date(Date.now() + accessMs).toISOString(),
    refreshToken: `refresh-${sufijo}`,
    refreshExpiraEn: new Date(Date.now() + 7 * 24 * 3600_000).toISOString(),
    usuario: { id: 1, nombre: 'Ana', apellido: 'Pérez', correo: 'ana@test.com' },
  };
}

describe('authInterceptor', () => {
  let http: HttpClient;
  let ctrl: HttpTestingController;

  function configurar(inicial: Sesion | null) {
    localStorage.clear();
    if (inicial) localStorage.setItem(STORAGE_KEY, JSON.stringify(inicial));
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: AutenticacionRepository, useClass: AutenticacionApiService },
      ],
    });
    http = TestBed.inject(HttpClient);
    ctrl = TestBed.inject(HttpTestingController);
  }

  afterEach(() => ctrl.verify());

  it('agrega el access token vigente sin refrescar', () => {
    configurar(sesion(10 * 60_000));
    http.get(API).subscribe();
    const req = ctrl.expectOne(API);
    expect(req.request.headers.get('Authorization')).toBe('Bearer access-1');
    req.flush([]);
  });

  it('refresca una sola vez antes de enviar peticiones concurrentes si el access está por vencer', () => {
    configurar(sesion(5_000));
    http.get(API).subscribe();
    http.get(`${API}/2`).subscribe();

    const refresh = ctrl.expectOne(REFRESH);
    expect(refresh.request.body).toEqual({ refreshToken: 'refresh-1' });
    refresh.flush({ tipo: 'Bearer', ...sesion(15 * 60_000, '2') });

    expect(ctrl.expectOne(API).request.headers.get('Authorization')).toBe('Bearer access-2');
    expect(ctrl.expectOne(`${API}/2`).request.headers.get('Authorization')).toBe('Bearer access-2');
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).refreshToken).toBe('refresh-2');
  });

  it('ante un 401 refresca y reintenta una vez', () => {
    configurar(sesion(10 * 60_000));
    let respuesta: unknown;
    http.get(API).subscribe((r) => (respuesta = r));

    ctrl.expectOne(API).flush(null, { status: 401, statusText: 'Unauthorized' });
    ctrl.expectOne(REFRESH).flush({ tipo: 'Bearer', ...sesion(15 * 60_000, '2') });
    const reintento = ctrl.expectOne(API);
    expect(reintento.request.headers.get('Authorization')).toBe('Bearer access-2');
    reintento.flush(['ok']);
    expect(respuesta).toEqual(['ok']);
  });

  it('si el refresh es rechazado limpia la sesión y redirige al login', () => {
    configurar(sesion(5_000));
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    let error: unknown;
    http.get(API).subscribe({ error: (e) => (error = e) });

    ctrl.expectOne(REFRESH).flush(null, { status: 401, statusText: 'Unauthorized' });

    expect(error).toBeTruthy();
    expect(TestBed.inject(SesionStore).estaAutenticado()).toBe(false);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    expect(navigate).toHaveBeenCalledWith(['/login'], expect.anything());
  });

  it('un error de red en el refresh no cierra la sesión', () => {
    configurar(sesion(5_000));
    http.get(API).subscribe({ error: () => {} });
    ctrl.expectOne(REFRESH).error(new ProgressEvent('error'));
    expect(TestBed.inject(SesionStore).estaAutenticado()).toBe(true);
  });

  it('no intercepta las rutas de autenticación', () => {
    configurar(sesion(5_000));
    http.post(REFRESH, {}).subscribe();
    expect(ctrl.expectOne(REFRESH).request.headers.has('Authorization')).toBe(false);
  });
});
