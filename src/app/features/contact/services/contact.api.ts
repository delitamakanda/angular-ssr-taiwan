import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactForm, ContactResponse } from '../models/contact.model';
import { Observable } from 'rxjs';
import { API_CONFIG_TOKEN } from '../../../core/config/injection-token';

@Injectable({
  providedIn: 'root',
})
export class ContactApi {
  private readonly http = inject(HttpClient);
  private readonly config = inject(API_CONFIG_TOKEN);

  sendContact(payload: ContactForm): Observable<ContactResponse> {
    const body: ContactForm = {
      ...payload,
      timestamp: Date.now(),
    };
    return this.http.post<ContactResponse>(this.config.wordpressApiBaseUrl, body);
  }
}
