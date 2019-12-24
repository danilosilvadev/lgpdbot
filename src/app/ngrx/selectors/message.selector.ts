import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StateModel } from "../../models/state.model";

const getFeaturedMessage = createFeatureSelector<StateModel>("messageReducer");

export const getMessage = createSelector(
  getFeaturedMessage,
  state => state.message
);
