import {UserProfile} from 'model/auth/Auth';

export interface AuthReducer {
  user?: UserProfile | null;
  loginToken: string;
}

export interface CommonReducer {
  count: number;
}

export interface RootReducer {
  auth: AuthReducer;
  common: CommonReducer;
}
