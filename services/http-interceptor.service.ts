
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { HTTP_STATUS } from '@shared/constants/constant-types';
// import { toasterMessage } from '@shared/constants/toaster.messages';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// import { UserAuthService } from './user-auth-service';
@Injectable({
    providedIn: "root"
})
export class HttpInterceptorService implements HttpInterceptor {
    HTTP_STATUS = {
        NOT_MODIFED: 304,
        BAD_REQUEST: 400
    }
    showErrorToaster: Boolean = true;

    constructor(
        // private userAuthService: UserAuthService,
        // private ngxSpinnerService: NgxSpinnerService,
        // private router: Router,
        // private toastrService: ToastrService
    ) { }
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const env = this;
        const clonedRequest = req.clone({
            url: env.fixUrl(req.url)
        });
        return next.handle(clonedRequest).pipe(
            tap(
                event => {
                    if (event instanceof HttpResponse) {
                        console.log(event)
                        /***** gets etags from response headers and sets to session storage *****/
                        if (req.url?.includes('cached=true')) {
                            sessionStorage.setItem(req.url, event.headers.get("x-etag") || '');
                        }
                    }
                },
                error => {
                    console.log(error)
                    /***** 304 is for "Data not updated" *****/
                    if (error.status === this.HTTP_STATUS.NOT_MODIFED) {
                        return EMPTY;
                    }
                    if (error["status"] === 401) {
                        // if (this.showErrorToaster) {
                        //   this.toastrService.error(toasterMessage.unauthorisedAccess, 'Error');
                        // }
                        // this.ngxSpinnerService.hide();
                        // this.userAuthService.clearSessionStorage();
                        if (error.url.indexOf('api/auth/login') === -1 && error.url.indexOf('api/auth/captcha') === -1) {
                            this.showErrorToaster = false;
                            // this.router.navigate(["/"]).then(() => {
                            //     window.location.reload();
                            // });
                        }
                    }
                }
            )
        );
    }
    private fixUrl(url: string) {
        return url;
    }
}
