import { loginSuccess, autoLogout } from '../actions/auth.actions';
import { createReducer, on } from '@ngrx/store';
import { initialState } from '../states/auth.state';

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      token: action.token,
    };
  }),
  on(autoLogout, (state) => {
    return {
      ...state,
      token: null,
    };
  })
);

export function AuthReducer(state, action) {
  return _authReducer(state, action);
}
