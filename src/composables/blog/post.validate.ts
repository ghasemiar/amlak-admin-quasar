import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import { getCurrentInstance } from 'vue';

export const createPostSchema = () => {
  const instance = getCurrentInstance();
  return toTypedSchema(
    yup.object({
      tags: yup
        .array()
        .of(
          yup.object().shape({
            id: yup.number().required(instance?.proxy?.$t('is required')), // 'id' is optional
            name: yup.string().required(instance?.proxy?.$t('is required')), // 'name' is optional
          })
        )
        .min(1, instance?.proxy?.$t('is required')),
      title: yup.string().required(instance?.proxy?.$t('is required')),
      content: yup.string().required(instance?.proxy?.$t('is required')),
      description: yup.string().nullable(),
      excerpt: yup.string().nullable(),
      keywords: yup.array().of(yup.string().nullable()),
      related_post: yup.array().of(yup.number()).nullable(),
      categories: yup
        .array()
        .of(
          yup.object().shape({
            id: yup.number().required(instance?.proxy?.$t('is required')), // 'id' is optional
            name: yup.string().required(instance?.proxy?.$t('is required')), // 'name' is optional
          })
        )
        .min(1, instance?.proxy?.$t('is required')),
      slug: yup.string().required(instance?.proxy?.$t('is required')),
    })
  );
};
export const postColumns: string[] = [
  'id',
  'tags_show',
  'title',
  'categories_show',
  'isPublish',
  'action',
];
