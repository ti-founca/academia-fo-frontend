import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { icons } from './core/icons-provider';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { es_ES, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '@core/auth/auth.interceptor';
import { AutenticacionRepository } from '@core/auth/domain/repository/autenticacion.repository';
import { AutenticacionApiService } from '@core/auth/data/autenticacion-api.service';

registerLocaleData(es);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideNzIcons([]),
    provideNzI18n(es_ES),
    { provide: LOCALE_ID, useValue: 'es_PY' },
    { provide: AutenticacionRepository, useClass: AutenticacionApiService },
  ],
};
