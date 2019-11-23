import { UserStatus } from "./user.model";

export interface ReducersModel {
  messageReducer: { message: string };
  loadingReducer: { loading: boolean };
  userReducer: {
    user: { status: UserStatus };
  };
}
