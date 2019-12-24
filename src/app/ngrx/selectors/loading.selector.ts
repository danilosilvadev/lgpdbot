import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StateModel } from "../../models/state.model";

const getFeaturedLoading = createFeatureSelector<boolean>("loadingReducer");

export const getLoading = createSelector(
  getFeaturedLoading,
  loading => loading
);
