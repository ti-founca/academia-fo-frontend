import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import componentConfig from './component.config';
import { SesionStore } from '@core/auth/sesion.store';

@Component({
  selector: 'acadfo-login',
  templateUrl: './login.html',
  styleUrl: './login.less',
  imports: componentConfig.imports,
  providers: componentConfig.providers,
})
export class Login {
  private readonly sesion = inject(SesionStore);
  private readonly router = inject(Router);
  private readonly aroute = inject(ActivatedRoute);

  readonly form = new FormGroup({
    correo: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    clave: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });
  readonly enviando = signal(false);
  readonly error = signal<string | null>(null);
  readonly claveVisible = signal(false);

  ingresar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Object.values(this.form.controls).forEach((c) => c.updateValueAndValidity());
      return;
    }
    const { correo, clave } = this.form.getRawValue();
    this.enviando.set(true);
    this.error.set(null);
    this.sesion
      .iniciarSesion(correo, clave)
      .pipe(finalize(() => this.enviando.set(false)))
      .subscribe({
        next: () => this.router.navigateByUrl(this.destino()),
        error: (err: HttpErrorResponse) => this.error.set(this.mensajeError(err)),
      });
  }

  // Solo se aceptan rutas internas para evitar redirecciones abiertas
  private destino(): string {
    const url = this.aroute.snapshot.queryParamMap.get('returnUrl');
    return url && url.startsWith('/') && !url.startsWith('//') ? url : '/welcome';
  }

  private mensajeError(err: HttpErrorResponse): string {
    if (err.status === 401) return 'Correo o clave incorrectos.';
    if (err.status === 0) return 'No se pudo conectar con el servidor.';
    return 'Ocurrió un error al iniciar sesión. Intente nuevamente.';
  }
}
