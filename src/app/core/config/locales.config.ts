// Must stay in sync with the locales declared in angular.json (i18n.locales).
export interface SupportedLocale {
  readonly code: string;
  readonly label: string;
  readonly lang: string;
}

export const SUPPORTED_LOCALES: readonly SupportedLocale[] = [
  { code: 'en-US', label: 'English', lang: 'en' },
  { code: 'zh-TW', label: '繁體中文', lang: 'zh-TW' },
  { code: 'fr-FR', label: 'Français', lang: 'fr' },
];
