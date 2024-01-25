import * as Yup from 'yup';
import {checkPhoneNumberVietnamese} from 'utils/other-utils';

export const ValidateLogin = Yup.object().shape({
  username: Yup.string()
    .required('Số điện thoại không được để trống')
    .matches(checkPhoneNumberVietnamese, 'Số điện thoại không hợp lệ'),
  password: Yup.string().required('Mật khẩu không được để trống'),
});
