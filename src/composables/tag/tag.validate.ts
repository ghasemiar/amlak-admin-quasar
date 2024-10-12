import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import { getCurrentInstance } from 'vue';

export function useCreateTagSchema() {
  const instance = getCurrentInstance()?.proxy?.$t;
  return toTypedSchema(
    yup.object({
      name: yup.string().required(instance!('is required')),
    })
  );
}
export const tagColumns: string[] = ['id', 'name', 'action'];
