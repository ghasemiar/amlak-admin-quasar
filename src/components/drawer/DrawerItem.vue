<template>
  <q-item
    :to="menuItem.to"
    class="tw-rounded-lg !tw-h-[38px] t-center !tw-justify-start"
    clickable
    :active="route.path === menuItem.to"
    v-ripple
    active-class="my-menu-link tw-m-1 tw-h-[36px] "
  >
    <q-icon :name="menuItem.icon" class="tw-mx-2" />

    <span>
      {{ menuItem.title }}
    </span>
  </q-item>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const props = defineProps({
  menuItem: {
    type: Object,
  },
});
const { t } = useI18n();
const route = useRoute();
</script>

<style lang="sass">
.my-menu-link
  color: theme('colors.primary.100')
  background: theme('colors.primary.DEFAULT')
</style>
