import { ActionReducerMap } from "@ngrx/store";
import { ReducersModel } from "../models/reducers.model";
import {
  messageReducer,
  loadingReducer,
  userReducer,
  cookieReducer
} from "./reducers";

export const rootReducer: ActionReducerMap<ReducersModel> = {
  messageReducer,
  loadingReducer,
  userReducer,
  cookieReducer
};
