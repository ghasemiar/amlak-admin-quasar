<template>
  <app-button unelevated label="ایجاد کردن" icon="add" :to="to">
  </app-button>
</template>

<script setup lang="ts">
import { QBtnProps } from 'quasar';
import AppButton from 'components/AppButton.vue';
import { ref, useSlots, defineProps, defineEmits, computed } from 'vue';
interface Props extends QBtnProps {
  to: string;
}

const props = withDefaults(defineProps<Props>(), {
  hideLabel: false,
});
</script>
