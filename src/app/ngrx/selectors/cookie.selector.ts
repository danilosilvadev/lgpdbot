import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StateModel } from "../../models/state.model";

const getFeaturedCookies = createFeatureSelector<StateModel>("cookiesReducer");

export const getCookies = createSelector(
  getFeaturedCookies,
  state => state.cookies
);
