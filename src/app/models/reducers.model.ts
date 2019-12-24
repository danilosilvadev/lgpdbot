import { UserStatus } from "./user.model";
import { Cookie } from "./cookie.model";

export interface ReducersModel {
  loadingReducer: boolean;
  userReducer: UserStatus;
  cookieReducer: Cookie[];
}
