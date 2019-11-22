import { UserStatus } from "./user.model";

export interface StateModel {
  message: string;
  loading: boolean;
  user: {
    status: any;
  };
}
