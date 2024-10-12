import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import { getCurrentInstance } from 'vue';

export function useCreateCategorySchema() {
  const instance = getCurrentInstance()?.proxy?.$t;
  return toTypedSchema(
    yup.object({
      name: yup.string().required(instance!('is required')),
    })
  );
}
export const categoryColumns: string[] = ['id', 'name', 'action'];
