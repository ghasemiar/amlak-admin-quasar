<template>
  <div>
    <div
      class="tw-my-4 md:tw-my-8 tw-p-2 md:tw-p-4 tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-2 md:tw-gap-8"
    >
      <q-btn
        unelevated
        class="tw-h-16 tw-min-w-48 tw-hidden md:tw-grid"
        color="primary"
        to="/advertise"
        icon="fa-solid fa-house-medical-flag"
        label="آگهی ها"
      />
      <q-btn
        unelevated
        class="tw-h-16 tw-min-w-48"
        color="primary"
        to="/location"
        icon="fa-solid fa-location-dot"
        label="منطقه ها"
      />

      <q-btn
        unelevated
        class="tw-h-16 tw-min-w-48"
        color="primary"
        to="/blog"
        icon="fa-solid fa-blog"
        label="وبلاگ"
      />
      <q-btn
        unelevated
        class="tw-h-16 tw-min-w-48"
        color="primary"
        to="/user"
        icon="fa-solid fa-users"
        label="کاربران"
      />
      <q-btn
        unelevated
        class="tw-h-16 tw-min-w-48 tw-hidden md:tw-grid"
        color="primary"
        to="/user-tag"
        icon="fa-solid fa-user-tag"
        label="برچسب کاربران"
      />
      <q-btn
        unelevated
        class="tw-h-16 tw-min-w-48 tw-hidden md:tw-grid"
        color="primary"
        to="/user-request-advertise"
        icon="fa-duotone fa-solid fa-person-circle-question"
        label="درخواست آگهی کاربران"
      />
    </div>

    <q-separator />
    <div class="tw-text-2xl tw-font-bold tw-text-primary tw-p-4">
      <span> آگهی ها </span>
    </div>
    <advertise />
  </div>
</template>

<script setup lang="ts">
import advertise from './advertise/index.vue';
</script>
