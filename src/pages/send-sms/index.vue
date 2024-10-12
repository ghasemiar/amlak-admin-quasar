<template>
  <send-sms-advanced-form />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import SendSmsAdvancedForm from 'src/composables/sendSms/SendSmsForms/sendSmsAdvancedForm.vue';
import { getAllUser } from 'src/composables/user/useUser';
import AppButtonCreate from 'components/AppButtonCreate.vue';
import AppTable from 'components/AppTable.vue';
const { columns, request, data, loading } = getAllUser();
onMounted(() => {
  request();
});
const tab = ref('single')
</script>
