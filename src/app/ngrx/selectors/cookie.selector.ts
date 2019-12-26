import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Cookie } from "src/app/models/cookie.model";

const getFeaturedCookies = createFeatureSelector<Cookie[]>("cookiesReducer");

export const getCookies = createSelector(
  getFeaturedCookies,
  cookies => cookies
);
