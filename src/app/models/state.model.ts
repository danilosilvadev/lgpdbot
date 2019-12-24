import { UserStatus } from "./user.model";
import { Cookie } from "./cookie.model";

export interface StateModel {
  loading: boolean;
  user: UserStatus;
  cookies: Cookie[];
}
