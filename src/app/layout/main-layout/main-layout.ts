import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SesionStore } from '@core/auth/sesion.store';

@Component({
  selector: 'acadfo-main-layout',
  imports: [
    RouterLink,
    RouterOutlet,
    NzAvatarModule,
    NzDropDownModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.less',
})
export class MainLayout {
  readonly sesion = inject(SesionStore);
  private readonly router = inject(Router);
  isCollapsed = false;

  cerrarSesion(): void {
    this.sesion.cerrarSesion().subscribe(() => this.router.navigate(['/login']));
  }
}
