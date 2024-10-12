import { useRouter } from 'vue-router';
import { ref, Ref } from 'vue';
import {
  SendSmsAdvancedFormDto,
  sendSmsAdvancedFormTransformer,
  SendSmsScheduleFormDto,
  sendSmsScheduleFormTransformer,
  SendSmsSimpleFormDto,
  sendSmsSimpleFormTransformer,
  SendSmsWithDomainFormDto,
  sendSmsWithDomainFormTransformer,
} from 'src/composables/sendSms/sendSmsForm.dto';
import { sendSmsService } from 'src/composables/sendSms/sendSms.service';
const baseRoute = '/send-sms';
export const useSendSmsSimple = () => {
  const router = useRouter();
  const loading: Ref<boolean> = ref(false);
  const request = (values: SendSmsSimpleFormDto) => {
    loading.value = true;
    sendSmsService(`${baseRoute}/simple`, sendSmsSimpleFormTransformer(values))
      .then(async (res) => {
        loading.value = false;
        await router.push(baseRoute);
      })
      .catch((error) => {
        loading.value = false;
        console.log(error);
      });
  };
  return { loading, request };
};
export const useSendSmsAdvanced = () => {
  const router = useRouter();
  const loading: Ref<boolean> = ref(false);
  const request = (values: SendSmsAdvancedFormDto) => {
    loading.value = true;
    sendSmsService(
      `${baseRoute}/advanced`,
      sendSmsAdvancedFormTransformer(values)
    )
      .then(async (res) => {
        loading.value = false;
        console.log(res);
        await router.push(baseRoute);
      })
      .catch((error) => {
        loading.value = false;
        console.log(error);
      });
  };
  return { loading, request };
};
export const useSendSmsSchedule = () => {
  const router = useRouter();
  const loading: Ref<boolean> = ref(false);
  const request = (values: SendSmsScheduleFormDto) => {
    loading.value = true;
    sendSmsService(
      `${baseRoute}/schedule`,
      sendSmsScheduleFormTransformer(values)
    )
      .then(async (res) => {
        loading.value = false;
        console.log(res);
        await router.push(baseRoute);
      })
      .catch((error) => {
        loading.value = false;
        console.log(error);
      });
  };
  return { loading, request };
};
export const useSendSmsWithDomain = () => {
  const router = useRouter();
  const loading: Ref<boolean> = ref(false);
  const request = (values: SendSmsWithDomainFormDto) => {
    loading.value = true;
    sendSmsService(
      `${baseRoute}/with-domain`,
      sendSmsWithDomainFormTransformer(values)
    )
      .then(async (res) => {
        loading.value = false;
        console.log(res);
        await router.push(baseRoute);
      })
      .catch((error) => {
        loading.value = false;
        console.log(error);
      });
  };
  return { loading, request };
};
