import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StateModel } from "../../models/state.model";

const getFeaturedUser = createFeatureSelector<StateModel>("userReducer");

export const getUserStatus = createSelector(
  getFeaturedUser,
  state => state.user.status
);
