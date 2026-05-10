import { API } from './config';
import { TokenStorage } from './storage';

class SecureApi {
  constructor() {
    this.retryCount = 0;
    this.maxRetries = 1;
  }

  async request(endpoint, options = {}) {
    const url = `${API.base}${endpoint}`;
    const headers = this.buildHeaders(options.headers);
    
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), API.timeout);

    try {
      let response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (response.status === 401 && this.retryCount < this.maxRetries) {
        this.retryCount++;
        const refreshed = await this.refreshToken();
        if (refreshed) {
          headers['Authorization'] = `Bearer ${TokenStorage.getAccess()}`;
          response = await fetch(url, { ...options, headers, signal: controller.signal });
        }
      }

      this.retryCount = 0;
      return await this.handleResponse(response);
    } catch (error) {
      clearTimeout(timeout);
      this.retryCount = 0;
      throw this.sanitizeError(error);
    }
  }

  buildHeaders(customHeaders = {}) {
    const headers = {
      'Content-Type': 'application/json',
      'X-Client-Version': '1.0.0',
      'X-Request-ID': crypto.randomUUID?.() || Date.now().toString(36),
      ...customHeaders
    };

    const token = TokenStorage.getAccess();
    if (token) headers['Authorization'] = `Bearer ${token}`;

    return headers;
  }

  async refreshToken() {
    try {
      const refresh = TokenStorage.getRefresh();
      if (!refresh) return false;

      const response = await fetch(`${API.base}${API.endpoints.refresh}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh })
      });

      if (response.ok) {
        const { access } = await response.json();
        TokenStorage.setTokens(access, refresh);
        return true;
      }
      
      TokenStorage.clear();
      return false;
    } catch {
      TokenStorage.clear();
      return false;
    }
  }

  async handleResponse(response) {
    if (response.status === 204) return null;

    const contentType = response.headers.get('content-type');
    let data = contentType?.includes('application/json') 
      ? await response.json() 
      : await response.text();

    if (!response.ok) {
      throw this.createError(response.status, data);
    }

    return data;
  }

  createError(status, data) {
    const message = data?.detail || data?.non_field_errors?.[0] || 'Une erreur est survenue';
    const error = new Error(message);
    error.status = status;
    error.data = data;
    return error;
  }

  sanitizeError(error) {
    if (error.name === 'AbortError') {
      return new Error('La requête a expiré. Veuillez réessayer.');
    }
    if (!error.status) {
      return new Error('Erreur de connexion. Vérifiez votre réseau.');
    }
    return error;
  }

  get(endpoint, params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`${endpoint}${query ? '?' + query : ''}`);
  }

  post(endpoint, body) {
    return this.request(endpoint, { method: 'POST', body: JSON.stringify(body) });
  }

  patch(endpoint, body) {
    return this.request(endpoint, { method: 'PATCH', body: JSON.stringify(body) });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

export const api = new SecureApi();
