import { Injectable, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpRequest, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, timer, from } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { ApiRequestOptions, HttpMethod } from './api.types';


/**
 * Performs HTTP requests through `HttpClient` taking care of:
 *
 *   - Maintain a cache of request observables
 *   - Enrouting urls with the API's base url
 *   - Using static default configuration
 *   - Present and dismiss a loader
 *
 * ```typescript
 * this.api.get('user/123').subscribe(user => user);
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /** Url base. */
  static url: string;


  constructor(
    public http: HttpClient,
    // public network: NetworkPlugin,
  ) {

    ApiService.url = `https://jsonplaceholder.typicode.com/`;

    // this.network.connectionChangedSubject.subscribe(status => {
    //   this.isConnected = status.connected;
    // });
  }

  // ---------------------------------------------------------------------------------------------------
  //  Properties
  // ---------------------------------------------------------------------------------------------------

  /** Indica el estado de conexión. */
  isConnected = true;

  defaults: ApiRequestOptions = {
    // -> HttpRequestOptions properties from HttpClient
    // body: null,
    headers: new HttpHeaders({ 'Content-type': 'application/json' }),
    observe: 'body',
    params: new HttpParams(),
    // reportProgress: false,
    responseType: 'json',
    // withCredentials: true,
  };


  // ---------------------------------------------------------------------------------------------------
  //  Methods
  // ---------------------------------------------------------------------------------------------------

  get<T>(url: string, options?: ApiRequestOptions): Promise<T> {
    return this.request<T>('GET', url, options);
  }

  post<T>(url: string, body: any | null, options?: ApiRequestOptions): Promise<T> {
    return this.request<T>('POST', url, this.addBody(body, options));
  }

  put<T>(url: string, body: any | null, options?: ApiRequestOptions): Promise<T> {
    return this.request<T>('PUT', url, this.addBody(body, options));
  }

  patch<T>(url: string, body: any | null, options?: ApiRequestOptions): Promise<T> {
    return this.request<T>('PATCH', url, this.addBody(body, options));
  }

  delete<T>(url: string, options?: ApiRequestOptions): Promise<T> {
    return this.request<T>('DELETE', url, options);
  }


  // ---------------------------------------------------------------------------------------------------
  //  Request overloads
  // ---------------------------------------------------------------------------------------------------

  request<T>(method: HttpMethod, url: string, options?: ApiRequestOptions): Promise<T> {
    if (!options) { options = {}; }
    return new Promise<T>((resolve: any, reject: any) => {      
      // Definimos una nueva consulta.
      this.http.request(method, this.getUrl(url), options).pipe(
        // Mapeamos la respuesta para devolver sólo sus datos.
        map((response: any) => options.observe === 'body' && !!response && !!response.data ? response.data : response)
  
      ).subscribe({
        next: results => resolve(results),
        error: error => reject(error),
      });
    });
  }

  
  // ---------------------------------------------------------------------------------------------------
  //  Helpers
  // ---------------------------------------------------------------------------------------------------

  private getUrl(url: string): string {
    // Si no es una url relativa...
    if (url.startsWith(ApiService.url)) { return url; }
    // Comprobamos si la ruta es absoluta.
    if (url.startsWith('http')) { return url; }
    // Añadimos la ruta base a la url relativa.
    return ApiService.url + (ApiService.url.endsWith('/') || url.startsWith('/') ? '' : '/') + url;
  }

  private addBody<T>(body: T | null, options?: ApiRequestOptions): ApiRequestOptions {
    if (!options) { options = {}; }
    if (!options.body) { options.body = body; }
    return options;
  }



}






