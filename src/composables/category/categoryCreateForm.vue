<template>
  <div class="tw-m-10">
    <q-form @submit="onSubmit" class="tw-grid tw-gap-5">
      <q-input
        v-model="name"
        :label="$t('name')"
        :disable="loading"
        :error="!!nameError"
        :error-message="nameError"
      />
      <q-btn type="submit" :label="$t('submit')" color="teal" />
    </q-form>
  </div>
</template>
<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { useCreateCategorySchema } from 'src/composables/category/category.validate';
import { useCreateCategory } from 'src/composables/category/useCategory';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const { handleSubmit, errors, defineField } = useForm({
  validationSchema: useCreateCategorySchema(),
});
const { request, loading } = useCreateCategory();
const { value: name, errorMessage: nameError } = useField<string>('name');
const onSubmit = handleSubmit(async (values) => {
  request(values);
});
</script>
