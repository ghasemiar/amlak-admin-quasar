import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';

export const loginSchema = (t: any) => {
  return toTypedSchema(
    yup.object({
      username: yup.string().min(4).max(10).required(t('is required')),
      password: yup.string().required(t('is required')),
    })
  );
};
