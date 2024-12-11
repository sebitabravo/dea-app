
export type AuthStackParamList = {
  Auth: undefined
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type AppStackParamList = {
  Main: undefined;
  CreatePoint: undefined;
  CreatePost: undefined;
  Settings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}