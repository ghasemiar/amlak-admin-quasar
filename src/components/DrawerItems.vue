<template>
  <div v-if="separator" class="tw-relative tw-flex tw-py-2 tw-items-center">
    <div class="tw-flex-grow tw-border-t tw-border-gray-400"></div>
    <span class="tw-flex-shrink tw-mx-4 tw-text-gray-400">{{
      separator_name
    }}</span>
    <div class="tw-flex-grow tw-border-t tw-border-gray-400"></div>
  </div>
  <q-item
    clickable
    :to="{ name: link }"
    :class="route.name == link ? '!tw-text-teal-600' : ''"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

export interface DrawerItemsInterface {
  title: string;
  link?: string;
  icon?: string;
  separator?: boolean;
  separator_name?: string;
}

withDefaults(defineProps<DrawerItemsInterface>(), {
  link: '#',
  icon: '',
  separator: false,
  separator_name: '',
});
const route = useRoute();
</script>
