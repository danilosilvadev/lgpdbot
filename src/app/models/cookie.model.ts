import { Domain } from "./domain.model";
import { Group } from "./group.model";

export interface Cookie {
  cid: string;
  name: string;
  active: boolean;
  expDate: string;
  domain: Domain;
  group: Group;
  provider: string;
}
