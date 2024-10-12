import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import { getCurrentInstance } from 'vue';

export const createLocationSchema = () => {
  const instance = getCurrentInstance();
  return toTypedSchema(
    yup.object({
      name: yup.string().required(instance?.proxy?.$t('is required')),
      explanation: yup.string().required(instance?.proxy?.$t('is required')),
    })
  );
};
export const locationColumns: string[] = ['id', 'name', 'action'];
