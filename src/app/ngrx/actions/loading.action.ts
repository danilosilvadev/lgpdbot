import { Action } from "@ngrx/store";
import { START_LOADING, STOP_LOADING } from "../actionTypes";

export class StartLoading implements Action {
  readonly type = START_LOADING;
}

export class StopLoading implements Action {
  readonly type = STOP_LOADING;
}

export type LoadingActions = StartLoading | StopLoading;
