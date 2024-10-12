<template>
  <q-dialog full-height full-width v-model="localShow" @hide="closeDialog">
    <div class="tw-bg-white">
      <div class="tw-grid tw-grid-cols-6 tw-gap-5">
        <div
          v-for="(image, index) in images"
          :key="index"
          @click="selectImage(getImageUrl(image.url))"
        >
          <q-responsive :ratio="1">
            <q-img :src="getImageUrl(image.url)" />
          </q-responsive>
        </div>
      </div>
    </div>
    <!--      <q-card-actions align="right">-->
    <!--        <q-btn flat label="Close" @click="closeDialog" />-->
    <!--      </q-card-actions>-->
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits, UnwrapRef } from 'vue';
import { ImageDto, ImageListDto } from 'src/composables/image/image.dto';
import { getImageUrl } from 'src/helper/generateImageUrl';

// Define props
interface Props {
  show: boolean
  images: UnwrapRef<ImageListDto>,
}
const props = defineProps<Props>()

// Define emits
const emit = defineEmits(['select', 'update:show']);

// Create a local state for dialog visibility
const localShow = ref(props.show);

// Watch for changes in the show prop and update local state
watch(
  () => props.show,
  (newVal) => {
    localShow.value = newVal;
  }
);

// Emit the close event to the parent when the dialog is closed
const closeDialog = () => {
  emit('update:show', false);
};

// Handle image selection and close the dialog
const selectImage = (url) => {
  emit('select', url);
  closeDialog();
};

</script>
