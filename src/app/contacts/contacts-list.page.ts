import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, signal } from '@angular/core';
import { IonContent, IonHeader, IonSearchbar, IonSpinner, IonText, IonTitle, IonToolbar, IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';

import { ContactsService } from './contacts.service';
import { Contact } from './contacts.types';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.page.html',
  styleUrls: ['./contacts-list.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonSearchbar, IonSpinner, IonText, IonTitle, IonToolbar, IonCol, IonGrid, IonRow
  ],
})
export class ContactsListPage implements OnInit {

  private readonly contactsSignal = signal<Contact[]>([]);

  readonly searchTerm = signal<string>('');

  readonly isLoading = signal<boolean>(true);

  readonly errorMessage = signal<string | null>(null);

  readonly filteredContacts = computed(() => {
    const search = this.searchTerm().toLowerCase().trim();
    if (!search) {
      return this.contactsSignal();
    }
    return this.contactsSignal().filter(contact => {
      const values = [contact.name, contact.username, contact.email, contact.phone];
      return values.some(value => value.toLowerCase().includes(search));
    });
  });

  constructor(private readonly contactsService: ContactsService) {}

  ngOnInit(): void {
    this.contactsService.getContacts().subscribe({
      next: users => this.contactsSignal.set(this.mapContacts(users)),
      error: () => {
        this.errorMessage.set(`No s'han pogut carregar els contactes.`);
        this.isLoading.set(false);
      },
      complete: () => this.isLoading.set(false),
    });
  }

  private mapContacts(users: Contact[]) {
    users.forEach(u => u.initials = u.name.split(' ').slice(0, 2).map(w => w.charAt(0).toUpperCase()).join(''));
    return users;
  }

  onSearchChange(ev: any): void {
    this.searchTerm.set(ev.detail.value ?? '');
  }
}
