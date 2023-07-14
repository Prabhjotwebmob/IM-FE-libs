
//   import { exhaustMap } from 'rxjs/operators';

//   import { Actions, createEffect, ofType } from '@ngrx/effects';
//   import { Injectable } from '@angular/core';
//   import { loginSuccess } from '../actions/auth.actions';
//   import { map, catchError, mergeMap } from 'rxjs/operators';
//   import { EMPTY} from 'rxjs';
  
//   @Injectable()
//   export class AuthEffects {
//     constructor(
//       private actions$: Actions,
//       public http: Http
//     ) {}
  
//     login$ = createEffect(() => 
//     this.actions$.pipe(
//         ofType(loginSuccess),
//         mergeMap(() => this.performLogin()),
//         catchError((error ) => { console.log("HELLO"); return EMPTY})
//     )
//  );
//  performLogin() {
//     return EMPTY}
   
//   }
  
  