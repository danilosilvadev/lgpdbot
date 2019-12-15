import { Domain } from "./domain.model";
import { Group } from "./group.model";

export interface Cookie {
  cid: string;
  name: string;
  active: boolean;
  expDate: string;
  domain: {
    did: string;
    active: boolean;
  };
  group: Group;
  provider: string;
}
