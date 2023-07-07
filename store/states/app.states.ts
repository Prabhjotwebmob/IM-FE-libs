import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { AuthReducer } from '../reducers/auth.reducer';
import { AuthState } from '../states/auth.state';

export interface AppState {
//   shared: SharedState;
  auth: AuthState;
  router: RouterReducerState;
}

export const appReducer = {
//   shared: SharedReducer,
  auth: AuthReducer,
  router: routerReducer,
};
