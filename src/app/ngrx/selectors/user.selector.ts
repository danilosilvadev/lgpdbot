import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserStatus } from "src/app/models/user.model";

const getFeaturedUser = createFeatureSelector<UserStatus>("userReducer");

export const getUserStatus = createSelector(getFeaturedUser, user => user);
