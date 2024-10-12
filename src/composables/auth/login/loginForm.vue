<template>
  <div class="tw-m-8 md:tw-m-24">
    <q-form @submit="onSubmit" class="tw-grid tw-gap-2">
      <div class="t-center tw-grid tw-my-8">
        <span class="tw-text-xl tw-font-bold tw-text-primary">
          ورود به سامانه مدیریت املاک
        </span>
      </div>
      <q-input
        v-model="username"
        outlined
        dense
        :placeholder="$t('username')"
        :error="!!usernameError"
        :error-message="usernameError"
        :disable="loading"
      />
      <q-input
        :placeholder="$t('password')"
        v-model="password"
        outlined
        dense
        :disable="loading"
        :error="!!passwordError"
        :error-message="passwordError"
        :type="isPwd ? 'password' : 'text'"
      >
        <template v-slot:append>
          <q-icon
            color="teal"
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-btn type="submit" :label="$t('login')" color="teal" />
    </q-form>
  </div>
</template>
<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { loginSchema } from 'src/composables/auth/login/login.validate';
import { useLogin } from 'src/composables/auth/login/useLogin';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
const { t } = useI18n();
const isPwd = ref(false);
const { handleSubmit, errors } = useForm({
  validationSchema: loginSchema(t),
});
const { request, loading } = useLogin();
const { value: username, errorMessage: usernameError } =
  useField<string>('username');
const { value: password, errorMessage: passwordError } =
  useField<string>('password');
const onSubmit = handleSubmit(async (values) => {
  request(values);
});
</script>
