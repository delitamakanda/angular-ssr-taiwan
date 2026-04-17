import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactForm, ContactResponse } from '../models/contact.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactApi {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/contacts';

  sendContact(payload: ContactForm): Observable<ContactResponse> {
    const body: ContactForm = {
      ...payload,
      timestamp: Date.now(),
    }
    return this.http.post<ContactResponse>(this.apiUrl, body);
  }
}
