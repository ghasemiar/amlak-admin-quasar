<template>
  <q-tabs
    v-model="tab"
    dense
    class="text-grey"
    active-color="primary"
    indicator-color="primary"
    align="left"
  >
    <q-route-tab :to="{query: { tab: 'info' }}" name="info" :label="$t('info')" />
    <q-route-tab :to="{query: { tab: 'sendSms' }}" name="sendSms" :label="$t('sendSms')" />
  </q-tabs>
  <q-tab-panels style="background-color: transparent" v-model="tab" animated>
    <q-tab-panel name="info">
      <user-info-tab
        :columns="columns"
        :request="request"
        :data="data"
        :loading="loading"
      />
    </q-tab-panel>
    <q-tab-panel name="sendSms">
      <q-select
        :options="singleSendSmsOption"
        v-model="smsType"
        :label="$t('sms type')"
      />
      <send-sms-simple-form
        v-if="smsType.value == 'simple'"
        :phone-number="data.phone"
      />
      <send-sms-schedule-form
        v-else-if="smsType.value == 'schedule'"
        :phone-number="data.phone"
      />
      <send-sms-with-domain-form
        v-else-if="smsType.value == 'with-domain'"
        :phone-number="data.phone"
      />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import UserInfoTab from 'src/composables/user/tabs/userInfoTab.vue';
import SendSmsSimpleForm from 'src/composables/sendSms/SendSmsForms/sendSmsSimpleForm.vue';
import { useUser } from 'src/composables/user/useUser';
import { singleSendSmsOption } from 'src/composables/options/user.options';
import SendSmsScheduleForm from 'src/composables/sendSms/SendSmsForms/sendSmsScheduleForm.vue';
import SendSmsWithDomainForm from 'src/composables/sendSms/SendSmsForms/sendSmsWithDomainForm.vue';
const { columns, request, data, loading } = useUser();
const smsType = ref(singleSendSmsOption[0]);
onMounted(() => {
  request();
});
const tab = ref('info');
</script>
