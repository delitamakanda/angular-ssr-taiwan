import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactApi } from '../../services/contact.api';
import { response } from 'express';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(ContactApi);

  readonly sending = signal<boolean>(false);
  readonly submitted = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(10) ]],
    message: ['', [Validators.required ]],
  })

  submit(): void {
    if (this.form.invalid || this.sending()) {
      this.form.markAllAsTouched();
      return;
    }

    this.sending.set(true);
    this.error.set(null);

    this.api.sendContact(this.form.getRawValue())
      .pipe(
        finalize(() => this.sending.set(false))
      )
      .subscribe({
        next: () => {
          this.submitted.set(true);
          this.form.reset();
        },
        error: (error: string) => {
          this.error.set(error);
        }
      })


  }
}
