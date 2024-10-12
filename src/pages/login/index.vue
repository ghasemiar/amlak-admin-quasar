<template>
  <div class="tw-flex tw-w-full tw-h-screen tw-justify-center tw-items-center">
    <div
      class="sm:tw-grid md:tw-hidden tw-w-full sm:tw-grid-cols-1 tw-h-screen"
    >
      <div
        class="t-center tw-bg-gradient-to-r tw-from-surface-light-5 tw-to-primary tw-h-32"
      >
        <img src="~/assets/logo.png" width="64" height="64" />
      </div>
      <login-form />
    </div>

    <div class="tw-hidden md:tw-grid tw-grid-cols-2 tw-w-full tw-h-full">
      <div
        class="t-center tw-bg-gradient-to-r tw-from-surface-light-5 tw-to-primary"
      >
        <img src="~/assets/logo.png" />
      </div>
      <div
        class="tw-flex tw-flex-col md:tw-w-3/4"
        style="place-content: center; place-self: center"
      >
        <login-form />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import LoginForm from 'src/composables/auth/login/loginForm.vue';
defineOptions({
  layout: 'empty',
});
</script>
