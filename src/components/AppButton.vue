<template>
  <q-btn class="tw-h-[2.75rem] tw-px-4" v-bind="bind"> </q-btn>
</template>

<script setup lang="ts">
import { QBtnProps } from 'quasar';
import { computed, withDefaults } from 'vue';
interface Props extends QBtnProps {
  color: string;
  unelevated: boolean;
  dense: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  unelevated: true,
  dense: false,
});

const bind = computed(() => {
  return props;
});
</script>
