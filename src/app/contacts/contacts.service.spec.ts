import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ContactsService } from './contacts.service';
import { Contact } from './contacts.types';
import { environment } from 'src/environments/environment';

describe('ContactsService', () => {
  let service: ContactsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(ContactsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('ha de recuperar els contactes des de l’API', fakeAsync(() => {
    const mockContacts: Contact[] = [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
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
        initials: 'LG',
      },
    ];

    let result: Contact[] | undefined;

    service.getContacts().subscribe((contacts) => {
      result = contacts;
    });

    const req = httpTestingController.expectOne(
      `${environment.apiUrl}/users`,
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockContacts);

    // El resultat no es rep fins que expira el delay(1000)
    expect(result).toBeUndefined();
    tick(1000);

    expect(result).toEqual(mockContacts);
  }));
});
