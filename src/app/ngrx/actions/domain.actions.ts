import { Action } from "@ngrx/store";
import { SET_DOMAIN_LIST } from "../actionTypes";
import { Domain } from '../../models/domain.model'

export class SetDomainList implements Action {
  constructor(readonly payload: Domain[]) {}

  readonly type = SET_DOMAIN_LIST;
}

export type DomainsActions = SetDomainList;
