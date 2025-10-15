import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';  // |'HEAD' | 'JSONP' | 'OPTIONS';

export interface ApiRequestOptions {
  body?: any;
  headers?: HttpHeaders | { [header: string]: string | string[] };
  observe?: 'body' | 'response' | 'events';
  params?: HttpParams | { [param: string]: string | string[] };
  reportProgress?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  withCredentials?: boolean;

  /** Referencia al subject que se utiliza para transmitir la respuesta al finalizar la consulta. */
  subject?: Subject<any> | BehaviorSubject<any>;
}