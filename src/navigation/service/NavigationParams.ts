import {ImageSource} from 'react-native-image-viewing/dist/@types';
import Routes from 'navigation/service/Routes';

export interface MainParamList extends Record<string, object | undefined> {
  [Routes.MainTab]: MainTabParams;
  [Routes.ForgotPasswordScreen]: undefined;
  [Routes.RecoveryPassword]: undefined;
  [Routes.ChangePasswordScreen]: ChangePasswordScreen;
  [Routes.RegisterScreen]: undefined;

  [Routes.ImagePreviewScreen]: ImagePreviewParams;
  [Routes.SignUpSuccessful]: undefined;
}
interface ImagePreviewParams {
  data: ImageSource[];
  index: number;
}
interface ChangePasswordScreen {
  username: string;
  code: string;
}
interface MainTabParams {
  screen: string;
}
