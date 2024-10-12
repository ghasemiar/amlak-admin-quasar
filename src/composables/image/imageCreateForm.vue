<template>
  <div class="tw-m-10">
    <q-form @submit="onSubmit" class="tw-grid tw-gap-5">
      <q-file
        v-model="image"
        :label="$t('image')"
        filled
        :error="!!imageError"
        :error-message="imageError"
      >
        <q-icon name="attach_file" />
      </q-file>
      <q-input filled v-model="alt" :label="$t('alt')" :error="!!altError"
               :error-message="altError" />
      <q-btn type="submit" :label="$t('submit')" color="teal" />
    </q-form>
  </div>
</template>
<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import { useUploadImage } from 'src/composables/image/useImage';
import { uploadImageSchema } from 'src/composables/image/image.validate';
const { handleSubmit } = useForm({
  validationSchema: uploadImageSchema()
});
const { request, loading } = useUploadImage();
const { value: image, errorMessage: imageError } = useField<File>('image');
const { value: alt, errorMessage: altError } = useField<string>('alt');
const onSubmit = handleSubmit(async (values) => {
  const formData = new FormData();
  formData.append('image', values.image);
  formData.append('alt', values.alt);
  request(formData);
});
</script>
