<template>
  <q-btn class="tw-w-full" :label="label" :color="color" @click="show = true" />
  <q-dialog :full-width="full_size" v-model="show">
    <q-card style="width: 700px; max-width: 80vw;" :class="!full_size? 'tw-w-[700px]':'tw-max-w-[80vw]'">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ title }}</div>
        <q-space />
        <div
          v-if="$slots.header_actions"
        >
          <slot
            name="header_actions"
          ></slot>
        </div>
        <q-btn v-else icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <slot name="default"></slot>
      </q-card-section>
      <div
        v-if="$slots.footer_actions"
        class="tw-m-5"
      >
        <slot
          name="footer_actions"
        ></slot>
      </div>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  label: string;
  color?: string;
  title?: string;
  full_size?:boolean,
}
const props = withDefaults(defineProps<Props>(), {
  color: 'teal',
  title: '',
  full_size:false,
});
const show = ref(false);
</script>
