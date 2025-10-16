import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { throwError, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

import { ContactsListPage } from './contacts-list.page';
import { ContactsService } from './contacts.service';
import { Contact } from './contacts.types';

describe('ContactsListPage', () => {
  const mockContacts: Contact[] = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'sincere@april.biz',
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: { lat: -37.3159, lng: 81.1496 },
      },
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets',
      },
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'shanna@melissa.tv',
      phone: '010-692-6593 x09125',
      website: 'anastasia.net',
      address: {
        street: 'Victor Plains',
        suite: 'Suite 879',
        city: 'Wisokyburgh',
        zipcode: '90566-7771',
        geo: { lat: -43.9509, lng: -34.4618 },
      },
      company: {
        name: 'Deckow-Crist',
        catchPhrase: 'Proactive didactic contingency',
        bs: 'synergize scalable supply-chains',
      },
    },
  ];

  let fixture: ComponentFixture<ContactsListPage>;
  let component: ContactsListPage;
  let contactsServiceSpy: jasmine.SpyObj<ContactsService>;

  const setup = (observableFactory: () => ReturnType<ContactsService['getContacts']>) => {
    contactsServiceSpy = jasmine.createSpyObj<ContactsService>('ContactsService', ['getContacts']);
    contactsServiceSpy.getContacts.and.callFake(observableFactory);

    TestBed.configureTestingModule({
      imports: [ContactsListPage],
      providers: [{ provide: ContactsService, useValue: contactsServiceSpy }],
    });

    fixture = TestBed.createComponent(ContactsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('ha de carregar els contactes i filtrar pel terme de cerca', fakeAsync(() => {
    setup(() => timer(1000).pipe(mapTo(mockContacts)));

    // Abans que arribi la resposta continua en estat de càrrega
    expect(component.isLoading()).toBeTrue();
    expect(component.filteredContacts().length).toBe(0);

    tick(1000);
    fixture.detectChanges();

    expect(component.isLoading()).toBeFalse();
    expect(component.filteredContacts().length).toBe(2);

    component.searchTerm.set('bret');
    expect(component.filteredContacts().length).toBe(1);
    expect(component.filteredContacts()[0].username).toBe('Bret');

    component.searchTerm.set('no-match');
    expect(component.filteredContacts().length).toBe(0);

    expect(contactsServiceSpy.getContacts).toHaveBeenCalledTimes(1);
  }));

  it('ha de mostrar l’error quan la càrrega falla', fakeAsync(() => {
    setup(() =>
      throwError(() => new Error('Network error')),
    );

    tick();
    fixture.detectChanges();

    expect(component.errorMessage()).toBe(`No s'han pogut carregar els contactes.`);
    expect(component.isLoading()).toBeFalse();
    expect(component.filteredContacts().length).toBe(0);
  }));
});
