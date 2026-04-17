export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  source?: string;
  timestamp?: number;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}
