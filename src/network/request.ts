import Axios from 'axios';
import {logError} from 'utils/log-utils';
import {store} from 'middleware/stores';
import strings from 'assets/strings';
import {hideLoading, showLoading} from 'components/Loading/LoadingComponent';
import ResponseCode from './ResponseCode';
import {BaseResponse} from './BaseResponse';
import snackbarUtils from 'utils/snackbar-utils';
import RNFetchBlob from 'rn-fetch-blob';
import {AuthReducer} from 'model/auth/Auth';
import Config from 'react-native-config';
import paths from 'network/paths';

export enum RequestMethod {
  POST,
  GET,
  PUT,
  DELETE,
}
/**
 * requset
 */
const TIMEOUT_MESSAGE = 'TIMEOUT';
const TIMEOUT = 30 * 1000; // 30 seconds
const TIMEOUT_UPLOAD_FILE = 5 * 60 * 1000; // 5 minutes
const {CancelToken} = Axios;

const instance = Axios.create({
  baseURL: paths.baseUrl,
  timeout: 10000,
});
class ApiClient {
  // Map lưu lại những request cần cancel trước khi thực hiện request mới
  mapRequestCancel: Map<string, any> = new Map();

  /**
   * Main method used to fetch data from service
   * @param method
   * @param url
   * @param params
   * @param isShowLoading
   */
  async request<T>(
    method: RequestMethod,
    url: string,
    params?: any,
    isShowLoading?: boolean,
    isForm?: boolean,
  ) {
    // Checking network connectivity before call API

    isShowLoading != null && isShowLoading === true && showLoading();
    const requestInterceptor = instance.interceptors.request.use(
      config => {
        const configTemp = config;
        configTemp.cancelToken = new CancelToken(cancel => {
          this.mapRequestCancel.set(url, cancel);
        });
        const {loginToken}: AuthReducer = store.getState().auth;
        if (loginToken && loginToken.length > 0) {
          configTemp.headers.Authorization = loginToken;
        }
        // Add some header at heres

        return configTemp;
      },
      err => Promise.reject(err),
    );

    const responseInterceptor = instance.interceptors.response.use(
      response => {
        hideLoading();
        if (response.status) {
          if (response.status === ResponseCode.SUCCESS) {
            return response;
          }
          return Promise.reject(response);
        }
        return Promise.reject();
      },
      error => {
        logError(error);
        if (error?.response?.status === ResponseCode.UNAUTHORIZED) {
        }
        return Promise.reject(error);
      },
    );

    let request;
    if (method === RequestMethod.POST) {
      let config = {};
      if (isForm) {
        config = {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        };
      }
      request = instance.post(url, params, {
        headers: config,
        withCredentials: true,
      });
    } else if (method === RequestMethod.PUT) {
      request = instance.put(url, params);
    } else if (method === RequestMethod.DELETE) {
      request = instance.delete(url, {data: params});
    } else {
      request = instance.get(url, {params});
    }
    return Promise.race([
      request,
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error(TIMEOUT_MESSAGE));
        }, TIMEOUT);
      }),
    ])
      .then((res: any) => {
        const response: BaseResponse<T> = {
          data: {} as T,
        };
        response.status = res.status;
        response.data = res.data;
        return response;
      })
      .catch(error => {
        hideLoading();

        const response: BaseResponse<T> = {
          data: {} as T,
        };

        if (error.message === TIMEOUT_MESSAGE) {
          // snackbarUtils.show(strings.errors.timeOut, 'danger');
          return response;
        }

        if (
          error?.response?.data?.code === ResponseCode.INTERNAL_SERVER_ERROR
        ) {
          snackbarUtils.show(
            error.response.data.message ?? strings.unknowError,
            'danger',
          );
        } else if (!error?.response?.data?.message) {
          snackbarUtils.show(
            error?.response?.data?.message ?? strings.unknowError,
            'danger',
          );
        }

        // response.error = error?.response?.data?.details ?? undefined;
        response.status = Number(
          error?.response?.status ?? ResponseCode.UNKNOW,
        );
        response.message = error?.response?.data?.message ?? undefined;

        return response;
      })
      .finally(() => {
        instance.interceptors.request.eject(requestInterceptor);
        instance.interceptors.response.eject(responseInterceptor);
      });
  }

  /**
   *
   * @param url
   * @param body
   * @param headers
   * @param progressCallback
   * @param isShowLoading
   * @returns
   */
  async requestUploadFiles(
    url: string,
    body: any,
    progressCallback?: (number: number) => void,
    isShowLoading?: boolean,
    ignoreHideLoading?: boolean,
  ) {
    const urlRequest = paths.baseUrl + url;
    console.log(`=======> URL: ${urlRequest}`);
    console.log(`=======> PARAMS: ${JSON.stringify(body)}`);
    isShowLoading != null && isShowLoading === true && showLoading();
    return RNFetchBlob.config({
      trusty: false,
      timeout: TIMEOUT_UPLOAD_FILE,
    })
      .fetch(
        'POST',
        urlRequest,
        {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body,
      )
      .uploadProgress((written, total) => {
        const percent = Math.floor((written / total) * 100);
        if (progressCallback) {
          progressCallback(percent);
        }
      })
      .then((resp: any) => {
        console.log(resp);
        !ignoreHideLoading && hideLoading();
        const response: BaseResponse<any> = {
          data: {},
        };
        // if ((resp?.respInfo?.status ?? 0) === ResponseCode.SUCCESS) {
        // console.log(`=======> RESPONSE: ${JSON.stringify(resp.data)}`);
        response.status = resp?.respInfo?.status ?? 0;
        if (resp.data.length > 0) {
          try {
            if (resp?.respInfo?.status === ResponseCode.SUCCESS) {
              response.data = resp.json();
            } else {
              response.data = resp?.data;
            }
            response.message = resp.json().message;
          } catch (e) {
            if (response.message === TIMEOUT_MESSAGE) {
              snackbarUtils.show(strings.errors.timeOut, 'danger');
              return response;
            }

            if (response?.status === ResponseCode.INTERNAL_SERVER_ERROR) {
              snackbarUtils.show(
                response.data.message ?? strings.unknowError,
                'danger',
              );
            } else if (!response?.message) {
              snackbarUtils.show(strings.unknowError, 'danger');
            }
            console.log('e: ', e);
            console.log('response: ', response);
            return response;
          }
        }
        if (response.status === ResponseCode.UNAUTHORIZED) {
          snackbarUtils.show(
            response?.message || 'Bạn phải đăng nhập để sử dụng chức năng này!',
            'danger',
          );
        }
        return response;
        // }
        // return null;
      })
      .catch(err => {
        console.log('err: ', err);
        !ignoreHideLoading && hideLoading();
        const response: BaseResponse<any> = {
          data: {},
        };
        return response;
      });
  }
}
const API = new ApiClient();
export default API;
