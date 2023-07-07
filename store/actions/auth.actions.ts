import { createAction, props } from '@ngrx/store';
export const LOGIN_SUCCESS = '[auth page] login Success';

export const AUTO_LOGIN_ACTION = '[auth page] auto login';
export const LOGOUT_ACTION = '[auth page] logout';

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ token; redirect: boolean }>()
);

export const autoLogin = createAction(AUTO_LOGIN_ACTION);
export const autoLogout = createAction(LOGOUT_ACTION);
export const dummyAction = createAction('[dummy action]');
