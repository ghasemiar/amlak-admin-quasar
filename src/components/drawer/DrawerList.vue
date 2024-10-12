<template>
  <q-list>
    <template v-for="(menuItem, index) in nodes" :key="index">
      <q-expansion-item
        class="tw-my-2"
        :default-opened="true"
        header-class="tw-rounded-xl tw-my-2 tw-bg-surface-light-6"
        v-if="menuItem.children"
        :label="menuItem.separator_name"
      >
        <drawer-list class="" :nodes="menuItem.children" />
      </q-expansion-item>

      <drawer-item v-else :menuItem="menuItem" />
    </template>
  </q-list>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import DrawerItem from './DrawerItem.vue';
import DrawerList from './DrawerList.vue';

const props = defineProps({
  nodes: {
    type: Array,
  },
});
const { t } = useI18n();
const route = useRoute();
</script>
<style lang="scss"></style>
