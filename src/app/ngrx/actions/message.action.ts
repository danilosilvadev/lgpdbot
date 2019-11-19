import { Action } from "@ngrx/store";
import { SPANISH_MESSAGE, ENGLISH_MESSAGE } from "../actionTypes";

export class changeMessageToSpanish implements Action {
  readonly type = SPANISH_MESSAGE;
}

export class changeMessageToEnglish implements Action {
  readonly type = ENGLISH_MESSAGE;
}

export type MessageChangeActions =
  | changeMessageToSpanish
  | changeMessageToEnglish;
