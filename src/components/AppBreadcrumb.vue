<template>
  <div class="tw-mt-4 tw-mx-4 tw-text-black tw-text-lg">
    <q-breadcrumbs>
      <q-breadcrumbs-el icon="home" class="tw-text-black" to="/" />
      <q-breadcrumbs-el
        v-for="(item, i) in array"
        :key="i"
        :label="$t(item)"
        :to="buildPath(i)"
        :class="isActive(i) ? 'tw-text-teal-600' : 'tw-text-black'"
      />
    </q-breadcrumbs>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const route = useRoute();
const array = ref([]);

// Function to update the array when the route changes
const updateArray = () => {
  // Filter out numeric parameters or specific segments
  array.value = route.path.split('/').filter((segment) => {
    return isNaN(segment) && segment !== ''; // Exclude numeric segments and empty strings
  });
};

// Watch for route changes to update the array
watch(() => route.path, updateArray, { immediate: true });

// Build the path dynamically for each breadcrumb
const buildPath = (index) => {
  return '/' + array.value.slice(0, index + 1).join('/');
};

// Check if the breadcrumb is the current route
const isActive = (index) => {
  return index === array.value.length - 1;
};

// Initialize the array on component mount
updateArray();
</script>
