<template>
  <div class="tw-m-10">
    <q-form @submit="onSubmit" class="tw-grid tw-gap-5">
      <q-input
        v-model="name"
        filled
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
import { useCreateUserTagSchema } from 'src/composables/userTag/userTag.validate';
import { useCreateUserTag } from 'src/composables/userTag/useUserTag';
const { handleSubmit, errors, defineField } = useForm({
  validationSchema: useCreateUserTagSchema(),
});
const { request, loading } = useCreateUserTag();
const { value: name, errorMessage: nameError } = useField<string>('name');
const onSubmit = handleSubmit(async (values) => {
  request(values);
});
</script>
