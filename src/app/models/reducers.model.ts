import { UserStatus } from "./user.model";
import { Cookie } from "./cookie.model";

export interface ReducersModel {
  messageReducer: { message: string };
  loadingReducer: { loading: boolean };
  userReducer: {
    user: { status: UserStatus };
  };
  cookieReducer: { cookies: Cookie[] };
}
