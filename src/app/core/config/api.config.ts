import { environment } from '../../../environments/environment';

export interface ApiConfig {
  wordpressApiBaseUrl: string;
}

export const API_CONFIG: ApiConfig = {
  wordpressApiBaseUrl: environment.wordpressApiUrl
}
