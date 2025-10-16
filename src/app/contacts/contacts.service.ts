import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';

import { Contact } from './contacts.types';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ContactsService {

  private http = inject(HttpClient);

  constructor() {}

  getContacts() {
    const url = `${environment.apiUrl}/users`;
    return this.http.get<Contact[]>(url).pipe(delay(1000));
  }

}
