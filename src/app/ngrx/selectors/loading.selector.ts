import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StateModel } from "../../models/state.model";

const getFeaturedLoading = createFeatureSelector<StateModel>("loadingReducer");

export const getLoading = createSelector(
  getFeaturedLoading,
  state => state.loading
);
