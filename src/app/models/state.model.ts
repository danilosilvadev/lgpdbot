import { UserStatus } from "./user.model";
import { Cookie } from "./cookie.model";

export interface StateModel {
  message: string;
  loading: boolean;
  user: {
    status: UserStatus;
  };
  cookies: Cookie[];
}
