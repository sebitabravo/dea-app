export type AuthStackParamList = {
  Auth: undefined;
  Login: undefined;
  Register: undefined;
};

export type MyStackParamList = {
  Home: undefined;
  CreatePost: undefined;
  CreateDeaPoint: undefined;
};

export type MyBottomTabParamList = {
  Map: undefined;
  Posts: undefined;
  Profile: undefined;
};

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- requerido por declaration merging de React Navigation
    interface RootParamList extends MyStackParamList {}
  }
}
