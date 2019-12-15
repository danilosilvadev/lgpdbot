import { ActionReducerMap } from "@ngrx/store";
import { ReducersModel } from "../models/reducers.model";
import { loadingReducer, userReducer, cookieReducer } from "./reducers";

export const rootReducer: ActionReducerMap<ReducersModel> = {
  loadingReducer,
  userReducer,
  cookieReducer
};
