<template>
  <div class="tw-m-10">
    <q-form @submit="onSubmit">
      <div  class="tw-grid tw-grid-cols-2 tw-gap-5"><q-input
        v-model="name"
        :label="$t('name')"
        filled
        :error="!!nameError"
        :error-message="nameError"
      />
        <q-input
          v-model="explanation"
          :label="$t('explanation')"
          filled
          :error="!!explanationError"
          :error-message="explanationError"
        /></div>

      <q-btn
        :loading="loading"
        class="tw-mx-5"
        type="submit"
        :label="$t('submit')"
        color="teal"
      />
    </q-form>
  </div>
</template>
<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import { createLocationSchema } from 'src/composables/Location/location.validate';
import { useCreateLocation } from 'src/composables/Location/useLocation';
const { handleSubmit } = useForm({
  validationSchema: createLocationSchema(),
});
const { request, loading } = useCreateLocation();
const { value: name, errorMessage: nameError } = useField<string>('name');
const { value: explanation, errorMessage: explanationError } =
  useField<string>('explanation');
const onSubmit = handleSubmit(async (values) => {
  request(values);
});
</script>
