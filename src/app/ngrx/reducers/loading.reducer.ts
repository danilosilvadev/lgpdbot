import { initialState } from "../initialState";
import { START_LOADING, STOP_LOADING } from "../actionTypes";
import { LoadingActions } from "../actions/loading.action";

export function loadingReducer(
  state = initialState.loading,
  action: LoadingActions
) {
  switch (action.type) {
    case START_LOADING:
      return true;
    case STOP_LOADING:
      return false;
    default:
      return state;
  }
}
