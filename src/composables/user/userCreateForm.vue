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
      <q-input
        v-model="username"
        :label="$t('username')"
        :disable="loading"
        :error="!!usernameError"
        :error-message="usernameError"
      />
      <q-input
        v-model="password"
        :label="$t('password')"
        :disable="loading"
        :error="!!passwordError"
        :error-message="passwordError"
      />
      <q-input
        v-model="phone"
        :label="$t('phone')"
        :disable="loading"
        :error="!!phoneError"
        :error-message="phoneError"
      />
      <q-input
        v-model="email"
        :label="$t('email')"
        :disable="loading"
        :error="!!emailError"
        :error-message="emailError"
      />
      <q-select
        v-model="role"
        :label="$t('role')"
        :options="userRoleOption"
        emit-value
        :disable="loading"
        :error="!!roleError"
        :error-message="roleError"
      />
      <q-select
        v-model="userTag"
        :loading="userTagLoading"
        :options="userTagData"
        emit-value
        multiple
        use-chips
        option-label="name"
        option-value="id"
        :label="$t('userTag')"
        :disable="loading"
        :error="!!userTagError"
        :error-message="userTagError"
      />
      <q-btn type="submit" :label="$t('submit')" color="teal" />
    </q-form>
  </div>
</template>
<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { useCreateUserSchema } from 'src/composables/user/user.validate';
import { userRoleOption } from 'src/composables/options/user.options';
import {
  useCreateUserTag,
  useUserTagList,
} from 'src/composables/userTag/useUserTag';
import { onMounted } from 'vue';
import { useCreateUser } from 'src/composables/user/useUser';

const {
  request: userTagRequest,
  loading: userTagLoading,
  data: userTagData,
} = useUserTagList();
onMounted(() => {
  userTagRequest();
});
const { handleSubmit } = useForm({
  validationSchema: useCreateUserSchema(),
});
const { value: name, errorMessage: nameError } = useField<string>('name');
const { value: username, errorMessage: usernameError } =
  useField<string>('username');
const { value: phone, errorMessage: phoneError } = useField<string>('phone');
const { value: email, errorMessage: emailError } = useField<string>('email');
const { value: role, errorMessage: roleError } = useField<string>('role');
const { value: userTag, errorMessage: userTagError } =
  useField<string>('userTag');
const { value: password, errorMessage: passwordError } =
  useField<string>('password');
const { request, loading } = useCreateUser();
const onSubmit = handleSubmit(async (values) => {
  request(values);
});
</script>
