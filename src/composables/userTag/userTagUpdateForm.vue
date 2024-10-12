<template>
  <div class="tw-m-10">
    <q-form @submit="onSubmit" class="tw-grid tw-gap-5">
      <q-input
        v-model="name"
        :label="$t('name')"
        filled
        :error="!!nameError"
        :error-message="nameError"
        :disable="currentDataLoading"
      />
      <q-btn
        type="submit"
        :label="$t('submit')"
        :disable="loading"
        color="teal"
      />
    </q-form>
  </div>
</template>
<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { onMounted, watch } from 'vue';
import {
  useUpdateUserTag,
  useUserTag,
} from 'src/composables/userTag/useUserTag';
import { useCreateUserTagSchema } from 'src/composables/userTag/userTag.validate';

const { handleSubmit, setFieldValue } = useForm({
  validationSchema: useCreateUserTagSchema(),
  initialValues: {
    name: '',
  },
});
const {
  request: fetchCurrentData,
  loading: currentDataLoading,
  data,
} = useUserTag();
onMounted(() => {
  fetchCurrentData();
});
watch(data, (newValue) => {
  if (newValue && Object.keys(newValue).length) {
    setFieldValue('name', newValue.name);
  }
});
const { request, loading } = useUpdateUserTag();
const { value: name, errorMessage: nameError } = useField<string>('name');
const onSubmit = handleSubmit(async (values) => {
  request(values);
});
</script>
