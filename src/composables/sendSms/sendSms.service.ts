import { postData } from 'src/helper/axios.instans';
import { SendSmsSimpleFormDto } from 'src/composables/sendSms/sendSmsForm.dto';

export const sendSmsService = async (route: string, data: any) => {
  return await postData(route, data);
};
