export interface UserProfile {
  userName: string;
  fullName?: string;
  dob?: string;
  phoneNumber?: string;
  email?: string;
}

export interface LoginSave {
  user: UserProfile;
  accessToken: string;
}
