import { environment } from '../../../environments/environment';

// URL base del backend. El interceptor de autenticación solo adjunta el token a peticiones que
// comienzan con esta URL, para no filtrarlo a servicios de terceros
export const API_BASE_URL = environment.apiUrl;
