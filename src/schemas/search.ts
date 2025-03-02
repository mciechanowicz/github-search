import * as yup from 'yup';

import { translations } from '@/translations';

export const searchSchema = yup.object().shape({
  username: yup
    .string()
    .required(translations.userSearch.textFieldUsernameRequired)
    .min(3, translations.userSearch.textFieldUsernameMin),
});
