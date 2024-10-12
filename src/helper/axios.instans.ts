import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { useAuthStore } from 'stores/auth.store';
import { useRouter } from 'vue-router';
import config from 'src/config';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: config.API_URL,
  timeout: 10000,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = useAuthStore().token;

    // Check if withToken is either undefined (default) or true, then set the Authorization header
    if (config.headers && config.headers['withToken'] !== false && token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Remove withToken from headers before the request is sent
    if (config.headers) {
      delete config.headers['withToken'];
    }

    return config as InternalAxiosRequestConfig;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
const authStore = useAuthStore();
const router = useRouter();

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle 401 Unauthorized error

      // Option 1: Clear the token and redirect to the login page
      authStore.logout(); // This could clear the token and other auth info
      // Option 2: Optionally, you can try to refresh the token here if your API supports it
      // const refreshedToken = await refreshAuthToken();
      // if (refreshedToken) {
      //   authStore.setToken(refreshedToken);
      //   return axiosInstance(error.config); // Retry the original request
      // }

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

// Data fetching functions
export const fetchData = async <T>(
  url: string,
  params?: Record<string, unknown>,
  withToken: boolean = true // Optional withToken parameter, default is true
) => {
  try {
    const response: AxiosResponse<any, any> = await axiosInstance.get<T>(url, {
      params,
      headers: {
        withToken, // Pass withToken in headers to be handled by the interceptor
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postData = async <T>(
  url: string,
  data?: T,
  withToken: boolean = true // Optional withToken parameter, default is true
): Promise<T> => {
  const isFormData = data instanceof FormData;
  try {
    const response: AxiosResponse<T> = await axiosInstance.post(url, data, {
      headers: {
        'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
        withToken, // Pass withToken in headers to be handled by the interceptor
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const putData = async <T>(
  url: string,
  data?: T,
  withToken: boolean = true // Optional withToken parameter, default is true
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.put(url, data, {
      headers: {
        withToken, // Pass withToken in headers to be handled by the interceptor
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async <T>(
  url: string,
  data?: any,
  withToken: boolean = true // Optional withToken parameter, default is true
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.delete(url, {
      data,
      headers: {
        withToken, // Pass withToken in headers to be handled by the interceptor
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default axiosInstance;
