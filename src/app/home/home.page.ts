import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/api/api.service';
import { Contact } from './contact.type';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage  {

  users: Contact[] = [];

  match: string = '';

  constructor(
    public api: ApiService
  ) {
    this.api.get<Contact[]>(`/users`).then(users => {
      this.users = users;
    });

  }

  emailTo(user: Contact) {
    
  }


}
