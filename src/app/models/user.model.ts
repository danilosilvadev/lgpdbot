import { Domain } from "./domain.model";

export interface UserStatus {
  name: string;
  email: string;
  isVerified: boolean;
  uid: string;
  domains: Domain[];
}
