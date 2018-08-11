import { Injectable } from '@angular/core';
import {
  Http,
  Headers,
  RequestOptionsArgs,
  Response,
  HttpModule
} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import { environment } from '../environments/environment';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Temporarily using Http instead of AuthHttp as class. leaving authHttp as prop name for easy swapping
  constructor(private authHttp: Http, private auth: AuthService) { }

  mergeOptions(options?: RequestOptionsArgs | any): RequestOptionsArgs {
    let defaultHeaders = new Headers();
    if (!options) {
      options = {};
    } else if (options.headers !== undefined || options.headers !== null) {
      defaultHeaders = options.headers;
    }
    const mockToken = environment.mockToken;
    const jwtToken = this.auth.getAuthToken();
    if (mockToken && mockToken !== '') {
      defaultHeaders.append('Authorization', 'Token ' + mockToken);
    } else if (jwtToken) {
      defaultHeaders.append('Authorization', 'JWT ' + jwtToken);
    }
    return {
      headers: defaultHeaders,
      ...options
    };
  }

  handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;

      // handle unauthorized requests. most likely by removing token and logging user out.
      if (error.status === 401 || error.status === 403) {
        this.auth.deleteToken();

        // only redirect if the 403 was not from getting the JWT
        const isAuthFailure = (error.url.indexOf('jwt-exchange') >= 0);
        console.log('is auth failure: ', isAuthFailure);
        if (!isAuthFailure) {
          this.auth.redirectToLoginUrl();
        }
      }

    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.log('API Error: ', errMsg);
    return Observable.of({ error });
  }

  get(path: string, options?: RequestOptionsArgs): Observable<Response | any> {
    return this.authHttp.get(environment.apiUrl + path, this.mergeOptions(options))
      .map((result) => {
        if (result.status === 200) {
          return result.json();
        } else {
          return result;
        }
      })
      .catch(this.handleError.bind(this));
  }

  post(path: string, body: any, options?: RequestOptionsArgs): Observable<Response | any> {
    return this.authHttp.post(environment.apiUrl + path, body, this.mergeOptions(options))
      .map((result) => {
        if (result.status === 200) {
          return result.json();
        } else {
          return result;
        }
      })
      .catch(this.handleError.bind(this));
  }

  put(path: string, body: any, options?: RequestOptionsArgs): Observable<Response | any> {
    return this.authHttp.put(environment.apiUrl + path, body, this.mergeOptions(options))
      .map((result) => {
        if (result.status === 200) {
          return result.json();
        } else {
          return result;
        }
      })
      .catch(this.handleError.bind(this));
  }

  delete(path: string, options?: RequestOptionsArgs): Observable<Response | any> {
    return this.authHttp.delete(environment.apiUrl + path, this.mergeOptions(options))
      .catch(this.handleError.bind(this));
  }

  getAuthToken(ssoCode) {
    return this.post('/jwt-exchange/', {
      code: ssoCode
    });
  }

}
