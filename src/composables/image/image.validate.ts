import { getCurrentInstance } from 'vue';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';

export const uploadImageSchema = () => {
  const instance = getCurrentInstance();
  return toTypedSchema(
    yup.object({
      image: yup.mixed().required(instance?.proxy?.$t('is required')),
      alt: yup.string().required(instance?.proxy?.$t('is required')),
    })
  );
};
