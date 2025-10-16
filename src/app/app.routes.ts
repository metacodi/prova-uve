import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'contacts',
    loadComponent: () => import('./contacts/contacts-list.page').then((m) => m.ContactsListPage),
  },
  {
    path: '',
    redirectTo: 'contacts',
    pathMatch: 'full',
  },
];
