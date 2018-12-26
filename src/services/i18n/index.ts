import { setupI18n } from "@lingui/core";
import en from '../../config/i18n/en/messages';

export const language = 'en';
export const i18n = setupI18n({
  catalogs: { en },
  locales: ['en'],
  language,
});