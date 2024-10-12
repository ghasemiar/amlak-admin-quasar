<template>
  <q-expansion-item
    class="tw-bg-surface-light-2 tw-rounded-xl tw-my-4"
    switch-toggle-side
    label="جست و جو..."
    caption="داده های مورد نظر خود را فیلتر کنید ..."
    header-class="tw-bg-surface-light-2 tw-rounded-xl"
  >
    <q-separator class="tw-mx-4" />

    <q-card-section>
      <slot></slot>
    </q-card-section>
  </q-expansion-item>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.q-expansion-item {
  .q-focus-helper {
    visibility: hidden;
  }
}
</style>
