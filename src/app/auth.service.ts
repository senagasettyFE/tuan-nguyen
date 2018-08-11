import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getAuthToken() {
    // mocked token for now
    if (environment.mockToken !== '') {
      return environment.mockToken;
    }
    return this.getToken();
  }

  getToken() {
    return window.localStorage.getItem('authToken');
  }

  setToken(token) {
    return window.localStorage.setItem('authToken', token);
  }

  deleteToken() {
    return window.localStorage.removeItem('authToken');
  }

  getLastUrl() {
    return window.localStorage.getItem('lastUrl');
  }

  setLastUrl(url) {
    return window.localStorage.setItem('lastUrl', url);
  }

  getLoginUrl() {
    return environment.ssoLoginUrl + '?next=' +
    encodeURIComponent(environment.ssoCallbackUrl);
  }

  redirectToLoginUrl() {
    window.location.href = this.getLoginUrl();
  }

}
